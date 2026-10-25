import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Alert from '../components/Alert.jsx';

export default function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  if (user) return <Navigate to={user.role === 'Administrador' ? '/admin' : '/mi-cuenta'} replace />;
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    if (form.password !== form.confirm) { setError('Las contraseñas no coinciden.'); return; }
    const result = register(form);
    if (!result.ok) { setError(result.message); return; }
    navigate('/mi-cuenta', { replace: true });
  };
  return <main className="auth-page"><section className="auth-card"><div className="auth-icon">🍓</div><span className="eyebrow">ÚNETE A LA FAMILIA</span><h1>Crear cuenta</h1><p>Regístrate para tener una experiencia más cómoda en tu próxima compra.</p><Alert message={error} type="danger" onClose={() => setError('')} /><form onSubmit={submit} className="form-stack"><div className="form-group"><label htmlFor="name">Nombre completo</label><input id="name" name="name" className="form-control" minLength="3" required value={form.name} onChange={update} autoComplete="name" /></div><div className="form-group"><label htmlFor="email">Correo electrónico</label><input id="email" name="email" type="email" className="form-control" required value={form.email} onChange={update} autoComplete="email" /></div><div className="form-group"><label htmlFor="password">Contraseña</label><input id="password" name="password" type="password" className="form-control" minLength="8" required value={form.password} onChange={update} autoComplete="new-password" /></div><div className="form-group"><label htmlFor="confirm">Confirmar contraseña</label><input id="confirm" name="confirm" type="password" className="form-control" minLength="8" required value={form.confirm} onChange={update} autoComplete="new-password" /></div><button type="submit" className="btn btn-primary btn-lg w-100">Crear mi cuenta</button></form><p className="auth-switch">¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link></p><small className="muted-note">Registro de demostración. Los datos se guardan localmente en este navegador.</small></section></main>;
}
