import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { formatCLP } from '../services/format.js';
import { useProducts } from '../data/useProducts.js';

export default function Cart() {
  const { items, count, total, setQuantity, removeFromCart, clearCart } = useCart();
  const products = useProducts();
  const navigate = useNavigate();
  const stockFor = (id) => products.find((product) => product.id === id)?.stock ?? 99;
  return <main className="container section-space"><div className="page-heading page-heading-left"><span className="eyebrow">TU SELECCIÓN</span><h1>Mi carrito</h1><p>Un par de pasos más y tus sabores favoritos estarán listos.</p></div>
    {items.length === 0 ? <div className="empty-state"><span>🛒</span><h2>Tu carrito está esperando sabores</h2><p>Agrega helados desde el catálogo para comenzar tu compra.</p><Link className="btn btn-primary" to="/productos">Ver catálogo</Link></div> : <div className="cart-layout"><section className="cart-items-panel">{items.map((item) => <article className="cart-line" key={item.id}><img src={item.image || '/images/hero.jpg'} onError={(event) => { event.currentTarget.src = '/images/hero.jpg'; }} alt={item.name} /><div className="cart-line-info"><h2>{item.name}</h2><p>{formatCLP(item.price)} por unidad</p><button className="remove-link" onClick={() => removeFromCart(item.id)}>Eliminar</button></div><div className="quantity-stepper"><button aria-label={`Disminuir ${item.name}`} onClick={() => setQuantity(item.id, item.qty - 1)}>−</button><span>{item.qty}</span><button aria-label={`Aumentar ${item.name}`} disabled={item.qty >= stockFor(item.id)} onClick={() => setQuantity(item.id, item.qty + 1)}>+</button></div><strong className="line-subtotal">{formatCLP(item.price * item.qty)}</strong></article>)}<button className="btn btn-outline-secondary btn-sm mt-3" onClick={clearCart}>Vaciar carrito</button></section>
      <aside className="order-summary"><span className="eyebrow">RESUMEN</span><h2>Tu pedido</h2><div className="summary-row"><span>Productos ({count})</span><strong>{formatCLP(total)}</strong></div><div className="summary-row"><span>Entrega</span><strong>A calcular</strong></div><div className="summary-total"><span>Total parcial</span><strong>{formatCLP(total)}</strong></div><button className="btn btn-primary btn-lg w-100" onClick={() => navigate('/checkout')}>Continuar compra →</button><Link className="back-link" to="/productos">← Seguir comprando</Link><p className="safe-note">🔒 Pago simulado para fines académicos.</p></aside></div>}
  </main>;
}
