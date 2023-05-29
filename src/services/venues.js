import api from './api';

export async function getVenues() {
  const { data } = await api.get(`/venues?limit=100&_owner=true`);
  return data;
}

export async function getSimilarVenues() {
  const { data } = await api.get(`/venues?limit=4`);
  return data;
}

export async function getVenue(id) {
  const { data } = await api.get(`/venues/${id}?_owner=true&_bookings=true`);
  return data;
}

export async function postVenue(venue) {
  const { data } = await api.post(`/venues`, venue);
  return data;
}

export async function putVenue(venue) {
  const { data } = await api.put(`/venues/${venue.id}`, venue);
  return data;
}

export async function deleteVenue(id) {
  const { data } = await api.Delete(`/venues/${id}`);
  return data;
}

export async function getVenuesByProfile(profile) {
  const { data } = await api.get(`/profiles/${profile}/venues`);
  return data;
}
