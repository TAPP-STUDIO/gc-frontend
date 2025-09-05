import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
  CognitoRefreshToken,
} from 'amazon-cognito-identity-js';
import { cognitoConfig, isValidConfig } from '@/config/cognito';
import Cookies from 'js-cookie';

// Lazy initialization of Cognito User Pool
let userPool: CognitoUserPool | null = null;

const getUserPool = (): CognitoUserPool | null => {
  // Only initialize in browser with valid config
  if (typeof window === 'undefined' || !isValidConfig()) {
    return null;
  }
  
  if (!userPool) {
    userPool = new CognitoUserPool({
      UserPoolId: cognitoConfig.userPoolId,
      ClientId: cognitoConfig.clientId,
    });
  }
  
  return userPool;
};

export interface AuthTokens {
  idToken: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface CognitoUserData {
  email: string;
  email_verified: boolean;
  sub: string;
  'cognito:groups'?: string[];
  'custom:firstName'?: string;
  'custom:lastName'?: string;
  'custom:role'?: string;
}

class AuthService {
  private readonly TOKEN_KEY = 'gc_admin_tokens';
  private readonly USER_KEY = 'gc_admin_user';

  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string): Promise<{ session?: CognitoUserSession; tokens?: AuthTokens; newPasswordRequired?: boolean; sessionData?: { userAttributes: Record<string, unknown>; requiredAttributes: string[]; cognitoUser: CognitoUser } }> {
    const pool = getUserPool();
    if (!pool) {
      throw new Error('Cognito User Pool not available');
    }
    
    return new Promise((resolve, reject) => {
      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: pool,
      });

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
          const tokens: AuthTokens = {
            idToken: session.getIdToken().getJwtToken(),
            accessToken: session.getAccessToken().getJwtToken(),
            refreshToken: session.getRefreshToken().getToken(),
            expiresIn: 3600, // 1 hour default
          };

          // Store tokens in cookies
          this.storeTokens(tokens);

          // Decode and store user data
          const userData = this.decodeIdToken(tokens.idToken);
          if (userData) {
            this.storeUserData(userData);
          }

          resolve({ session, tokens });
        },
        onFailure: (err) => {
          reject(err);
        },
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          // Handle new password requirement - return data for completing challenge
          resolve({
            newPasswordRequired: true,
            sessionData: {
              userAttributes,
              requiredAttributes,
              cognitoUser,
            },
          });
        },
      });
    });
  }

  /**
   * Complete new password challenge
   */
  async completeNewPasswordChallenge(
    cognitoUser: CognitoUser,
    newPassword: string,
    userAttributes: Record<string, unknown>
  ): Promise<{ session: CognitoUserSession; tokens: AuthTokens }> {
    return new Promise((resolve, reject) => {
      // Remove fields that shouldn't be sent back
      delete userAttributes.email_verified;
      delete userAttributes.phone_number_verified;

      cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, {
        onSuccess: (session) => {
          const tokens: AuthTokens = {
            idToken: session.getIdToken().getJwtToken(),
            accessToken: session.getAccessToken().getJwtToken(),
            refreshToken: session.getRefreshToken().getToken(),
            expiresIn: 3600,
          };

          // Store tokens in cookies
          this.storeTokens(tokens);

          // Decode and store user data
          const userData = this.decodeIdToken(tokens.idToken);
          if (userData) {
            this.storeUserData(userData);
          }

          resolve({ session, tokens });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  /**
   * Sign out the current user
   */
  signOut(): void {
    const pool = getUserPool();
    if (pool) {
      const cognitoUser = pool.getCurrentUser();
      if (cognitoUser) {
        cognitoUser.signOut();
      }
    }
    this.clearTokens();
    this.clearUserData();
  }

  /**
   * Get current user session
   */
  async getCurrentSession(): Promise<CognitoUserSession | null> {
    const pool = getUserPool();
    if (!pool) {
      return null;
    }
    
    return new Promise((resolve) => {
      const cognitoUser = pool.getCurrentUser();

      if (!cognitoUser) {
        resolve(null);
        return;
      }

      cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
        if (err || !session) {
          resolve(null);
          return;
        }

        if (!session.isValid()) {
          resolve(null);
          return;
        }

        resolve(session);
      });
    });
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<AuthTokens | null> {
    const pool = getUserPool();
    if (!pool) {
      return null;
    }
    
    return new Promise((resolve) => {
      const cognitoUser = pool.getCurrentUser();

      if (!cognitoUser) {
        resolve(null);
        return;
      }

      const tokens = this.getStoredTokens();
      if (!tokens?.refreshToken) {
        resolve(null);
        return;
      }

      const refreshToken = new CognitoRefreshToken({ RefreshToken: tokens.refreshToken });

      cognitoUser.refreshSession(refreshToken, (err, session) => {
        if (err || !session) {
          resolve(null);
          return;
        }

        const newTokens: AuthTokens = {
          idToken: session.getIdToken().getJwtToken(),
          accessToken: session.getAccessToken().getJwtToken(),
          refreshToken: session.getRefreshToken().getToken(),
          expiresIn: 3600,
        };

        this.storeTokens(newTokens);
        resolve(newTokens);
      });
    });
  }

  /**
   * Check if user is in gc_super_admins group
   */
  isUserInAdminGroup(userData?: CognitoUserData | null): boolean {
    const user = userData || this.getStoredUserData();
    if (!user) return false;
    
    const groups = user['cognito:groups'] || [];
    return groups.includes('gc_super_admins');
  }

  /**
   * Decode ID token to get user data
   */
  decodeIdToken(idToken: string): CognitoUserData | null {
    try {
      const base64Url = idToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      return JSON.parse(jsonPayload) as CognitoUserData;
    } catch (error) {
      console.error('Error decoding ID token:', error);
      return null;
    }
  }

  /**
   * Forgot password
   */
  async forgotPassword(email: string): Promise<{ message?: string; session?: string }> {
    return new Promise((resolve, reject) => {
      const pool = getUserPool();
      if (!pool) {
        reject(new Error('Cognito User Pool not available'));
        return;
      }
      
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: pool,
      });

      cognitoUser.forgotPassword({
        onSuccess: () => {
          resolve({ message: 'Forgot password initiated' });
        },
        onFailure: (err: unknown) => {
          reject(err);
        },
      });
    });
  }

  /**
   * Confirm new password with verification code
   */
  async confirmPassword(email: string, code: string, newPassword: string): Promise<{ message?: string }> {
    return new Promise((resolve, reject) => {
      const pool = getUserPool();
      if (!pool) {
        reject(new Error('Cognito User Pool not available'));
        return;
      }
      
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: pool,
      });

      cognitoUser.confirmPassword(code, newPassword, {
        onSuccess: () => {
          resolve({ message: 'Password confirmed' });
        },
        onFailure: (err: unknown) => {
          reject(err);
        },
      });
    });
  }

  /**
   * Change password for authenticated user
   */
  async changePassword(oldPassword: string, newPassword: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const pool = getUserPool();
      if (!pool) {
        reject(new Error('Cognito User Pool not available'));
        return;
      }
      
      const cognitoUser = pool.getCurrentUser();

      if (!cognitoUser) {
        reject(new Error('No authenticated user'));
        return;
      }

      cognitoUser.changePassword(oldPassword, newPassword, (err: unknown, result: unknown) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  /**
   * Store tokens in cookies
   */
  storeTokens(tokens: AuthTokens): void {
    // Store in secure, httpOnly cookies in production
    Cookies.set(this.TOKEN_KEY, JSON.stringify(tokens), {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  }

  /**
   * Get stored tokens
   */
  getStoredTokens(): AuthTokens | null {
    const tokensStr = Cookies.get(this.TOKEN_KEY);
    if (!tokensStr) return null;
    
    try {
      return JSON.parse(tokensStr) as AuthTokens;
    } catch {
      return null;
    }
  }

  /**
   * Clear stored tokens
   */
  private clearTokens(): void {
    Cookies.remove(this.TOKEN_KEY);
  }

  /**
   * Store user data
   */
  storeUserData(userData: CognitoUserData): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
  }

  /**
   * Get stored user data
   */
  getStoredUserData(): CognitoUserData | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr) as CognitoUserData;
    } catch {
      return null;
    }
  }

  /**
   * Clear stored user data
   */
  private clearUserData(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  /**
   * Check if tokens are expired
   */
  isTokenExpired(): boolean {
    const tokens = this.getStoredTokens();
    if (!tokens?.idToken) return true;

    const userData = this.decodeIdToken(tokens.idToken);
    if (!userData) return true;

    // Check expiration (exp is in seconds)
    const now = Math.floor(Date.now() / 1000);
    const exp = (userData as unknown as Record<string, unknown>)['exp'];
    return typeof exp === 'number' && exp < now;
  }
}

export const authService = new AuthService();
