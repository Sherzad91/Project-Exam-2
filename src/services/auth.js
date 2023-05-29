import axios from 'axios';
import { API_BASE } from '../config/constants';

export async function login(body) {
  const { data } = await axios.post(`${API_BASE}/auth/login`, body);
  return data;
}

export async function register(body) {
  const { data } = await axios.post(`${API_BASE}/auth/register`, body);
  return data;
}
