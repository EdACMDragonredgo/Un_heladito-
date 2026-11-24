import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getOrders } from '../services/storage.js';
import { formatCLP } from '../services/format.js';

export default function Account() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  const orders = getOrders().filter((order) => order.customer?.email === user.email);
  return <main className="container section-space"><div className="page-heading page-heading-left"><span className="eyebrow">TU ESPACIO</span><h1>Hola, {user.name.split(' ')[0]} 👋</h1><p>Desde aquí puedes continuar comprando y revisar los pedidos registrados en esta demostración.</p></div><div className="account-grid"><section className="account-card"><span className="account-icon">🛍️</span><h2>Seguir comprando</h2><p>Descubre nuevos sabores y agrega tus favoritos al carrito.</p><Link className="btn btn-primary" to="/productos">Ver catálogo</Link></section><section className="account-card"><span className="account-icon">📦</span><h2>Mis pedidos</h2><p>{orders.length ? `Tienes ${orders.length} pedido(s) de demostración.` : 'Todavía no tienes pedidos registrados.'}</p>{orders.map((order) => <div className="mini-order" key={order.id}><span>{order.id}<small>{order.status}</small></span><strong>{formatCLP(order.total)}</strong></div>)}<Link className="back-link" to="/carrito">Ir al carrito →</Link></section></div></main>;
}
