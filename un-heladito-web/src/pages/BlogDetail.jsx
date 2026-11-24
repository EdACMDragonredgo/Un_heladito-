import { Link, Navigate, useParams } from 'react-router-dom';
import { getArticleById } from './Blog.jsx';

export default function BlogDetail() {
  const { id } = useParams();
  const article = getArticleById(id);
  if (!article) return <Navigate to="/blog" replace />;
  return <main className="container section-space"><div className="article-wrap"><Link className="back-link text-start" to="/blog">← Volver al blog</Link><div className="article-hero">{article.icon}</div><span className="eyebrow">{article.tag} · {article.read}</span><h1>{article.title}</h1><p className="article-lead">{article.excerpt}</p><div className="article-body"><p>En Un Heladito creemos que un buen sabor comienza mucho antes de llegar al recipiente. La selección de ingredientes, la combinación de texturas y el cuidado de cada preparación son parte de una experiencia que queremos compartir.</p><p>Probar combinaciones nuevas también es una forma de descubrir tus favoritos. Los sabores frutales pueden aportar frescura, mientras que el cacao, los frutos secos y las salsas crean perfiles más profundos y cremosos.</p><p>Este contenido forma parte del blog de demostración del proyecto académico. Con una conexión a un backend, los artículos podrían administrarse desde el panel de contenido.</p></div><Link className="btn btn-primary" to="/productos">Descubrir sabores</Link></div></main>;
}
