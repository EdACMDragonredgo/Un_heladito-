document.addEventListener("DOMContentLoaded",()=>{
    const products=getProducts();

    document.querySelectorAll(".catalog-add").forEach(button=>{
        button.addEventListener("click",()=>{
            const product=products.find(item=>item.id===button.dataset.id);
            if(!product){
                alert("No se encontró el producto.");
                return;
            }

            const result=addToCart(product,1);

            if(result.ok){
                const originalText=button.textContent;
                button.textContent="✓ Agregado";
                updateCartBadges();
                setTimeout(()=>button.textContent=originalText,900);
            }else{
                alert(result.message);
            }
        });
    });
});
