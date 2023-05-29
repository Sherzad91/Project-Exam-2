import api from './api';

export async function getProfileByName(name) {
  const { data } = await api.get('/profiles/' + name);
  return data;
}

export async function updateProfile(name, body) {
  const { data } = await api.put(`/profiles/${name}/media`, body);
  return data;
}
