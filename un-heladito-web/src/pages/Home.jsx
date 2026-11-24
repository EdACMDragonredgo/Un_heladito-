import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useProducts } from '../data/useProducts.js';

export default function Home() {
  const products = useProducts();
  const { addToCart } = useCart();
  const featured = products.slice(0, 4);
  return <>
    <section className="hero-section"><div className="container hero-grid">
      <div className="hero-copy"><span className="hero-kicker">HECHO CON CARIÑO, SERVIDO CON ALEGRÍA</span><h1>El sabor de la <em>felicidad</em> está en cada cucharada.</h1><p>Helados artesanales e ingredientes que se sienten de verdad. Encuentra tu nuevo sabor favorito.</p>
        <div className="hero-actions"><Link className="btn btn-primary btn-lg" to="/productos">Descubrir sabores <span aria-hidden="true">→</span></Link><Link className="btn btn-quiet btn-lg" to="/nosotros">Nuestra historia</Link></div>
        <div className="hero-social-proof"><span>🍓 🍫 🥭</span><div><strong>Sabores que enamoran</strong><small>Preparados con dedicación artesanal</small></div></div>
      </div>
      <div className="hero-art"><div className="hero-image-wrap"><img src="/images/hero.jpg" alt="Helado artesanal de chocolate" /><span className="hero-stamp">100%<small>ANTOJO</small></span></div><div className="floating-note">✨ Un momento<br />solo para ti</div></div>
    </div></section>
    <section className="container section-space"><div className="section-heading"><div><span className="eyebrow">HECHOS PARA DISFRUTAR</span><h2>Un sabor para cada antojo</h2><p>Recetas artesanales para hacer especial cualquier momento.</p></div><Link className="text-link" to="/categorias">Explorar categorías →</Link></div>
      <div className="category-tiles"><Link to="/categorias?tipo=Helados tradicionales" className="category-tile category-pink"><span>🍨</span><h3>Helados clásicos</h3><small>Cremosos e irresistibles</small></Link><Link to="/categorias?tipo=Sorbetes y veganos" className="category-tile category-mint"><span>🍋</span><h3>Sorbetes frutales</h3><small>Frescos y llenos de sabor</small></Link><Link to="/categorias?tipo=Paletas artesanales" className="category-tile category-yellow"><span>🍭</span><h3>Paletas artesanales</h3><small>Un antojo para llevar</small></Link></div>
    </section>
    <section className="featured-section section-space"><div className="container"><div className="section-heading"><div><span className="eyebrow">LOS FAVORITOS</span><h2>Los más tentadores</h2><p>Una selección de nuestros sabores favoritos.</p></div><Link className="text-link" to="/productos">Ver todos los sabores →</Link></div>
      <div className="row g-4">{featured.map((product) => <div className="col-12 col-sm-6 col-xl-3" key={product.id}><ProductCard product={product} onAddToCart={addToCart} /></div>)}</div>
    </div></section>
    <section className="promise-strip"><div className="container promise-grid"><div><span>🌱</span><strong>Ingredientes seleccionados</strong><small>Calidad en cada preparación</small></div><div><span>🍦</span><strong>Hecho artesanalmente</strong><small>Pequeños detalles, gran sabor</small></div><div><span>💗</span><strong>Momentos felices</strong><small>Un heladito siempre viene bien</small></div></div></section>
  </>;
}
