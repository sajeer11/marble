// Credentials configuration for admin and user authentication
// This is a simple credential store - in production, use a proper authentication system

export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
  email: 'admin@marblelux.com',
  role: 'admin',
};

export const TEST_USER_CREDENTIALS = {
  username: 'user',
  password: 'user123',
  email: 'user@marblelux.com',
  role: 'user',
};

// Function to validate admin credentials
export const validateAdminCredentials = (username: string, password: string): boolean => {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
};

// Function to validate user credentials
export const validateUserCredentials = (username: string, password: string): boolean => {
  return username === TEST_USER_CREDENTIALS.username && password === TEST_USER_CREDENTIALS.password;
};

// Function to get user by credentials
export const getUserByCredentials = (username: string, password: string, userType: 'admin' | 'user') => {
  if (userType === 'admin') {
    if (validateAdminCredentials(username, password)) {
      return {
        id: '1',
        username: ADMIN_CREDENTIALS.username,
        email: ADMIN_CREDENTIALS.email,
        role: 'admin',
      };
    }
  } else {
    if (validateUserCredentials(username, password)) {
      return {
        id: '2',
        username: TEST_USER_CREDENTIALS.username,
        email: TEST_USER_CREDENTIALS.email,
        role: 'user',
      };
    }
  }
  return null;
};

// Demo credentials info for UI display
export const DEMO_CREDENTIALS = {
  admin: {
    username: 'admin',
    password: 'admin123',
  },
  user: {
    username: 'user',
    password: 'user123',
  },
};
