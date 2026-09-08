
document.addEventListener("DOMContentLoaded", ()=>{
    initStorage();

    const form=document.getElementById("register-form");
    const alert=document.getElementById("register-alert");
    const roleSelect=document.getElementById("role");
    const roleHelp=document.getElementById("role-help");

    roleSelect.addEventListener("change", ()=>{
        roleHelp.textContent = roleSelect.value === "Administrador"
            ? "Para administrador se exige correo @duoc.cl."
            : "Las cuentas de cliente pueden usar cualquier correo válido.";
    });

    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        alert.className="alert hidden";

        const name=sanitizeText(document.getElementById("name").value);
        const email=document.getElementById("email").value.trim().toLowerCase();
        const password=document.getElementById("password").value;
        const confirm=document.getElementById("confirm").value;
        const role=roleSelect.value;

        if(name.length<3){
            alert.textContent="El nombre debe tener al menos 3 caracteres.";
            alert.className="alert error"; return;
        }
        if(!isValidEmail(email)){
            alert.textContent="El correo electrónico no es válido.";
            alert.className="alert error"; return;
        }
        if(role==="Administrador" && !isDuoc(email)){
            alert.textContent="Las cuentas de administrador deben usar un correo @duoc.cl.";
            alert.className="alert error"; return;
        }
        if(password.length<8){
            alert.textContent="La contraseña debe tener al menos 8 caracteres.";
            alert.className="alert error"; return;
        }
        if(password!==confirm){
            alert.textContent="Las contraseñas no coinciden.";
            alert.className="alert error"; return;
        }

        const users=getUsers();
        if(users.some(u=>u.email.toLowerCase()===email)){
            alert.textContent="Ese correo ya está registrado.";
            alert.className="alert error"; return;
        }

        const user={
            id:crypto.randomUUID(),
            name,email,password,role
        };
        users.push(user);
        saveUsers(users);
        setSession(user);

        alert.textContent="Cuenta creada correctamente. Entrando...";
        alert.className="alert success";

        setTimeout(()=>{
            window.location.href=role==="Administrador" ? "admin.html" : "comprador.html";
        },450);
    });
});
