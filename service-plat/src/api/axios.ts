import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getCookie } from '../utils/cookies';

const API_URL = '';

// Type for additional headers
interface AdditionalHeaders {
  [key: string]: string;
}

// Factory function to create axios instances
const createAxiosInstance = (
  baseURL: string,
  additionalHeaders: AdditionalHeaders = {},
  withCredentials: boolean = false
): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...additionalHeaders,
    },
    withCredentials,
  });
  return instance;
};

// Utility to get Authorization header
const getAuthHeaders = (): AdditionalHeaders => {
  const accessToken = getCookie('access_token');
  if (accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return {};
};

// Instance for API that requires authentication
export const myApi = (): AxiosInstance => {
  const authHeaders = getAuthHeaders();
  const instance = createAxiosInstance(
    API_URL,
    authHeaders
    // true
  );

  // Request interceptor: Attach token dynamically
  instance.interceptors.request.use(
    (request: InternalAxiosRequestConfig) => {
      const authHeaders = getAuthHeaders(); // Use the utility function to get the token headers
      if (request.headers) {
        request.headers.Authorization = authHeaders.Authorization || ''; // Set token dynamically
      }
      return request;
    },
    (error) => Promise.reject(error)
  );
  return instance;
};

// Instance for API that doesn't require authentication
export const myOpenApi = createAxiosInstance(
  API_URL
);

