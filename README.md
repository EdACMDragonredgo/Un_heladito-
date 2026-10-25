# 🍦 Un Heladito — Página web de heladería artesanal

## 1. Descripción del proyecto

**Un Heladito** es una página web dedicada a una heladería artesanal, desarrollada con React y Vite. Su objetivo es ofrecer una experiencia de navegación sencilla y agradable, permitiendo a los usuarios explorar productos, consultar precios, agregar helados al carrito de compras y completar un proceso de compra de demostración.

El proyecto incorpora información sobre la empresa, un catálogo de productos, ofertas, categorías, un blog, una sección de contacto y un panel de administración.

La página utiliza una arquitectura de aplicación de página única (SPA), por lo que las distintas secciones se muestran mediante rutas internas de React Router, sin necesidad de crear un archivo HTML independiente para cada sección.

## 2. Objetivos del proyecto

- Desarrollar una página web para presentar y ofrecer productos de una heladería artesanal.
- Facilitar la navegación entre las diferentes secciones del sitio.
- Implementar un catálogo con búsqueda, filtros y detalles de productos.
- Incorporar un carrito de compras y un proceso de compra de demostración.
- Presentar información sobre la historia de la empresa y sus medios de contacto.
- Implementar una interfaz de administración para gestionar productos, categorías y pedidos simulados.
- Aplicar React, componentes reutilizables y estilos adaptables a diferentes tamaños de pantalla.

## 3. Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura base de la página web. |
| CSS3 | Estilos y presentación visual. |
| JavaScript | Lógica e interactividad del sitio. |
| React | Construcción de componentes y vistas. |
| Vite | Servidor de desarrollo y compilación del proyecto. |
| React Router | Navegación interna entre las secciones. |
| Bootstrap 5 | Componentes y diseño adaptable. |
| localStorage | Almacenamiento local de datos de demostración. |
| sessionStorage | Almacenamiento temporal de información de la sesión. |
| Oxlint | Análisis estático del código. |

## 4. Funcionalidades de la página web

### Página de inicio
Presenta la identidad de Un Heladito y permite acceder a los principales contenidos del sitio.

### Catálogo de productos
Permite consultar los productos disponibles, visualizar sus precios, imágenes, descripciones, categorías y stock. Incluye búsqueda, filtros y ordenación.

### Detalle de productos
Muestra información específica de cada producto y permite seleccionar cantidades para agregarlas al carrito, respetando la disponibilidad registrada.

### Categorías y ofertas
Permite explorar productos por categoría y consultar aquellos identificados como ofertas.

### Carrito de compras
Permite agregar productos, modificar cantidades, eliminar artículos y calcular el total de la compra.

### Proceso de compra
Incluye un formulario para ingresar y validar los datos de entrega. El sitio genera pedidos de demostración y presenta resultados de pago aprobados o rechazados de manera simulada.

### Registro, inicio de sesión y cuenta
Incluye vistas para registrar usuarios, iniciar sesión y consultar la sección personal de la cuenta.

### Sección Nosotros
Presenta la historia de Un Heladito, el origen del emprendimiento y los valores asociados a la elaboración de helados artesanales.

### Contacto
Incluye un formulario para ingresar datos personales, calificar la experiencia y escribir comentarios. Actualmente, el envío se simula dentro de la página y no envía correos a un servidor real.

### Blog
Incluye una sección con publicaciones y vistas para consultar su contenido.

### Panel de administración
Ofrece herramientas de demostración para crear, editar y eliminar productos, gestionar categorías, consultar usuarios y revisar pedidos registrados.

## 5. Navegación y rutas

Las secciones de la página se gestionan mediante React Router.

| Ruta | Descripción |
|---|---|
| `/` | Página de inicio. |
| `/productos` | Catálogo de productos. |
| `/productos/:id` | Detalle de un producto. |
| `/categorias` | Categorías de productos. |
| `/ofertas` | Productos en oferta. |
| `/carrito` | Carrito de compras. |
| `/checkout` | Formulario de compra. |
| `/resultado-pago` | Resultado del pago simulado. |
| `/login` | Inicio de sesión. |
| `/registro` | Registro de usuarios. |
| `/mi-cuenta` | Información de la cuenta. |
| `/nosotros` | Historia de la empresa. |
| `/contacto` | Formulario de contacto. |
| `/blog` | Publicaciones del blog. |
| `/blog/:id` | Detalle de una publicación. |
| `/admin` | Panel de administración. |

La navegación se realiza dentro del mismo sitio web mediante rutas de React, sin crear un HTML independiente para cada sección.

## 6. Estructura del proyecto

```text
un-heladito-react/
├── public/
│   ├── images/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   └── Alert.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── data/
│   │   ├── mockDatabase.js
│   │   ├── categories.js
│   │   ├── useProducts.js
│   │   └── useCategories.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Categories.jsx
│   │   ├── Offers.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Account.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogDetail.jsx
│   │   ├── PaymentResult.jsx
│   │   ├── NotFound.jsx
│   │   └── admin/
│   │       └── AdminDashboard.jsx
│   ├── services/
│   │   ├── storage.js
│   │   └── format.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── docs/
│   ├── ERS-v2.md
│   └── MIGRACION.md
├── index.html
├── package.json
├── vite.config.js
├── .env.example
└── README.md
```

## 7. Requisitos previos

Para ejecutar el proyecto se necesita:

- Node.js compatible con la versión de Vite utilizada.
- npm.
- Un editor de código, como Visual Studio Code.
- Un navegador web actualizado.

## 8. Instalación y ejecución

### Paso 1. Descargar el proyecto

Clonar el repositorio desde GitHub o descargarlo como archivo ZIP y extraerlo.

### Paso 2. Abrir una terminal

Ingresar a la carpeta raíz del proyecto, donde se encuentra `package.json`.

### Paso 3. Instalar las dependencias

```bash
npm install
```

### Paso 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Vite mostrará una dirección local, normalmente:

```text
http://localhost:5173
```

Abrir esa dirección en el navegador para visualizar la página web.

### Paso 5. Compilar para producción

```bash
npm run build
```

El resultado de la compilación se genera en la carpeta `dist/`.

Para previsualizar la compilación:

```bash
npm run preview
```

### Analizar el código

El proyecto también incluye el comando:

```bash
npm run lint
```

Este comando utiliza Oxlint para analizar el código estáticamente.

## 9. Almacenamiento de datos

La versión actual utiliza datos de demostración y almacenamiento del navegador para conservar información, dependiendo de la funcionalidad.

Esto permite probar ciertas interacciones sin configurar una base de datos remota. Sin embargo, los datos guardados localmente no constituyen un sistema compartido entre distintos usuarios o dispositivos.

## 10. Pruebas del proyecto

La implementación de las pruebas automáticas queda pendiente para una etapa posterior del desarrollo.

El proyecto se entrega sin la suite de tests para que pueda diseñarse e implementarse posteriormente, verificando las funcionalidades, componentes, validaciones y operaciones de datos.

La ausencia de pruebas automáticas no significa que la página esté completamente validada. La compilación y el comportamiento de las funcionalidades deben comprobarse antes de publicar la versión definitiva.

## 11. Limitaciones actuales

Esta versión corresponde a una página web de demostración académica.

- No dispone de un backend conectado a un servidor.
- No utiliza una base de datos remota.
- El registro y el inicio de sesión no constituyen un sistema de autenticación seguro.
- Los pedidos y resultados de pago son simulados.
- El formulario de contacto no envía mensajes a un servidor real.
- La administración utiliza datos de demostración almacenados localmente.

Por estas razones, el proyecto no debe considerarse un sistema comercial listo para procesar pagos reales o almacenar información sensible.

## 12. Publicación en la nube

Para preparar el sitio para su publicación:

1. Instalar las dependencias con `npm install`.
2. Ejecutar `npm run build`.
3. Publicar el contenido generado dentro de `dist/` en un servicio de alojamiento compatible con páginas web estáticas.
4. Configurar el alojamiento para que las rutas internas de React Router puedan resolverse mediante `index.html`.

Antes de una publicación productiva, sería necesario evaluar la incorporación de un backend, almacenamiento centralizado, autenticación segura y una pasarela de pago real.

## 13. Estado del proyecto

**Etapa actual:** desarrollo de la página web y sus funcionalidades de demostración.

**Pendiente:** implementación y ejecución de pruebas automáticas, verificación integral del funcionamiento y, si corresponde, publicación en la nube.

## 14. Autoría

Proyecto académico: **Un Heladito**.

Desarrollado utilizando React y Vite, con una estructura basada en componentes reutilizables y navegación interna para presentar los productos y servicios de una heladería artesanal.

