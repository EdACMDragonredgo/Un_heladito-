export function formatCLP(value) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency', currency: 'CLP', maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

export function calculateCartCount(items) {
  return items.reduce((total, item) => total + Math.max(0, Number(item.qty) || 0), 0);
}

export function calculateCartTotal(items) {
  return items.reduce((total, item) => total + (Number(item.price) || 0) * (Number(item.qty) || 0), 0);
}

export function validateCheckoutForm(form) {
  const errors = {};
  if (!String(form.name || '').trim() || String(form.name).trim().length < 2) errors.name = 'Ingresa tu nombre completo.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(form.email || '').trim())) errors.email = 'Ingresa un correo válido.';
  if (!String(form.street || '').trim()) errors.street = 'Ingresa la calle y el número.';
  if (!String(form.region || '').trim()) errors.region = 'Selecciona una región.';
  if (!String(form.commune || '').trim()) errors.commune = 'Selecciona o escribe una comuna.';
  if (!String(form.delivery || '').trim()) errors.delivery = 'Selecciona una opción de entrega.';
  return errors;
}
