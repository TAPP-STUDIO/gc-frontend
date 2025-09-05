// AWS Cognito Configuration
export const cognitoConfig = {
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'eu-central-1',
  userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID || 'dummy-pool-id',
  clientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID || 'dummy-client-id',
  // Optional: If you have a custom domain
  domain: process.env.NEXT_PUBLIC_AWS_COGNITO_DOMAIN || '',
};

// API Configuration
export const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1',
  timeout: 30000,
};

// Check if we're in browser and have real config
export const isValidConfig = () => {
  return typeof window !== 'undefined' && 
         cognitoConfig.userPoolId !== 'dummy-pool-id' && 
         cognitoConfig.clientId !== 'dummy-client-id';
};

// Validate required config
export const validateConfig = () => {
  // Skip validation during build/SSR
  if (typeof window === 'undefined') {
    return true;
  }
  
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
