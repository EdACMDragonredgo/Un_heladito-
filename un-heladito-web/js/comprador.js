
document.addEventListener("DOMContentLoaded", ()=>{
    const session=requireRole("Cliente");
    if(!session) return;

    document.getElementById("welcome").textContent=`Hola, ${session.name}`;
    document.getElementById("logout").addEventListener("click", logout);

    const products=getProducts();
    const grid=document.getElementById("buyer-products");
    grid.innerHTML=products.map(p=>`
        <article class="mini-card">
            <img src="${p.image}" alt="${escapeHtml(p.name)}">
            <div class="mini-card-body">
                <h3>${escapeHtml(p.name)}</h3>
                <p>${formatCLP(p.price)} · ${p.format}</p>
                <p>Stock: ${p.stock}</p>
                <button class="btn-small btn-primary buy-btn" data-id="${p.id}" ${p.stock<=0?"disabled":""}>
                    Agregar al carrito
                </button>
            </div>
        </article>
    `).join("");

    grid.querySelectorAll(".buy-btn").forEach(btn=>{
        btn.addEventListener("click",()=>{
            const p=products.find(x=>x.id===btn.dataset.id);
            if(!p || p.stock <= 0) return;

            const cart=getCart();
            const existing=cart.find(x=>x.id===p.id);
            const currentQty=existing ? existing.qty : 0;

            if(currentQty >= p.stock){
                alert(`No puedes agregar más unidades de "${p.name}". Stock disponible: ${p.stock}.`);
                return;
            }

            addToCart({
                id:p.id,
                name:p.name,
                price:p.price,
                image:p.image
            });

            btn.textContent="✓ Agregado";
            setTimeout(()=>btn.textContent="Agregar al carrito",900);
        });
    });

    updateCartCounters();
});

function formatCLP(value){
    return new Intl.NumberFormat("es-CL",{style:"currency",currency:"CLP",maximumFractionDigits:0}).format(value);
}
function escapeHtml(text){
    return String(text).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
