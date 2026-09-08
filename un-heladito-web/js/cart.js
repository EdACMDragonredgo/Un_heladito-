
const CART_KEY = "unheladito_cart";

function getCart() {
    try {
        const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
        return Array.isArray(cart) ? cart : [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCounters();
}

function addToCart(product, quantity = 1) {
    quantity = Number(quantity);
    if (!Number.isInteger(quantity) || quantity < 1) quantity = 1;

    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.qty += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            qty: quantity,
            image: product.image || ""
        });
    }

    saveCart(cart);
    return true;
}

function removeFromCart(id) {
    saveCart(getCart().filter(item => item.id !== id));
}

function updateCartQuantity(id, quantity) {
    quantity = Number(quantity);
    const cart = getCart();
    const item = cart.find(x => x.id === id);

    if (!item) return;

    if (!Number.isInteger(quantity) || quantity <= 0) {
        removeFromCart(id);
        return;
    }

    item.qty = quantity;
    saveCart(cart);
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartCounters();
}

function getCartCount() {
    return getCart().reduce((total, item) => total + Number(item.qty || 0), 0);
}

function getCartTotal() {
    return getCart().reduce((total, item) => {
        return total + Number(item.price || 0) * Number(item.qty || 0);
    }, 0);
}

function updateCartCounters() {
    const count = getCartCount();
    document.querySelectorAll("#cart-count, #cart-counter").forEach(el => {
        el.textContent = count;
    });
}

function formatCLP(value) {
    return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0
    }).format(Number(value) || 0);
}

document.addEventListener("DOMContentLoaded", updateCartCounters);
