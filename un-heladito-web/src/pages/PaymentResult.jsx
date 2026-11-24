import { Link, useLocation, Navigate } from 'react-router-dom';
import { formatCLP } from '../services/format.js';

export default function PaymentResult() {
  const { state } = useLocation();
  if (!state?.order) return <Navigate to="/productos" replace />;
  const { order, successful } = state;
  return <main className="container section-space"><section className={`result-card ${successful ? 'result-success' : 'result-failure'}`}><div className="result-icon">{successful ? '✓' : '×'}</div><span className="eyebrow">{successful ? 'PEDIDO REGISTRADO' : 'PAGO NO APROBADO'}</span><h1>{successful ? '¡Gracias por tu compra!' : 'No pudimos confirmar el pago'}</h1><p>{successful ? 'Tu compra de demostración quedó registrada correctamente.' : 'El pedido quedó registrado como rechazado en la simulación. Puedes volver al catálogo e intentarlo nuevamente.'}</p><div className="order-code">Número de pedido <strong>{order.id}</strong></div><div className="result-order-lines">{order.items.map((item) => <div key={item.id}><span>{item.qty} × {item.name}</span><strong>{formatCLP(item.qty * item.price)}</strong></div>)}</div><div className="summary-total"><span>Total</span><strong>{formatCLP(order.total)}</strong></div><div className="hero-actions justify-content-center"><Link className="btn btn-primary" to="/productos">Volver al catálogo</Link><Link className="btn btn-quiet" to="/">Ir al inicio</Link></div><small className="muted-note">Esta pantalla simula una pasarela de pago; no procesa transacciones reales.</small></section></main>;
}
