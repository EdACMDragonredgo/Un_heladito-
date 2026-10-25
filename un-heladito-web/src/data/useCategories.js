import { useEffect, useState } from 'react';
import { getCategories } from './categories.js';

export function useCategories() {
  const [categories, setCategories] = useState(getCategories);
  useEffect(() => {
    const refresh = () => setCategories(getCategories());
    window.addEventListener('unheladito:categories-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('unheladito:categories-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);
  return categories;
}
