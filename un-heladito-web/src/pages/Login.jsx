import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Alert from '../components/Alert.jsx';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  if (user) return <Navigate to={user.role === 'Administrador' ? '/admin' : '/mi-cuenta'} replace />;
  const submit = (event) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError('Ingresa un correo válido.'); return; }
    const result = login(form.email, form.password);
    if (!result.ok) { setError(result.message); return; }
    const redirect = location.state?.from || (result.user.role === 'Administrador' ? '/admin' : '/mi-cuenta');
    navigate(redirect, { replace: true });
  };
  return <main className="auth-page"><section className="auth-card"><div className="auth-icon">🍦</div><span className="eyebrow">QUÉ BUENO TENERTE DE VUELTA</span><h1>Iniciar sesión</h1><p>Entra para continuar disfrutando tus sabores favoritos.</p><Alert message={error} type="danger" onClose={() => setError('')} /><form onSubmit={submit} className="form-stack"><div className="form-group"><label htmlFor="email">Correo electrónico</label><input id="email" name="email" type="email" className="form-control" required autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></div><div className="form-group"><label htmlFor="password">Contraseña</label><input id="password" name="password" type="password" className="form-control" required autoComplete="current-password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></div><button type="submit" className="btn btn-primary btn-lg w-100">Ingresar</button></form><p className="auth-switch">¿Aún no tienes cuenta? <Link to="/registro">Crear cuenta</Link></p><div className="demo-credentials"><strong>Cuenta de prueba de administración</strong><span>admin@duoc.cl</span><span>Admin123!</span></div></section></main>;
}
