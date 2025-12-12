import { createContext, useContext, useEffect, useState } from 'react';
import { login as loginApi } from '../api/client';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem('auth');
    return stored ? JSON.parse(stored) : null;
  });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    if (auth) {
      localStorage.setItem('auth', JSON.stringify(auth));
    } else {
      localStorage.removeItem('auth');
    }
  }, [auth]);

  const login = async (credentials) => {
    setLoginError('');
    setLoginLoading(true);
    try {
      const payload = await loginApi(credentials);
      setAuth(payload);
      return true;
    } catch (error) {
      setLoginError(error.message || 'Login failed');
      return false;
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = () => {
    setAuth(null);
  };

  return (
    <AuthContext.Provider
      value={{ auth, login, logout, loginError, loginLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

