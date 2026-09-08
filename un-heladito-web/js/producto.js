const productos = {
    "HT001": {
        nombre: "Chocolate Belga 70%",
        precio: "$4.500 CLP",
        descripcion: "Cacao belga de alta pureza con hojuelas de chocolate semiamargo. Una preparación cremosa y artesanal, pensada para los amantes del chocolate intenso.",
        imagen: "https://images.pexels.com/photos/8713078/pexels-photo-8713078.jpeg"
    },
    "SV001": {
        nombre: "Frutilla & Albahaca",
        precio: "$3.900 CLP",
        descripcion: "Frutillas seleccionadas en su punto de maduración perfecto, combinadas con notas frescas de albahaca silvestre. Un equilibrio herbal y dulce único.",
        imagen: "https://images.pexels.com/photos/22484693/pexels-photo-22484693.jpeg"
    },
    "PA001": {
        nombre: "Maracuyá & Leche Condensada",
        precio: "$2.200 CLP",
        descripcion: "Refrescante paleta artesanal elaborada con pulpa natural de maracuyá y un cremoso corazón relleno de leche condensada.",
        imagen: "https://images.pexels.com/photos/22484702/pexels-photo-22484702.jpeg"
    },
    "PC001": {
        nombre: "Sundae Caramelo Salado",
        precio: "$5.200 CLP",
        descripcion: "Base de helado de crema americana, bañado en suave salsa de caramelo a la sal marina y trozos crocantes de nuez pecana tostada.",
        imagen: "https://images.pexels.com/photos/9500931/pexels-photo-9500931.jpeg"
    },
    "HT002": {
        nombre: "Mango Tropical",
        precio: "$4.100 CLP",
        descripcion: "Helado artesanal extrafresco elaborado con pulpa natural de mango de fruta de estación. Ideal para días calurosos.",
        imagen: "https://images.pexels.com/photos/5060372/pexels-photo-5060372.jpeg"
    },
    "HT003": {
        nombre: "Chocolate & Avellana",
        precio: "$4.700 CLP",
        descripcion: "Combinación cremosa de chocolate con leche fluido y finos trozos de avellanas europeas tostadas.",
        imagen: "https://images.pexels.com/photos/5061032/pexels-photo-5061032.jpeg"
    },
    "SV002": {
        nombre: "Sorbete de Limón",
        precio: "$3.600 CLP",
        descripcion: "Sorbete 100% natural libre de lácteos, preparado con zumo de limón recién exprimido. Una opción liviana y digestiva.",
        imagen: "https://images.pexels.com/photos/32848535/pexels-photo-32848535.jpeg"
    },
    "HT004": {
        nombre: "Vainilla Artesanal",
        precio: "$4.000 CLP",
        descripcion: "Elaborado con infusión directa de vainas de vainilla de Madagascar y crema fresca. Un clásico inolvidable.",
        imagen: "https://images.pexels.com/photos/16630830/pexels-photo-16630830.jpeg"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || "HT001";
    const p = productos[id] || productos["HT001"];

    document.getElementById("page-title").textContent = `${p.nombre} — Un Heladito`;
    document.getElementById("p-title").textContent = p.nombre;
    document.getElementById("p-code").textContent = `Código: ${id}`;
    document.getElementById("p-price").textContent = p.precio;
    document.getElementById("p-desc").textContent = p.descripcion;
    document.getElementById("breadcrumb").textContent = `Inicio › Catálogo › ${p.nombre}`;

    const mainImg = document.getElementById("p-img-main");
    mainImg.src = p.imagen;
    mainImg.alt = p.nombre;


const relatedGrid = document.getElementById("related-grid");
relatedGrid.innerHTML = "";

Object.keys(productos)
    .filter(key => key !== id) 
    .forEach(key => {
        const rel = productos[key];
        const card = document.createElement("a");
        card.href = `producto.html?id=${key}`;
        card.className = "related-card"; // Clase opcional para estilos CSS
        card.innerHTML = `
            <img src="${rel.imagen}" alt="${rel.nombre}" title="${rel.nombre}">
            <p>${rel.nombre}</p>
        `;
        relatedGrid.appendChild(card);
    });
});
