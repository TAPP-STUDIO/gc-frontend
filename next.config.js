/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow cross-origin requests from local network IPs
  allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    '192.168.0.106',
    '192.168.0.105', 
    '192.168.0.104',
    '192.168.0.103',
    '192.168.0.102',
    '192.168.0.101',
    '192.168.0.100',
    '192.168.1.1',
    '192.168.1.2',
    '192.168.1.3',
    '192.168.1.4',
    '192.168.1.5',
    '192.168.1.6',
    '192.168.1.7',
    '192.168.1.8',
    '192.168.1.9',
    '192.168.1.10',
    // Add more specific IPs as needed
    '10.0.0.1',
    '10.0.0.2',
    '172.16.0.1',
    '172.16.0.2'
  ],
  
  // Security headers for production
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'development' ? '*' : 'https://gavlikcapital.com'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
