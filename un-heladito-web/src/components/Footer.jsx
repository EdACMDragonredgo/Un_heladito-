import { Link } from 'react-router-dom';
export default function Footer() {
  return <footer className="site-footer"><div className="container footer-grid">
    <div><Link to="/" className="footer-brand">🍦 Un Heladito</Link><p>Helados artesanales, sabores creativos e ingredientes seleccionados con cariño.</p></div>
    <div><h3>Explora</h3><Link to="/productos">Catálogo</Link><Link to="/ofertas">Ofertas</Link><Link to="/blog">Blog</Link><Link to="/nosotros">Nuestra historia</Link></div>
    <div><h3>Ayuda</h3><Link to="/contacto">Contacto</Link><Link to="/carrito">Mi carrito</Link><Link to="/login">Mi cuenta</Link></div>
    <div><h3>Proyecto académico</h3><p>DSY1104 · Desarrollo Fullstack II<br />Duoc UC · 2026</p></div>
  </div><div className="footer-bottom">© {new Date().getFullYear()} Un Heladito. Demostración académica.</div></footer>;
}
