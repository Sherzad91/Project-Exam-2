export function getStoredUsername() {
  return getStoredObj()?.name || null;
}

export function getStoredObj() {
  return JSON.parse(localStorage.getItem('user'));
}

export function getStoredToken() {
  return getStoredObj()?.token || null;
}
