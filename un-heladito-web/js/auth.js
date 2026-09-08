
const AUTH_USERS_KEY = "unheladito_users";
const SESSION_KEY = "unheladito_session";
const PRODUCTS_KEY = "unheladito_products";

const defaultProducts = [
    {id:"HT001",name:"Helado de Chocolate Belga 70%",category:"Helados Tradicionales Cremosos",price:4500,format:"500g",stock:150,allergens:"Leche",image:"https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80"},
    {id:"HT002",name:"Helado de Vainilla de Madagascar",category:"Helados Tradicionales Cremosos",price:4200,format:"500g",stock:200,allergens:"Leche",image:"https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80"},
    {id:"HT003",name:"Helado de Manjar Artesanal Granizado",category:"Helados Tradicionales Cremosos",price:4500,format:"500g",stock:180,allergens:"Leche",image:"https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80"},
    {id:"SV001",name:"Sorbete de Frutilla & Albahaca",category:"Sorbetes y Helados Veganos",price:3900,format:"500g",stock:120,allergens:"Sin lácteos",image:"https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80"},
    {id:"SV002",name:"Sorbete de Mango Maracuyá",category:"Sorbetes y Helados Veganos",price:4100,format:"500g",stock:140,allergens:"Sin lácteos",image:"https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80"},
    {id:"SV003",name:"Sorbete de Limón Menta Jengibre",category:"Sorbetes y Helados Veganos",price:3800,format:"500g",stock:100,allergens:"Sin lácteos",image:"https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80"},
    {id:"PA001",name:"Paleta Rellena de Maracuyá con Leche Condensada",category:"Paletas Artesanales Rellenas",price:2200,format:"Unidad",stock:250,allergens:"Leche",image:"https://images.unsplash.com/photo-1488900128323-21503983257e?auto=format&fit=crop&w=600&q=80"},
    {id:"PA002",name:"Paleta de Frutos del Bosque Orgánicos",category:"Paletas Artesanales Rellenas",price:2000,format:"Unidad",stock:210,allergens:"Sin lácteos",image:"https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80"},
    {id:"PC001",name:"Copa Sundae Caramelo Salado",category:"Postres Fríos y Copas",price:5200,format:"400g",stock:90,allergens:"Leche, nuez",image:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80"}
];

function getUsers(){
    return JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || "[]");
}
function saveUsers(users){
    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}
function getProducts(){
    const saved = localStorage.getItem(PRODUCTS_KEY);
    if(saved) return JSON.parse(saved);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
    return [...defaultProducts];
}
function saveProducts(products){
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}
function getSession(){
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
}
function setSession(user){
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({
        id:user.id,name:user.name,email:user.email,role:user.role
    }));
}
function logout(){
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = "login.html";
}
function ensureUserRedirect(){
    const session = getSession();
    if(!session) return;
    if(session.role === "Administrador") window.location.href="admin.html";
    else window.location.href="comprador.html";
}
function requireRole(role){
    const session = getSession();
    if(!session){
        window.location.href = "login.html";
        return null;
    }
    if(session.role !== role){
        window.location.href = session.role === "Administrador" ? "admin.html" : "comprador.html";
        return null;
    }
    return session;
}
function sanitizeText(text){
    return String(text).replace(/[<>]/g,"").trim();
}
function isValidEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isDuoc(email){
    return /^[^\s@]+@duoc\.cl$/i.test(email);
}
function initStorage(){
    getProducts();
    const users=getUsers();
    if(users.length===0){
        
        saveUsers([{
            id: crypto.randomUUID(),
            name:"Administrador Demo",
            email:"admin@duoc.cl",
            password:"Admin123!",
            role:"Administrador"
        }]);
    }
}
