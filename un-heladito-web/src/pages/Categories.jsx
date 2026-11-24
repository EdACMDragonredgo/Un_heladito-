import { Link, useSearchParams } from 'react-router-dom';
import { useProducts } from '../data/useProducts.js';
import { useCategories } from '../data/useCategories.js';

const categoryStyles = [
  { icon: '🍨', copy: 'Clásicos cremosos para volver a elegir una y otra vez.', className: 'category-pink' },
  { icon: '🍋', copy: 'Sabores frutales y opciones frescas.', className: 'category-mint' },
  { icon: '🍭', copy: 'Pequeños antojos hechos para llevar.', className: 'category-yellow' },
  { icon: '🍮', copy: 'Copas y postres para darse un gusto especial.', className: 'category-lilac' },
];

export default function Categories() {
  const products = useProducts();
  const categories = useCategories();
  const [params] = useSearchParams();
  const selected = params.get('tipo');
  const visible = (selected ? categories.filter((name) => name === selected) : categories).map((name, index) => ({ name, ...categoryStyles[index % categoryStyles.length] }));
  return <main className="container section-space"><div className="page-heading"><span className="eyebrow">ENCUENTRA TU FAVORITO</span><h1>Nuestras categorías</h1><p>Explora la colección por tipo de producto.</p></div><div className="row g-4">{visible.map((category) => <div className="col-12 col-md-6" key={category.name}><Link className={`category-panel ${category.className}`} to={`/productos?categoria=${encodeURIComponent(category.name)}`} onClick={() => {}}><span className="category-icon">{category.icon}</span><div><h2>{category.name}</h2><p>{category.copy}</p><small>{products.filter((product) => product.category === category.name).length} sabores disponibles</small></div><span className="category-arrow">→</span></Link></div>)}</div></main>;
}
