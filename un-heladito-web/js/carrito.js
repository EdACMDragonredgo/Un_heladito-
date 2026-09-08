const CART_KEY = "unheladito_cart";

function getCart(){
    try{
        const saved = localStorage.getItem(CART_KEY);
        const cart = saved ? JSON.parse(saved) : [];
        return Array.isArray(cart) ? cart : [];
    }catch(error){
        console.error("No se pudo leer el carrito:", error);
        return [];
    }
}

function saveCart(cart){
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadges(cart);
}

function getCartCount(cart=getCart()){
    return cart.reduce((sum,item)=>sum + Number(item.qty || 0), 0);
}

function addToCart(product, quantity=1){
    if(!product || !product.id) return {ok:false, message:"Producto no válido."};

    const qty = Math.max(1, Number(quantity) || 1);
    const stock = Math.max(0, Number(product.stock) || 0);
    const cart = getCart();
    const existing = cart.find(item=>item.id === product.id);
    const currentQty = existing ? Number(existing.qty || 0) : 0;

    if(stock <= 0){
        return {ok:false, message:`${product.name} no tiene stock disponible.`};
    }

    if(currentQty + qty > stock){
        return {
            ok:false,
            message:`Solo hay ${stock} unidad${stock===1?"":"es"} disponibles de ${product.name}.`
        };
    }

    if(existing){
        existing.qty = currentQty + qty;
        // Mantiene los datos actualizados por si el administrador editó el producto.
        existing.name = product.name;
        existing.price = Number(product.price) || 0;
    }else{
        cart.push({
            id:product.id,
            name:product.name,
            price:Number(product.price) || 0,
            qty
        });
    }

    saveCart(cart);
    return {ok:true, cart};
}

function removeFromCart(productId){
    const cart = getCart().filter(item=>item.id !== productId);
    saveCart(cart);
    return cart;
}

function setCartQuantity(productId, quantity, stock){
    const cart = getCart();
    const item = cart.find(x=>x.id===productId);
    if(!item) return cart;

    const nextQty = Math.max(0, Number(quantity) || 0);
    const maxStock = Math.max(0, Number(stock) || 0);

    if(nextQty === 0){
        return removeFromCart(productId);
    }

    item.qty = Math.min(nextQty, maxStock);
    saveCart(cart);
    return cart;
}

function clearCart(){
    localStorage.removeItem(CART_KEY);
    updateCartBadges([]);
}

function updateCartBadges(cart=getCart()){
    const count = getCartCount(cart);
    document.querySelectorAll("#cart-count, [data-cart-count]").forEach(element=>{
        element.textContent = count;
    });
}

function formatCLP(value){
    return new Intl.NumberFormat("es-CL",{
        style:"currency",
        currency:"CLP",
        maximumFractionDigits:0
    }).format(Number(value) || 0);
}

document.addEventListener("DOMContentLoaded", ()=>{
    updateCartBadges();
});
