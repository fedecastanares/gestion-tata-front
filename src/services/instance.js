import axios from 'axios';
import { getToken, deauthenticateUser } from './auth/auth';

// `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BASE_URL}`

export const axiosApiInstance = axios.create({baseURL: `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_PORT}`, timeout: 800});

axiosApiInstance.interceptors.request.use(
  async config => {
    const token = getToken();
    config.headers = { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if ((error.response.status === 403 || error.response.status === 401) && !originalRequest._retry) {
    deauthenticateUser();
    window.location = "/";
    return;
  } else {
    console.log(error);
  }
  window.location = "/";
  return Promise.reject(error);
});

