document.addEventListener("DOMContentLoaded", ()=>{
    const session=requireRole("Cliente");
    if(!session) return;

    document.getElementById("welcome").textContent=`Hola, ${session.name}`;

    const logoutButton = document.getElementById("logout");
    if(logoutButton) logoutButton.addEventListener("click", logout);

    const products=getProducts();
    const grid=document.getElementById("buyer-products");

    if(!grid) return;

    grid.innerHTML=products.map(p=>`
        <article class="mini-card">
            <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}">
            <div class="mini-card-body">
                <h3>${escapeHtml(p.name)}</h3>
                <p>${formatCLP(p.price)} · ${escapeHtml(p.format)}</p>
                <p>Stock: ${p.stock}</p>
                <button
                    type="button"
                    class="btn-small btn-primary buy-btn"
                    data-id="${escapeHtml(p.id)}"
                    ${p.stock<=0 ? "disabled" : ""}>
                    Agregar al carrito
                </button>
            </div>
        </article>
    `).join("");

    grid.querySelectorAll(".buy-btn").forEach(button=>{
        button.addEventListener("click", ()=>{
            const product=products.find(item=>item.id===button.dataset.id);
            if(!product) return;

            const result=addToCart(product,1);

            if(result.ok){
                const originalText=button.textContent;
                button.textContent="✓ Agregado";
                button.disabled=true;
                setTimeout(()=>{
                    button.textContent=originalText;
                    button.disabled = product.stock <= 0;
                },900);
            }else{
                alert(result.message);
            }
        });
    });
});

function escapeHtml(text){
    return String(text).replace(/[&<>"']/g,m=>({
        "&":"&amp;",
        "<":"&lt;",
        ">":"&gt;",
        '"':"&quot;",
        "'":"&#039;"
    }[m]));
}
