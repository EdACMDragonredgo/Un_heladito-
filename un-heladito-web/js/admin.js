
document.addEventListener("DOMContentLoaded", ()=>{
    const session=requireRole("Administrador");
    if(!session) return;

    document.getElementById("welcome").textContent=`Hola, ${session.name}`;
    document.getElementById("logout").addEventListener("click", logout);

    const productForm=document.getElementById("product-form");
    const productAlert=document.getElementById("product-alert");
    const userAlert=document.getElementById("user-alert");

    function render(){
        const products=getProducts();
        const users=getUsers();

        document.getElementById("metric-products").textContent=products.length;
        document.getElementById("metric-users").textContent=users.length;
        document.getElementById("metric-stock").textContent=products.filter(p=>p.stock<=10).length;
        document.getElementById("metric-admins").textContent=users.filter(u=>u.role==="Administrador").length;

        const tbody=document.getElementById("products-body");
        tbody.innerHTML=products.map(p=>`
            <tr>
                <td>${p.id}</td>
                <td>${escapeHtml(p.name)}</td>
                <td>${formatCLP(p.price)}</td>
                <td>${p.format}</td>
                <td class="${p.stock<=10?'low-stock':''}">${p.stock}</td>
                <td><span class="badge">${escapeHtml(p.category)}</span></td>
                <td class="actions">
                    <button class="btn-small btn-light" data-edit="${p.id}">Editar</button>
                    <button class="btn-small btn-danger" data-delete="${p.id}">Eliminar</button>
                </td>
            </tr>
        `).join("");

        document.querySelectorAll("[data-edit]").forEach(btn=>{
            btn.addEventListener("click",()=>editProduct(btn.dataset.edit));
        });
        document.querySelectorAll("[data-delete]").forEach(btn=>{
            btn.addEventListener("click",()=>deleteProduct(btn.dataset.delete));
        });

        const userBody=document.getElementById("users-body");
        userBody.innerHTML=users.map(u=>`
            <tr>
                <td>${escapeHtml(u.name)}</td>
                <td>${escapeHtml(u.email)}</td>
                <td><span class="badge ${u.role.toLowerCase()}">${u.role}</span></td>
                <td class="actions">
                    <button class="btn-small btn-light" data-user-role="${u.id}">Cambiar rol</button>
                    <button class="btn-small btn-danger" data-user-delete="${u.id}">Eliminar</button>
                </td>
            </tr>
        `).join("");

        document.querySelectorAll("[data-user-role]").forEach(btn=>{
            btn.addEventListener("click",()=>changeRole(btn.dataset.userRole));
        });
        document.querySelectorAll("[data-user-delete]").forEach(btn=>{
            btn.addEventListener("click",()=>deleteUser(btn.dataset.userDelete));
        });

        document.getElementById("product-select").innerHTML=
            `<option value="">Selecciona un producto</option>`+
            products.map(p=>`<option value="${p.id}">${p.id} — ${escapeHtml(p.name)}</option>`).join("");
    }

    function editProduct(id){
        const p=getProducts().find(x=>x.id===id);
        if(!p) return;
        document.getElementById("product-id").value=p.id;
        document.getElementById("product-name").value=p.name;
        document.getElementById("product-category").value=p.category;
        document.getElementById("product-price").value=p.price;
        document.getElementById("product-format").value=p.format;
        document.getElementById("product-stock").value=p.stock;
        document.getElementById("product-allergens").value=p.allergens;
        window.scrollTo({top:document.getElementById("product-manager").offsetTop-90,behavior:"smooth"});
    }

    function deleteProduct(id){
        if(!confirm("¿Eliminar este producto?")) return;
        saveProducts(getProducts().filter(p=>p.id!==id));
        render();
    }

    function changeRole(id){
        const users=getUsers();
        const user=users.find(u=>u.id===id);
        if(!user) return;
        const next=prompt("Escribe: Cliente, Vendedor o Administrador", user.role);
        if(!next) return;
        const valid=["Cliente","Vendedor","Administrador"];
        if(!valid.includes(next)){
            userAlert.textContent="Rol no válido.";
            userAlert.className="alert error";
            return;
        }
        if(next==="Administrador" && !isDuoc(user.email)){
            userAlert.textContent="Un administrador debe tener correo @duoc.cl.";
            userAlert.className="alert error";
            return;
        }
        user.role=next;
        saveUsers(users);
        userAlert.textContent="Rol actualizado correctamente.";
        userAlert.className="alert success";
        render();
    }

    function deleteUser(id){
        const users=getUsers();
        const target=users.find(u=>u.id===id);
        if(!target) return;
        if(target.id===session.id){
            userAlert.textContent="No puedes eliminar tu propia cuenta desde esta vista.";
            userAlert.className="alert error";
            return;
        }
        if(!confirm(`¿Eliminar a ${target.name}?`)) return;
        saveUsers(users.filter(u=>u.id!==id));
        render();
    }

    productForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        const id=document.getElementById("product-id").value.trim() || `PR${Date.now()}`;
        const product={
            id,
            name:sanitizeText(document.getElementById("product-name").value),
            category:document.getElementById("product-category").value,
            price:Number(document.getElementById("product-price").value),
            format:sanitizeText(document.getElementById("product-format").value),
            stock:Number(document.getElementById("product-stock").value),
            allergens:sanitizeText(document.getElementById("product-allergens").value),
            image:"https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80"
        };

        if(!product.name || product.price<0 || product.stock<0){
            productAlert.textContent="Completa los datos del producto correctamente.";
            productAlert.className="alert error";
            return;
        }

        const products=getProducts();
        const index=products.findIndex(p=>p.id===id);
        if(index>=0) products[index]=product;
        else products.push(product);
        saveProducts(products);

        productAlert.textContent="Producto guardado correctamente.";
        productAlert.className="alert success";
        productForm.reset();
        document.getElementById("product-id").value="";
        render();
    });

    document.getElementById("cancel-edit").addEventListener("click",()=>{
        productForm.reset();
        document.getElementById("product-id").value="";
    });

    document.getElementById("logout").addEventListener("click", logout);
    render();
});

function formatCLP(value){
    return new Intl.NumberFormat("es-CL",{style:"currency",currency:"CLP",maximumFractionDigits:0}).format(value);
}
function escapeHtml(text){
    return String(text).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
