import { getProducts, saveProducts } from './mockDatabase.js';

const KEY = 'unheladito_categories';
export const initialCategories = ['Helados tradicionales', 'Sorbetes y veganos', 'Paletas artesanales', 'Postres fríos'];

export function getCategories() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (Array.isArray(saved)) return saved;
  } catch { /* Restablecer categorías iniciales si los datos locales están dañados. */ }
  localStorage.setItem(KEY, JSON.stringify(initialCategories));
  return [...initialCategories];
}

export function saveCategories(categories) {
  localStorage.setItem(KEY, JSON.stringify(categories));
  window.dispatchEvent(new CustomEvent('unheladito:categories-updated'));
  return categories;
}

export function createCategory(name) {
  const cleanName = String(name || '').trim();
  if (!cleanName) throw new Error('El nombre de la categoría es obligatorio.');
  const categories = getCategories();
  if (categories.some((category) => category.toLowerCase() === cleanName.toLowerCase())) throw new Error('Esa categoría ya existe.');
  saveCategories([...categories, cleanName]);
  return cleanName;
}

export function updateCategory(previousName, nextName) {
  const oldName = String(previousName || '').trim();
  const cleanName = String(nextName || '').trim();
  const categories = getCategories();
  if (!categories.includes(oldName)) return false;
  if (!cleanName) throw new Error('El nombre de la categoría es obligatorio.');
  if (categories.some((category) => category !== oldName && category.toLowerCase() === cleanName.toLowerCase())) throw new Error('Esa categoría ya existe.');
  saveCategories(categories.map((category) => category === oldName ? cleanName : category));
  saveProducts(getProducts().map((product) => product.category === oldName ? { ...product, category: cleanName } : product));
  return true;
}

export function deleteCategory(name) {
  if (getProducts().some((product) => product.category === name)) return false;
  const categories = getCategories();
  const remaining = categories.filter((category) => category !== name);
  if (remaining.length === categories.length) return false;
  saveCategories(remaining);
  return true;
}
