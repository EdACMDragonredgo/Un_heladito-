import { Link } from 'react-router-dom';

const articles = [
  { id: 'fruta-de-temporada', tag: 'INGREDIENTES', title: 'Por qué la fruta de temporada cambia el sabor', excerpt: 'Elegir fruta en su punto de maduración es una de las claves para conseguir sabores más vivos y equilibrados.', icon: '🍓', read: '3 min de lectura' },
  { id: 'helado-artesanal', tag: 'NUESTRA COCINA', title: 'Qué hace especial a un helado artesanal', excerpt: 'Textura, paciencia y atención a los pequeños detalles: conoce parte del proceso detrás de cada sabor.', icon: '🍦', read: '4 min de lectura' },
  { id: 'sabores-nuevos', tag: 'INSPIRACIÓN', title: 'Combinaciones de sabores que vale la pena probar', excerpt: 'Chocolate con avellana, frutilla con albahaca y otras ideas para salir de los sabores de siempre.', icon: '✨', read: '2 min de lectura' },
];

export function getArticleById(id) { return articles.find((article) => article.id === id) || null; }

export default function Blog() {
  return <main className="container section-space"><div className="page-heading"><span className="eyebrow">IDEAS CON SABOR</span><h1>El blog de Un Heladito</h1><p>Historias, ingredientes y pequeñas curiosidades de nuestro mundo heladero.</p></div><div className="row g-4">{articles.map((article) => <div className="col-12 col-md-6 col-lg-4" key={article.id}><article className="blog-card"><div className="blog-illustration">{article.icon}</div><div className="blog-card-body"><span className="eyebrow">{article.tag}</span><h2>{article.title}</h2><p>{article.excerpt}</p><div className="blog-meta"><small>{article.read}</small><Link to={`/blog/${article.id}`}>Leer artículo →</Link></div></div></article></div>)}</div></main>;
}
