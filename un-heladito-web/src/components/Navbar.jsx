import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const links = [
  ['/', 'Inicio'], ['/productos', 'Catálogo'], ['/categorias', 'Categorías'],
  ['/ofertas', 'Ofertas'], ['/blog', 'Blog'], ['/nosotros', 'Nosotros'], ['/contacto', 'Contacto'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { user, logout } = useAuth();
  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg container py-3" aria-label="Navegación principal">
        <Link className="navbar-brand brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-mark">🍦</span><span>Un Heladito<small>HELADERÍA ARTESANAL</small></span>
        </Link>
        <button className="navbar-toggler" type="button" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${open ? 'show' : ''}`}>
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            {links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setOpen(false)}>{label}</NavLink>)}
            {user?.role === 'Administrador' && <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setOpen(false)}>Administración</NavLink>}
            <Link className="btn btn-cart ms-lg-2" to="/carrito" onClick={() => setOpen(false)}>🛒 Carrito <span className="cart-badge">{count}</span></Link>
            {user ? <div className="nav-user"><span className="small text-muted">Hola, {user.name.split(' ')[0]}</span><button className="btn btn-sm btn-outline-secondary" onClick={() => { logout(); setOpen(false); }}>Salir</button></div> : <Link className="btn btn-primary-soft ms-lg-2" to="/login" onClick={() => setOpen(false)}>Ingresar</Link>}
          </div>
        </div>
      </nav>
    </header>
  );
}
