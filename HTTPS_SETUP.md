# 🔐 HTTPS Development Setup

## Problem
Privy embedded wallets require HTTPS protocol for security. When accessing the app via IP address (e.g., `192.168.0.106:3000`), it uses HTTP which causes wallet connection failures.

## Solutions

### ✅ Solution 1: Use localhost (Quick Fix)
```bash
# Always works with HTTP
http://localhost:3000
```

### ✅ Solution 2: HTTPS Development Server (Recommended)
```bash
# Start HTTPS development server
npm run dev:https

# Available at:
# - https://localhost:3000
# - https://192.168.0.106:3000
```

**First time setup:**
1. The script will generate self-signed certificates
2. You'll need to accept the certificate in your browser
3. Chrome: Click "Advanced" → "Proceed to localhost (unsafe)"
4. Safari: Click "Show Details" → "visit this website"

### ✅ Solution 3: Manual Certificate Trust (macOS)
```bash
# Generate certificates (done automatically)
npm run dev:https

# Add to Keychain (optional for better UX)
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain certs/dev-cert.pem
```

## How it works

### HttpsWarning Component
- Detects HTTP connections on non-localhost domains
- Shows warning modal with solutions
- Allows switching to localhost automatically
- Can be bypassed for testing (limited functionality)

### Privy Configuration
- Embedded wallets disabled in development for HTTP compatibility
- Fallback to external wallet connections (MetaMask, WalletConnect)
- Full functionality available with HTTPS

## Network Testing
```bash
# Test with different devices on your network:
# Phone/Tablet: https://192.168.0.106:3000
# Other computer: https://192.168.0.106:3000
```

## Troubleshooting

### Certificate Issues
```bash
# Regenerate certificates
rm -rf certs/
npm run dev:https
```

### OpenSSL Not Found (macOS)
```bash
brew install openssl
```

### Still Getting HTTPS Errors?
1. Check console for specific error messages
2. Verify certificate is generated in `certs/` folder
3. Try accessing `https://localhost:3000` first
4. Clear browser cache and try again

## Production
In production, use proper SSL certificates from Let's Encrypt or your hosting provider. The embedded wallets will work normally with proper HTTPS.
