// Contador de productos añadidos al Carrito
let totalCarrito = 0;

// Desplegar / Ocultar la barra de búsqueda en el encabezado
function toggleSearch() {
    const searchBar = document.getElementById("search-bar");
    if (searchBar) {
        if (searchBar.style.display === "none" || searchBar.style.display === "") {
            searchBar.style.display = "flex";
            const input = document.getElementById("input-search");
            if (input) input.focus();
        } else {
            searchBar.style.display = "none";
        }
    }
}

// Ejecutar acción del buscador
function ejecutarBusqueda() {
    const input = document.getElementById("input-search");
    if (input) {
        const query = input.value.trim();
        if (query !== "") {
            alert(`Buscando sabores coincidentes con: "${query}"... Redirigiendo.`);
            window.location.href = `catalogo.html?search=${encodeURIComponent(query)}`;
        } else {
            alert("Escribe el nombre de un helado o ingrediente para buscar.");
        }
    }
}

// Incrementar contador de carrito y notificar al cliente
function agregarProducto(codigo, nombre) {
    totalCarrito++;
    const cartCounter = document.getElementById("cart-counter");
    if (cartCounter) {
        cartCounter.textContent = `(${totalCarrito})`;
    }
    alert(`¡"${nombre}" (${codigo}) se agregó correctamente a tu carrito de compras! 🍦`);
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Sistema Un Heladito listo y operando.");
});