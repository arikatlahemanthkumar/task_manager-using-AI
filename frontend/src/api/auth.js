const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';

export const register = async (data) => {
  try {
    console.log('Sending registration request:', data);
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    console.log('Registration response status:', res.status);
    const responseData = await res.json();
    console.log('Registration response data:', responseData);
    
    if (!res.ok) {
      return { message: responseData.message || 'Registration failed' };
    }
    
    return responseData;
  } catch (error) {
    console.error('Registration error:', error);
    return { message: 'Network error. Please check your connection.' };
  }
};

export const login = async (data) => {
  try {
    console.log('Sending login request:', data);
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    console.log('Login response status:', res.status);
    const responseData = await res.json();
    console.log('Login response data:', responseData);
    
    if (!res.ok) {
      return { message: responseData.message || 'Login failed' };
    }
    
    return responseData;
  } catch (error) {
    console.error('Login error:', error);
    return { message: 'Network error. Please check your connection.' };
  }
};

export const forgotPassword = async (data) => {
  try {
    const res = await fetch(`${API_URL}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const responseData = await res.json();
    
    if (!res.ok) {
      return { message: responseData.message || 'Failed to send reset link' };
    }
    
    return responseData;
  } catch (error) {
    console.error('Forgot password error:', error);
    return { message: 'Network error. Please check your connection.' };
  }
};

export const resetPassword = async (data) => {
  try {
    const res = await fetch(`${API_URL}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const responseData = await res.json();
    
    if (!res.ok) {
      return { message: responseData.message || 'Password reset failed' };
    }
    
    return responseData;
  } catch (error) {
    console.error('Reset password error:', error);
    return { message: 'Network error. Please check your connection.' };
  }
}; 