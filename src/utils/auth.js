// Save token to localStorage
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Clear token (on logout)
export const clearToken = () => {
  localStorage.removeItem('token');
};