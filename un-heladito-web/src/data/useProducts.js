import { useEffect, useState } from 'react';
import { getProducts } from './mockDatabase.js';

export function useProducts() {
  const [products, setProducts] = useState(getProducts);
  useEffect(() => {
    const refresh = () => setProducts(getProducts());
    window.addEventListener('unheladito:products-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('unheladito:products-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);
  return products;
}
