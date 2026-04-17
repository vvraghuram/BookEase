import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUser, saveUser, removeUser, findAccount, saveAccount } from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount: restore session
  useEffect(() => {
    (async () => {
      const saved = await getUser();
      if (saved) setUser(saved);
      setLoading(false);
    })();
  }, []);

  /**
   * Register a new account.
   * Returns { success, error }
   */
  async function register({ name, email, password }) {
    const existing = await findAccount(email);
    if (existing) return { success: false, error: 'An account with this email already exists.' };

    const newUser = {
      id: `u_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password, // plain-text acceptable per mock data spec
      createdAt: new Date().toISOString(),
    };

    await saveAccount(newUser);
    await saveUser(newUser);
    setUser(newUser);
    return { success: true };
  }

  /**
   * Login with email + password.
   * Returns { success, error }
   */
  async function login({ email, password }) {
    const account = await findAccount(email);
    if (!account) return { success: false, error: 'No account found with this email.' };
    if (account.password !== password) return { success: false, error: 'Incorrect password.' };

    await saveUser(account);
    setUser(account);
    return { success: true };
  }

  async function logout() {
    await removeUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
