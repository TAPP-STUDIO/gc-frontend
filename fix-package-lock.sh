#!/bin/bash

# Fix package-lock.json for production build
# This script regenerates package-lock.json to match package.json

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[✓]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[!]${NC} $1"; }
log_error() { echo -e "${RED}[✗]${NC} $1"; }

echo "=========================================="
echo "   Fixing package-lock.json"
echo "=========================================="
echo ""

# Navigate to frontend directory
cd /Users/simonfilipek/Documents/GitHub/gc-frontend

# Step 1: Backup current files
log_info "Creating backup..."
cp package-lock.json package-lock.json.backup 2>/dev/null || log_warning "No existing package-lock.json to backup"
log_success "Backup created"
echo ""

# Step 2: Remove node_modules and package-lock.json
log_info "Cleaning up old dependencies..."
rm -rf node_modules
rm -f package-lock.json
log_success "Cleanup complete"
echo ""

# Step 3: Install dependencies fresh
log_info "Installing dependencies (this may take a few minutes)..."
npm install
if [ $? -eq 0 ]; then
    log_success "Dependencies installed successfully"
else
    log_error "Failed to install dependencies"
    exit 1
fi
echo ""

# Step 4: Verify installation
log_info "Verifying installation..."
if [ -f "package-lock.json" ]; then
    log_success "package-lock.json generated"
    
    # Check if tailwindcss version is correct
    if grep -q '"tailwindcss": "3' package-lock.json; then
        log_success "Tailwind CSS v3 correctly installed"
    else
        log_error "Tailwind CSS version mismatch"
    fi
    
    # Check if autoprefixer is present
    if grep -q '"autoprefixer"' package-lock.json; then
        log_success "Autoprefixer installed"
    else
        log_warning "Autoprefixer not found"
    fi
else
    log_error "package-lock.json not generated"
    exit 1
fi
echo ""

# Step 5: Test build locally
log_info "Testing build locally..."
npm run build
if [ $? -eq 0 ]; then
    log_success "Build successful!"
else
    log_error "Build failed"
    log_info "Check the error messages above"
    exit 1
fi
echo ""

# Step 6: Git operations
log_info "Preparing for commit..."
git add package.json package-lock.json postcss.config.mjs
git status
echo ""

log_success "Ready to commit!"
echo ""
echo "Next steps:"
echo "1. Review the changes above"
echo "2. Commit: git commit -m 'Fix package-lock.json and Tailwind CSS v3 configuration'"
echo "3. Push: git push"
echo "4. Wait for Amplify to rebuild"
