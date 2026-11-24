import { createContext, useContext, useMemo, useState } from 'react';
import { readJSON, writeJSON } from '../services/storage.js';

const AuthContext = createContext(null);
const USERS_KEY = 'unheladito_users';
const SESSION_KEY = 'unheladito_session';

function loadUsers() {
  let users = readJSON(USERS_KEY, null);
  if (!Array.isArray(users) || users.length === 0) {
    // Cuenta de demostración para el proyecto académico; no usar contraseñas reales aquí.
    users = [{ id: 'demo-admin', name: 'Administrador Demo', email: 'admin@duoc.cl', password: 'Admin123!', role: 'Administrador' }];
    writeJSON(USERS_KEY, users);
  }
  return users;
}

function loadSession() {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadSession);

  const login = (email, password) => {
    const normalizedEmail = String(email).trim().toLowerCase();
    const found = loadUsers().find((candidate) => candidate.email.toLowerCase() === normalizedEmail && candidate.password === password);
    if (!found) return { ok: false, message: 'Correo o contraseña incorrectos.' };
    const session = { id: found.id, name: found.name, email: found.email, role: found.role };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true, user: session };
  };

  const register = ({ name, email, password }) => {
    const cleanName = String(name || '').trim();
    const normalizedEmail = String(email || '').trim().toLowerCase();
    if (cleanName.length < 3) return { ok: false, message: 'El nombre debe tener al menos 3 caracteres.' };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) return { ok: false, message: 'Ingresa un correo válido.' };
    if (String(password || '').length < 8) return { ok: false, message: 'La contraseña debe tener al menos 8 caracteres.' };
    const users = loadUsers();
    if (users.some((candidate) => candidate.email.toLowerCase() === normalizedEmail)) return { ok: false, message: 'Ese correo ya está registrado.' };
    const account = { id: `user-${Date.now()}`, name: cleanName, email: normalizedEmail, password, role: 'Cliente' };
    writeJSON(USERS_KEY, [...users, account]);
    const session = { id: account.id, name: account.name, email: account.email, role: account.role };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true, user: session };
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, register, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider.');
  return context;
}
