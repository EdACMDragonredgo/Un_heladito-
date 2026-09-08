
document.addEventListener("DOMContentLoaded", () => {
    const itemsContainer = document.getElementById("cart-items");
    const countElement = document.getElementById("summary-count");
    const totalElement = document.getElementById("cart-total");

    function renderCart() {
        const cart = getCart();

        if (cart.length === 0) {
            itemsContainer.innerHTML = `
                <div class="empty-cart">
                    <div class="empty-icon">🛒</div>
                    <h2>Tu carrito está vacío</h2>
                    <p>Agrega tus helados favoritos desde el catálogo.</p>
                    <a class="btn btn-primary" href="catalogo.html">Ver catálogo</a>
                </div>`;
        } else {
            itemsContainer.innerHTML = cart.map(item => `
                <article class="cart-item">
                    ${item.image ? `<img src="${item.image}" alt="${escapeHtml(item.name)}">` : ""}
                    <div class="item-info">
                        <h3>${escapeHtml(item.name)}</h3>
                        <p>${formatCLP(item.price)} por unidad</p>
                    </div>
                    <div class="item-controls">
                        <button class="qty-btn" data-action="decrease" data-id="${item.id}">−</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
                    </div>
                    <strong class="item-subtotal">${formatCLP(item.price * item.qty)}</strong>
                    <button class="remove-btn" data-id="${item.id}" aria-label="Eliminar producto">✕</button>
                </article>
            `).join("");
        }

        countElement.textContent = getCartCount();
        totalElement.textContent = formatCLP(getCartTotal());
        updateCartCounters();
    }

    itemsContainer.addEventListener("click", event => {
        const button = event.target.closest("button");
        if (!button) return;

        const id = button.dataset.id;
        const cart = getCart();
        const item = cart.find(x => x.id === id);
        if (!item) return;

        if (button.dataset.action === "increase") {
            // Si existe el catálogo del sistema, respetamos el stock actual.
            if (typeof getProducts === "function") {
                const product = getProducts().find(x => x.id === id);
                if (product && item.qty >= product.stock) {
                    alert(`Stock máximo disponible para "${product.name}": ${product.stock}.`);
                    return;
                }
            }
            updateCartQuantity(id, item.qty + 1);
        } else if (button.dataset.action === "decrease") {
            updateCartQuantity(id, item.qty - 1);
        } else {
            removeFromCart(id);
        }

        renderCart();
    });

    document.getElementById("clear-cart").addEventListener("click", () => {
        if (!getCart().length) return;
        if (confirm("¿Quieres vaciar todo el carrito?")) {
            clearCart();
            renderCart();
        }
    });

    document.getElementById("checkout").addEventListener("click", () => {
        if (!getCart().length) {
            alert("Tu carrito está vacío.");
            return;
        }
        alert("La compra está lista para continuar. El pago queda como siguiente etapa del proyecto.");
    });

    renderCart();
});

function escapeHtml(text){
    return String(text).replace(/[&<>"']/g,m=>({
        "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[m]));
}
