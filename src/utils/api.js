import { getToken } from './auth';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Generic GET request with auth header
export const apiGet = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.json();
};

// Generic POST request with JSON body
export const apiPost = async (endpoint, body) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

// Generic DELETE request
export const apiDelete = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response;
};
