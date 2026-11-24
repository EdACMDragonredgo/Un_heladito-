import { Link } from 'react-router-dom';
export default function NotFound() { return <main className="container section-space empty-state"><span>🍨</span><h1>Ups, este sabor no existe</h1><p>No encontramos la página que buscas.</p><Link className="btn btn-primary" to="/">Volver al inicio</Link></main>; }
