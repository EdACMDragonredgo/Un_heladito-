import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { calculateCartCount, calculateCartTotal } from '../services/format.js';
import { getProductById } from '../data/mockDatabase.js';

const CartContext = createContext(null);
const CART_KEY = 'unheladito_cart';

function readCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    return Array.isArray(stored) ? stored.filter((item) => item && item.id).map((item) => ({ ...item, qty: Math.max(1, Number(item.qty) || 1), price: Number(item.price) || 0 })) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    if (Number(product.stock) <= 0) {
      setNotice('Este producto no tiene stock disponible.');
      return false;
    }
    const qtyToAdd = Math.max(1, Math.floor(Number(quantity) || 1));
    const existing = items.find((item) => item.id === product.id);
    const nextQty = (existing?.qty || 0) + qtyToAdd;
    if (nextQty > Number(product.stock)) {
      setNotice(`Stock máximo disponible de ${product.name}: ${product.stock}.`);
      return false;
    }
    setItems((current) => {
      const item = current.find((entry) => entry.id === product.id);
      if (item) return current.map((entry) => entry.id === product.id ? { ...entry, qty: entry.qty + qtyToAdd } : entry);
      return [...current, { id: product.id, name: product.name, price: Number(product.price), image: product.image, qty: qtyToAdd }];
    });
    setNotice(`${product.name} se agregó al carrito.`);
    return true;
  };

  const setQuantity = (id, quantity) => {
    const qty = Math.floor(Number(quantity));
    if (qty <= 0) {
      setItems((current) => current.filter((item) => item.id !== id));
    } else {
      const currentProduct = getProductById(id);
      const productStock = Number(currentProduct?.stock);
      if (currentProduct && productStock <= 0) {
        setItems((current) => current.filter((item) => item.id !== id));
        setNotice('El producto ya no tiene stock y fue retirado del carrito.');
        return;
      }
      setItems((current) => current.map((item) => {
        if (item.id !== id) return item;
        const safeQty = Number.isFinite(productStock) && productStock > 0 ? Math.min(qty, productStock) : qty;
        return { ...item, qty: safeQty };
      }));
    }
  };

  const removeFromCart = (id) => setItems((current) => current.filter((item) => item.id !== id));
  const clearCart = () => setItems([]);
  const dismissNotice = () => setNotice('');

  const value = useMemo(() => ({
    items,
    count: calculateCartCount(items),
    total: calculateCartTotal(items),
    notice,
    addToCart,
    setQuantity,
    removeFromCart,
    clearCart,
    dismissNotice,
  }), [items, notice]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de CartProvider.');
  return context;
}
