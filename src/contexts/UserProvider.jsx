import { createContext, useState, useEffect } from 'react';
import { login as loginUser, register as registerUser } from '../services/auth';
import { getStoredUsername } from '../services/localStorage';
import { getProfileByName } from '../services/profiles';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const username = getStoredUsername();
    if (!username) return;

    setLoading(true);
    getProfileByName(username)
      .then((data) => {
        setUser(data);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function login(body) {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(body);
      if (data) {
        setUser(data);

        localStorage.setItem(
          'user',
          JSON.stringify({
            name: data.name,
            token: data.accessToken,
          })
        );
        setLoading(false);
        setError(null);
        return true;
      }
    } catch (e) {
      setError(e?.response?.data?.errors?.[0].message);
    }
    setLoading(false);
  }

  // register doesn't return token, so we can't set user here
  async function register(body) {
    setLoading(true);
    setError(null);
    try {
      const data = await registerUser(body);

      if (data) {
        setError(null);
        setLoading(false);
        return data;
      }
    } catch (e) {
      setError(e?.response?.data?.errors?.[0].message);
    }

    setLoading(false);
  }

  function clearError() {
    setError(null);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('user');
  }

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, register, loading, error, clearError }}>
      {children}
    </UserContext.Provider>
  );
}
