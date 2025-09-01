// AWS Cognito Configuration
export const cognitoConfig = {
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'eu-central-1',
  userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID || '',
  clientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID || '',
  // Optional: If you have a custom domain
  domain: process.env.NEXT_PUBLIC_AWS_COGNITO_DOMAIN || '',
};

// API Configuration
export const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1',
  timeout: 30000,
};

// Validate required config
export const validateConfig = () => {
  const required = [
    'NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID',
    'NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID',
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing);
    return false;
  }
  
  return true;
};
