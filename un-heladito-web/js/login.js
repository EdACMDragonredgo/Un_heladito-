
document.addEventListener("DOMContentLoaded", ()=>{
    initStorage();
    ensureUserRedirect();

    const form=document.getElementById("login-form");
    const alert=document.getElementById("login-alert");

    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        alert.className="alert hidden";

        const email=document.getElementById("email").value.trim().toLowerCase();
        const password=document.getElementById("password").value;

        if(!isValidEmail(email)){
            alert.textContent="Ingresa un correo electrónico válido.";
            alert.className="alert error";
            return;
        }

        const user=getUsers().find(u=>u.email.toLowerCase()===email && u.password===password);
        if(!user){
            alert.textContent="Correo o contraseña incorrectos.";
            alert.className="alert error";
            return;
        }

        setSession(user);
        alert.textContent="Inicio de sesión correcto.";
        alert.className="alert success";

        setTimeout(()=>{
            if(user.role==="Administrador") window.location.href="admin.html";
            else window.location.href="comprador.html";
        },350);
    });
});
