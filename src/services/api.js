import axios from 'axios';
import { getStoredToken } from './localStorage';
import { API_BASE } from '../config/constants';

const defaultConfig = {
  baseURL: API_BASE,
};

async function get(url, config) {
  return axios.get(url, {
    ...defaultConfig,
    ...config,
    headers: {
      ...config?.headers,
      common: {
        Authorization: `Bearer ${getStoredToken()}`,
      },
    },
  });
}

async function post(url, body, config) {
  return axios.post(url, body, {
    ...defaultConfig,
    ...config,
    headers: {
      ...config?.headers,
      common: {
        Authorization: `Bearer ${getStoredToken()}`,
      },
    },
  });
}

async function put(url, body, config) {
  return axios.put(url, body, {
    ...defaultConfig,
    ...config,
    headers: {
      ...config?.headers,
      common: {
        Authorization: `Bearer ${getStoredToken()}`,
      },
    },
  });
}

async function Delete(url, config) {
  return axios.delete(url, {
    ...defaultConfig,
    ...config,
    headers: {
      ...config?.headers,
      common: {
        Authorization: `Bearer ${getStoredToken()}`,
      },
    },
  });
}

export default {
  get,
  post,
  put,
  Delete,
};
