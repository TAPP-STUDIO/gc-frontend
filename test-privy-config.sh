#!/bin/bash

# Test Privy Configuration
# Usage: ./test-privy-config.sh

set -e

# Configuration
FRONTEND_URL="https://portfolio.gavlikcapital.com"
PRIVY_APP_ID="cmfc7d0gg002sjl0bhqvnecer"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[✓]${NC} $1"; }
log_error() { echo -e "${RED}[✗]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[!]${NC} $1"; }

echo "=========================================="
echo "      Privy Configuration Test"
echo "=========================================="
echo ""

# 1. Check if frontend is accessible
log_info "Testing frontend accessibility..."
FRONTEND_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL" 2>/dev/null || echo "000")

if [ "$FRONTEND_RESPONSE" == "200" ]; then
    log_success "Frontend is accessible (HTTP $FRONTEND_RESPONSE)"
else
    log_error "Frontend not accessible (HTTP $FRONTEND_RESPONSE)"
fi
echo ""

# 2. Check Privy SDK loading
log_info "Checking Privy SDK integration..."
FRONTEND_HTML=$(curl -s "$FRONTEND_URL" 2>/dev/null || echo "")

if echo "$FRONTEND_HTML" | grep -q "privy" || echo "$FRONTEND_HTML" | grep -q "$PRIVY_APP_ID"; then
    log_success "Privy references found in frontend"
else
    log_warning "Privy references not found in initial HTML (may be loaded dynamically)"
fi
echo ""

# 3. Check login page
log_info "Testing login page..."
LOGIN_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL/auth/login" 2>/dev/null || echo "000")

if [ "$LOGIN_RESPONSE" == "200" ] || [ "$LOGIN_RESPONSE" == "308" ]; then
    log_success "Login page accessible (HTTP $LOGIN_RESPONSE)"
else
    log_error "Login page not accessible (HTTP $LOGIN_RESPONSE)"
fi
echo ""

# 4. Check JavaScript console for errors
log_info "Checking for common frontend issues..."
echo "  To fully test Privy integration:"
echo "  1. Open Chrome DevTools (F12)"
echo "  2. Go to $FRONTEND_URL/auth/login"
echo "  3. Check Console for errors"
echo "  4. Look for:"
echo "     - 'NEXT_PUBLIC_PRIVY_APP_ID is not set' (bad)"
echo "     - 'Privy initialized' (good)"
echo "     - Network errors to Privy API"
echo ""

# 5. Environment variables reminder
log_info "Required environment variables in AWS Amplify:"
echo "  NEXT_PUBLIC_API_URL=https://dvgjdqq5hh5x6.cloudfront.net/api/v1"
echo "  NEXT_PUBLIC_APP_URL=https://portfolio.gavlikcapital.com"
echo "  NEXT_PUBLIC_PRIVY_APP_ID=$PRIVY_APP_ID"
echo "  NODE_ENV=production"
echo ""

# 6. Privy Dashboard settings
log_info "Privy Dashboard checklist:"
echo "  1. Login to https://dashboard.privy.io"
echo "  2. Select your app (ID: $PRIVY_APP_ID)"
echo "  3. Go to Settings → Allowed Domains"
echo "  4. Ensure these are added:"
echo "     - portfolio.gavlikcapital.com"
echo "     - https://portfolio.gavlikcapital.com"
echo "     - localhost:3000 (for development)"
echo "  5. Check Login Methods → Wallets is enabled"
echo ""

# 7. Quick API connectivity test
log_info "Testing if frontend can reach backend..."
# This simulates what the frontend would do
API_FROM_FRONTEND=$(curl -s -X POST \
    -H "Content-Type: application/json" \
    -H "Origin: $FRONTEND_URL" \
    -d '{"walletAddress":"0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7"}' \
    "https://dvgjdqq5hh5x6.cloudfront.net/api/v1/auth/wallet/nonce" 2>/dev/null || echo "{}")

if echo "$API_FROM_FRONTEND" | grep -q "nonce"; then
    log_success "Frontend can communicate with backend API"
else
    log_error "Frontend-to-backend communication issue"
    echo "  Response: $API_FROM_FRONTEND" | head -c 200
fi
echo ""

# Summary
echo "=========================================="
echo "           Configuration Status"
echo "=========================================="
echo ""
echo "Manual checks needed:"
echo "1. ✋ AWS Amplify environment variables set"
echo "2. ✋ Privy Dashboard domains configured"
echo "3. ✋ Browser console free of errors"
echo ""
echo "To test full authentication:"
echo "1. Visit $FRONTEND_URL/auth/login"
echo "2. Click 'Connect Wallet'"
echo "3. Complete wallet connection"
echo "4. Sign the authentication message"
echo "5. Verify redirect to dashboard"
