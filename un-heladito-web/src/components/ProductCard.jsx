import { Link } from 'react-router-dom';
import { formatCLP } from '../services/format.js';

export default function ProductCard({ product, onAddToCart }) {
  const handleImageError = (event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/images/hero.jpg'; };
  return <article className="product-card h-100">
    <Link className="product-photo" to={`/productos/${product.id}`} aria-label={`Ver ${product.name}`}>
      <img src={product.image || '/images/hero.jpg'} alt={product.name} loading="lazy" onError={handleImageError} />
      {product.offer && <span className="product-ribbon">Oferta</span>}
    </Link>
    <div className="product-body">
      <span className="eyebrow">{product.category}</span>
      <Link className="product-title-link" to={`/productos/${product.id}`}><h2>{product.name}</h2></Link>
      <p className="product-description">{product.description}</p>
      <div className="product-bottom"><div><strong>{formatCLP(product.price)}</strong><small>{product.format || 'Artesanal'}</small></div>
        <button className="btn-add" type="button" disabled={Number(product.stock) <= 0} onClick={() => onAddToCart(product)}>{Number(product.stock) > 0 ? 'Agregar +' : 'Agotado'}</button>
      </div>
    </div>
  </article>;
}
