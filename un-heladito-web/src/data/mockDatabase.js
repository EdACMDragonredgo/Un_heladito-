const PRODUCTS_KEY = 'unheladito_products';

export const initialProducts = [
  {
    id: 'HT001', name: 'Chocolate Belga 70%', category: 'Helados tradicionales',
    price: 4500, format: '500 g', stock: 150, allergens: 'Leche', offer: true,
    description: 'Cacao belga intenso, textura cremosa y pequeñas hojuelas de chocolate semiamargo.',
    image: 'https://images.pexels.com/photos/8713078/pexels-photo-8713078.jpeg',
  },
  {
    id: 'SV001', name: 'Frutilla & Albahaca', category: 'Sorbetes y veganos',
    price: 3900, format: '500 g', stock: 120, allergens: 'Puede contener trazas', offer: false,
    description: 'Frutillas frescas combinadas con una nota aromática de albahaca.',
    image: 'https://images.pexels.com/photos/22484693/pexels-photo-22484693.jpeg',
  },
  {
    id: 'PA001', name: 'Maracuyá & Leche Condensada', category: 'Paletas artesanales',
    price: 2200, format: 'Unidad', stock: 250, allergens: 'Leche', offer: true,
    description: 'Paleta de maracuyá natural con un centro suave de leche condensada.',
    image: 'https://images.pexels.com/photos/22484702/pexels-photo-22484702.jpeg',
  },
  {
    id: 'PC001', name: 'Sundae Caramelo Salado', category: 'Postres fríos',
    price: 5200, format: '400 g', stock: 90, allergens: 'Leche, nuez', offer: false,
    description: 'Crema americana con salsa de caramelo salado y un toque crocante.',
    image: 'https://images.pexels.com/photos/9500931/pexels-photo-9500931.jpeg',
  },
  {
    id: 'HT002', name: 'Mango Tropical', category: 'Helados tradicionales',
    price: 4100, format: '500 g', stock: 140, allergens: 'Leche', offer: true,
    description: 'Un sabor frutal y refrescante elaborado con mango.',
    image: 'https://images.pexels.com/photos/5060372/pexels-photo-5060372.jpeg',
  },
  {
    id: 'HT003', name: 'Chocolate & Avellana', category: 'Helados tradicionales',
    price: 4700, format: '500 g', stock: 80, allergens: 'Leche, avellana', offer: false,
    description: 'Chocolate cremoso acompañado de avellanas tostadas.',
    image: 'https://images.pexels.com/photos/5061032/pexels-photo-5061032.jpeg',
  },
  {
    id: 'SV002', name: 'Sorbete de Limón', category: 'Sorbetes y veganos',
    price: 3600, format: '500 g', stock: 100, allergens: 'Sin lácteos declarados', offer: false,
    description: 'Sorbete cítrico y refrescante, ideal para los días calurosos.',
    image: 'https://images.pexels.com/photos/32848535/pexels-photo-32848535.jpeg',
  },
  {
    id: 'HT004', name: 'Vainilla Artesanal', category: 'Helados tradicionales',
    price: 4000, format: '500 g', stock: 200, allergens: 'Leche', offer: false,
    description: 'Un clásico suave elaborado con inspiración en la vainilla de Madagascar.',
    image: 'https://images.pexels.com/photos/16630830/pexels-photo-16630830.jpeg',
  },
  {
    id: 'PA002', name: 'Frutos del Bosque', category: 'Paletas artesanales',
    price: 2000, format: 'Unidad', stock: 12, allergens: '0% Azucar', offer: true,
    description: 'Paleta frutal con una mezcla de berries y sabor fresco.',
    image: 'https://images.pexels.com/photos/39831399/pexels-photo-39831399.jpeg',
  },
];

function storageAvailable() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

export function getProducts() {
  if (!storageAvailable()) return initialProducts.map((product) => ({ ...product }));
  try {
    const saved = localStorage.getItem(PRODUCTS_KEY);
    if (!saved) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
      return initialProducts.map((product) => ({ ...product }));
    }
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : initialProducts.map((product) => ({ ...product }));
  } catch {
    return initialProducts.map((product) => ({ ...product }));
  }
}

export function saveProducts(products) {
  if (storageAvailable()) localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('unheladito:products-updated'));
  return products;
}

export function getProductById(id) {
  return getProducts().find((product) => product.id === String(id)) ?? null;
}

export function createProduct(product) {
  const products = getProducts();
  const id = String(product.id || `UH${Date.now().toString().slice(-6)}`);
  if (products.some((existing) => existing.id === id)) throw new Error('Ya existe un producto con ese código.');
  const created = { ...product, id, price: Number(product.price), stock: Number(product.stock) };
  saveProducts([...products, created]);
  return created;
}

export function updateProduct(id, changes) {
  const products = getProducts();
  const index = products.findIndex((product) => product.id === String(id));
  if (index < 0) return null;
  products[index] = { ...products[index], ...changes, id: String(id), price: Number(changes.price ?? products[index].price), stock: Number(changes.stock ?? products[index].stock) };
  saveProducts(products);
  return products[index];
}

export function deleteProduct(id) {
  const products = getProducts();
  const remaining = products.filter((product) => product.id !== String(id));
  if (remaining.length === products.length) return false;
  saveProducts(remaining);
  return true;
}

export function resetProducts() {
  saveProducts(initialProducts.map((product) => ({ ...product })));
}
