const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create certificates directory
const certsDir = path.join(__dirname, '..', 'certs');
if (!fs.existsSync(certsDir)) {
  fs.mkdirSync(certsDir);
}

// Generate self-signed certificate for development
const keyPath = path.join(certsDir, 'dev-key.pem');
const certPath = path.join(certsDir, 'dev-cert.pem');

if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  console.log('🔐 Generating self-signed certificate for HTTPS development...');
  
  try {
    // Generate private key
    execSync(`openssl genrsa -out ${keyPath} 2048`, { stdio: 'inherit' });
    
    // Generate certificate with Subject Alternative Names
    const configContent = `
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no

[req_distinguished_name]
C = CZ
ST = South Moravian
L = Brno
O = GavlikCapital
CN = localhost

[v3_req]
keyUsage = keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
DNS.2 = *.localhost
IP.1 = 127.0.0.1
IP.2 = 192.168.0.106
IP.3 = 192.168.0.105
IP.4 = 192.168.0.104
IP.5 = 192.168.0.103
IP.6 = 192.168.0.102
IP.7 = 192.168.0.101
IP.8 = 192.168.0.100
    `;
    
    const configPath = path.join(certsDir, 'cert.conf');
    fs.writeFileSync(configPath, configContent);
    
    // Generate certificate
    execSync(`openssl req -new -x509 -key ${keyPath} -out ${certPath} -days 365 -config ${configPath} -extensions v3_req`, { stdio: 'inherit' });
    
    // Clean up config file
    fs.unlinkSync(configPath);
    
    console.log('✅ Certificate generated successfully!');
  } catch (error) {
    console.error('❌ Failed to generate certificate:', error.message);
    console.log('📝 Try running: brew install openssl (on macOS)');
    process.exit(1);
  }
}

console.log('🚀 Starting HTTPS development server...');
console.log('📝 You may need to accept the self-signed certificate in your browser');
console.log('🌐 Available at:');
console.log('   - https://localhost:3000');
console.log('   - https://192.168.0.106:3000');
