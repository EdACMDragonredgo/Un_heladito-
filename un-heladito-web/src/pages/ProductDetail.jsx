import { Link, Navigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useProducts } from '../data/useProducts.js';
import { useCart } from '../context/CartContext.jsx';
import { formatCLP } from '../services/format.js';

export default function ProductDetail() {
  const { id } = useParams();
  const products = useProducts();
  const product = products.find((item) => item.id === id) ?? null;
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  if (!product) return <Navigate to="/productos" replace />;
  return <main className="container section-space"><div className="breadcrumbs"><Link to="/">Inicio</Link> / <Link to="/productos">Catálogo</Link> / {product.name}</div>
    <div className="detail-layout"><div className="detail-image"><img src={product.image || '/images/hero.jpg'} onError={(event) => { event.currentTarget.src = '/images/hero.jpg'; }} alt={product.name} /></div><div className="detail-copy"><span className="eyebrow">{product.category} · CÓDIGO {product.id}</span><h1>{product.name}</h1><div className="detail-price">{formatCLP(product.price)} <small>/ {product.format}</small></div><p>{product.description}</p><div className="product-facts"><div><small>Formato</small><strong>{product.format || 'Artesanal'}</strong></div><div><small>Disponibilidad</small><strong>{product.stock > 0 ? `${product.stock} unidades` : 'Agotado'}</strong></div><div><small>Alérgenos</small><strong>{product.allergens || 'Consultar'}</strong></div></div><div className="detail-buy"><label htmlFor="quantity">Cantidad</label><input id="quantity" type="number" className="form-control" min="1" max={product.stock} value={qty} onChange={(event) => setQty(Math.max(1, Math.min(product.stock || 1, Number(event.target.value) || 1)))} /><button className="btn btn-primary btn-lg" disabled={!product.stock} onClick={() => addToCart(product, qty)}>Agregar al carrito</button></div><p className="muted-note">Producto de demostración académica. Los precios están expresados en pesos chilenos.</p></div></div>
  </main>;
}
