import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useProducts } from '../data/useProducts.js';

export default function Products() {
  const products = useProducts();
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(() => searchParams.get('categoria') || 'Todas');
  const [sort, setSort] = useState('recommended');
  const categories = ['Todas', ...new Set(products.map((product) => product.category))];
  const filtered = useMemo(() => {
    let next = products.filter((product) => `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(query.toLowerCase()) && (category === 'Todas' || product.category === category));
    if (sort === 'price-asc') next = [...next].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') next = [...next].sort((a, b) => b.price - a.price);
    if (sort === 'name') next = [...next].sort((a, b) => a.name.localeCompare(b.name, 'es'));
    return next;
  }, [products, query, category, sort]);
  return <main className="container section-space"><div className="page-heading"><span className="eyebrow">NUESTRO CATÁLOGO</span><h1>Todos los sabores</h1><p>Descubre algo rico, desde los clásicos hasta nuestras combinaciones más atrevidas.</p></div>
    <div className="catalog-controls"><label className="search-control"><span>⌕</span><input aria-label="Buscar productos" className="form-control" placeholder="Buscar por sabor o ingrediente..." value={query} onChange={(event) => setQuery(event.target.value)} /></label><select className="form-select" aria-label="Filtrar por categoría" value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select><select className="form-select" aria-label="Ordenar productos" value={sort} onChange={(event) => setSort(event.target.value)}><option value="recommended">Recomendados</option><option value="price-asc">Menor precio</option><option value="price-desc">Mayor precio</option><option value="name">Nombre A-Z</option></select></div>
    <p className="result-count">{filtered.length} producto(s) encontrados</p>
    {filtered.length ? <div className="row g-4">{filtered.map((product) => <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={product.id}><ProductCard product={product} onAddToCart={addToCart} /></div>)}</div> : <div className="empty-state"><span>🍨</span><h2>No encontramos sabores</h2><p>Prueba otra palabra o selecciona otra categoría.</p><button className="btn btn-primary" onClick={() => { setQuery(''); setCategory('Todas'); }}>Limpiar filtros</button></div>}
  </main>;
}
