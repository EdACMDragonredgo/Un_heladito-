document.addEventListener("DOMContentLoaded",()=>{
    const product=getProducts().find(item=>item.id==="HT001");
    const button=document.getElementById("add-product");
    const quantitySelect=document.getElementById("product-quantity");
    const alertBox=document.getElementById("product-alert");

    if(!product || !button || !quantitySelect) return;

    // Ajusta las opciones de cantidad al stock real.
    quantitySelect.innerHTML="";
    const max=Math.min(5, Number(product.stock) || 0);
    for(let i=1;i<=max;i++){
        quantitySelect.insertAdjacentHTML("beforeend",`<option value="${i}">${i}</option>`);
    }

    button.disabled = max===0;

    button.addEventListener("click",()=>{
        const qty=Number(quantitySelect.value) || 1;
        const result=addToCart(product,qty);

        alertBox.classList.remove("hidden");

        if(result.ok){
            alertBox.textContent=`✓ ${qty} unidad${qty===1?"":"es"} agregada${qty===1?"":"s"} al carrito.`;
            alertBox.className="alert success";
            updateCartBadges();
        }else{
            alertBox.textContent=result.message;
            alertBox.className="alert error";
        }
    });
});
