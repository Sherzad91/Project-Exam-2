import api from './api';

export async function bookVenue(booking) {
  const { data } = await api.post(`/bookings`, booking);
  return data;
}

export async function getBookings(name) {
  const { data } = await api.get(`/profiles/${name}/bookings?_venue=true`);
  return data;
}

export async function deleteBooking(id) {
  const { data } = await api.Delete(`/bookings/${id}`);
  return data;
}
