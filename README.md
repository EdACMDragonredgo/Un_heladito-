Un Heladito

Descripción

Un Heladito es una plataforma web de e-commerce para una heladería artesanal. Permite visualizar productos, consultar sus detalles, registrarse e iniciar sesión y administrar un carrito de compras.

Proyecto desarrollado para DSY1104 — Desarrollo Web, Duoc UC.

Funcionalidades

🏠 Página de inicio.

🍨 Catálogo de productos.

🔎 Detalle de productos.

🛒 Carrito de compras.

➕ Agregar productos al carrito.

➖ Aumentar o disminuir cantidades.

❌ Eliminar productos.

🧹 Vaciar el carrito.

💾 Persistencia mediante localStorage.

👤 Registro e inicio de sesión.

👥 Roles de Cliente y Administrador.

📩 Formulario de contacto.

📍 Selección de región y comuna.

🛠️ Gestión administrativa de productos y usuarios.

Estructura

un-heladito-web/
├── index.html
├── catalogo.html
├── producto.html
├── carrito.html
├── login.html
├── registro.html
├── contacto.html
├── nosotros.html
├── css/
│   ├── main.css
│   ├── catalogo.css
│   └── carrito.css
├── js/
│   ├── carrito.js
│   ├── validaciones.js
│   └── regiones.js
└── assets/
    └── imágenes y recursos

Carrito

El carrito está desarrollado con JavaScript y utiliza localStorage para conservar los productos aunque se recargue la página.

En el catálogo:

Agregar al carrito añade el producto directamente.

Al presionar la imagen, se accede al detalle del producto.

El contador del carrito se actualiza automáticamente.

En el carrito se pueden modificar cantidades, eliminar productos y vaciar el carrito.

Roles

Cliente

Puede registrarse, iniciar sesión, consultar el catálogo y administrar sus productos del carrito.

Administrador

Puede acceder a las funciones administrativas para gestionar productos y usuarios según los permisos definidos.

Tecnologías

HTML5

CSS3

JavaScript Vanilla

LocalStorage

Google Fonts: Montserrat y Playfair Display

Diseño

La interfaz utiliza una identidad visual con colores rosa, turquesa, café y fondos claros. Las tarjetas tienen bordes redondeados, sombras y diseño responsive.

Cómo ejecutar

Descargar el proyecto.

Abrir la carpeta en Visual Studio Code.

Abrir index.html en el navegador.

Para desarrollo se recomienda utilizar Live Server.

Almacenamiento

El proyecto utiliza localStorage para guardar información en el navegador, principalmente los datos necesarios para mantener el carrito y la sesión de usuario.

Alcance

Es una simulación de una plataforma e-commerce. Incluye navegación, autenticación, catálogo y carrito, pero no procesa pagos reales mediante Transbank, Stripe u otras pasarelas.

Proyecto académico
Estudiantes: Eduardo Acevedo, Gabriel Abreou Y Edward Cardoza
Proyecto: Un Heladito — Plataforma Web E-Commerce y Sistema de Gestión
Profesor: Victor Hugo
Asignatura: DSY1104 — Desarrollo Web
Institución: Duoc UC
Año: 2026
