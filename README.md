# 🍦 Un Heladito — Sitio web de heladería artesanal

## 1. Descripción del proyecto

**Un Heladito** es un sitio web desarrollado para una heladería artesanal, cuyo propósito es ofrecer una experiencia digital agradable, intuitiva y accesible para explorar productos, conocer la empresa y realizar compras en línea.

El sitio permite consultar un catálogo de helados, revisar sus características y precios, buscar productos, aplicar filtros, agregar artículos al carrito y completar un proceso de compra. También incorpora secciones informativas, como Nosotros, Contacto y Blog, además de un panel de administración para gestionar la información comercial.

El proyecto está desarrollado con React y Vite, utilizando una arquitectura SPA (*Single Page Application*). De esta manera, las diferentes secciones se muestran mediante rutas internas sin necesidad de crear un documento HTML independiente para cada página.

## 2. Objetivos del proyecto

### Objetivo general

Desarrollar un sitio web funcional para una heladería artesanal que facilite la presentación de productos, la navegación por el catálogo y la experiencia de compra, proporcionando una interfaz visual coherente y adaptable a distintos dispositivos.

### Objetivos específicos

- Diseñar una interfaz atractiva y fácil de utilizar.
- Implementar un catálogo organizado por categorías.
- Incorporar búsqueda, filtros, información de productos y ofertas.
- Desarrollar un carrito de compras con cálculo automático de cantidades y totales.
- Implementar un flujo de compra con validación de formularios.
- Presentar la historia, los valores y los medios de contacto de la empresa.
- Incorporar herramientas para administrar productos, categorías y pedidos.
- Aplicar componentes reutilizables y navegación mediante React Router.
- Verificar el comportamiento del sitio mediante pruebas funcionales y técnicas.
- Preparar la compilación del proyecto para su publicación en la nube.

## 3. Tecnologías utilizadas

| Tecnología | Función |
|---|---|
| HTML5 | Estructura base del sitio web. |
| CSS3 | Diseño visual, estilos y adaptación de la interfaz. |
| JavaScript | Lógica e interactividad. |
| React | Desarrollo de componentes y vistas reutilizables. |
| Vite | Servidor de desarrollo y compilación para producción. |
| React Router | Gestión de rutas y navegación interna. |
| Bootstrap 5 | Componentes y herramientas de diseño adaptable. |
| localStorage | Persistencia local de información de demostración. |
| sessionStorage | Almacenamiento temporal durante la sesión. |
| Oxlint | Análisis estático del código fuente. |

## 4. Funcionalidades principales

### 4.1. Página de inicio

Presenta la identidad visual de Un Heladito, información destacada y accesos a las principales secciones del sitio.

### 4.2. Catálogo de productos

Permite visualizar los productos disponibles con sus nombres, imágenes, descripciones, precios, categorías y disponibilidad. Incorpora herramientas de búsqueda, filtrado y ordenación para facilitar la exploración.

### 4.3. Detalle de productos

Cada producto cuenta con una vista específica que permite consultar sus características y seleccionar la cantidad que se desea agregar al carrito, considerando el stock registrado.

### 4.4. Categorías y ofertas

Organiza los helados por categorías y facilita la identificación de productos marcados como ofertas.

### 4.5. Carrito de compras

Permite administrar los artículos seleccionados, modificar cantidades, eliminar productos y consultar el subtotal y el total de la compra.

### 4.6. Proceso de compra

Incluye un formulario para ingresar los datos del cliente y la información necesaria para la entrega. Los campos se validan antes de continuar y se presenta el resultado correspondiente al proceso de compra de demostración.

### 4.7. Registro e inicio de sesión

Incluye vistas para el registro de usuarios, el inicio de sesión y la consulta de la sección personal de la cuenta.

### 4.8. Sección Nosotros

Presenta la historia de Un Heladito, el origen del emprendimiento y sus valores, destacando la elaboración de helados y la importancia de compartir momentos en familia.

### 4.9. Contacto

Ofrece un formulario para ingresar información de contacto y comentarios, con validación de los campos correspondientes.

### 4.10. Blog

Incluye una sección de publicaciones relacionadas con el contenido de la marca y vistas para consultar sus detalles.

### 4.11. Panel de administración

Dispone de una interfaz para gestionar productos y categorías, además de consultar información de usuarios y pedidos registrados en el entorno de demostración.

## 5. Navegación del sitio

El sitio utiliza React Router para presentar las diferentes vistas sin recargar un documento HTML independiente.

| Ruta | Descripción |
|---|---|
| `/` | Inicio. |
| `/productos` | Catálogo de productos. |
| `/productos/:id` | Detalle de un producto. |
| `/categorias` | Categorías. |
| `/ofertas` | Productos en oferta. |
| `/carrito` | Carrito de compras. |
| `/checkout` | Proceso de compra. |
| `/resultado-pago` | Resultado del pago de demostración. |
| `/login` | Inicio de sesión. |
| `/registro` | Registro de usuarios. |
| `/mi-cuenta` | Sección personal. |
| `/nosotros` | Información de la empresa. |
| `/contacto` | Formulario de contacto. |
| `/blog` | Publicaciones. |
| `/blog/:id` | Detalle de una publicación. |
| `/admin` | Panel de administración. |

Las rutas permiten mantener una navegación ordenada y separar las responsabilidades de las diferentes vistas del sitio.

## 6. Arquitectura y organización

El proyecto se organiza mediante componentes reutilizables, páginas, contextos, módulos de datos y servicios auxiliares.

```text
un-heladito-react/
├── public/
│   └── images/
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

La organización separa la interfaz, la navegación, los datos de demostración y las funciones auxiliares, haciendo más sencillo mantener y ampliar el proyecto.

## 7. Instalación y ejecución

### Requisitos

- Node.js compatible con las dependencias del proyecto.
- npm.
- Un editor de código.
- Un navegador web actualizado.

### Instalación

Clonar el repositorio o descargar el proyecto y abrir una terminal en la carpeta raíz.

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Vite proporcionará una dirección local para abrir el sitio en el navegador, normalmente `http://localhost:5173`.

### Compilación para producción

```bash
npm run build
```

El comando genera la versión compilada del sitio dentro de la carpeta `dist/`.

Para previsualizar la compilación:

```bash
npm run preview
```

### Análisis estático

```bash
npm run lint
```

Este comando permite detectar problemas de código mediante Oxlint, siempre que el script correspondiente esté definido en `package.json`.

## 8. Almacenamiento y gestión de datos

El proyecto incorpora módulos de datos de demostración y mecanismos de almacenamiento en el navegador para conservar determinados cambios entre visitas, según la funcionalidad.

Este enfoque permite demostrar el comportamiento del catálogo, las categorías y otras operaciones sin requerir necesariamente un servidor de datos.

El almacenamiento local pertenece al navegador del usuario y no equivale a una base de datos centralizada. Por ello, los cambios realizados en un dispositivo no se sincronizan automáticamente con otros usuarios o equipos.

## 9. Pruebas y control de calidad

La calidad del sitio se aborda mediante la validación del código y la comprobación de las funcionalidades principales.

La suite de pruebas del proyecto contempla las siguientes áreas:

- **Gestión de productos:** consulta, creación, actualización y eliminación.
- **Gestión de categorías:** creación, actualización y eliminación.
- **Carrito de compras:** cálculo de unidades, importes y totales.
- **Validación de formularios:** comprobación de campos obligatorios y datos de compra.
- **Componentes React:** representación de los productos y comportamiento de los controles.
- **Integridad de datos:** tratamiento de códigos inexistentes, duplicados y categorías asociadas a productos.

Además de las pruebas automatizadas, el control de calidad contempla la revisión de la navegación, la compilación y el comportamiento de las vistas principales.

## 10. Publicación en la nube

El sitio utiliza Vite para generar archivos estáticos que pueden alojarse en un servicio de publicación web compatible.

El proceso de publicación contempla:

1. Instalar las dependencias.
2. Generar la compilación de producción con `npm run build`.
3. Publicar el contenido de la carpeta `dist/`.
4. Configurar la resolución de rutas para que React Router pueda mostrar las vistas internas al acceder directamente a una URL.
5. Verificar la carga de recursos, la navegación y las funcionalidades principales desde el sitio publicado.

Para conectar futuras funcionalidades comerciales, la arquitectura puede ampliarse con un backend y servicios externos.

## 11. Seguridad y limitaciones técnicas

El proyecto diferencia las funciones de demostración de los servicios que requieren infraestructura externa.

El almacenamiento local no reemplaza una base de datos protegida. Del mismo modo, las vistas de registro, inicio de sesión y administración no deben considerarse mecanismos de seguridad de producción mientras no estén respaldadas por autenticación y autorización implementadas en un servidor.

El procesamiento de pedidos y los resultados de pago representados en la versión de demostración tampoco constituyen una integración con una pasarela de pago real.

Estas consideraciones permiten definir las responsabilidades del sitio y los componentes que serían necesarios para evolucionar hacia una plataforma comercial.

## 12. Mejoras y evolución

La estructura modular facilita incorporar nuevas capacidades, como:

- Integración con una API y una base de datos remota.
- Autenticación segura y gestión de permisos.
- Procesamiento real de pedidos y pagos.
- Notificaciones automáticas de compra.
- Administración centralizada del inventario.
- Mejoras de accesibilidad y optimización de rendimiento.
- Ampliación de las pruebas automatizadas y de integración.

## 13. Conclusión

Un Heladito reúne en un único sitio web la presentación de la marca, la exploración de productos y un flujo de compra de demostración. Su desarrollo con React, Vite y React Router permite organizar las vistas mediante componentes reutilizables y mantener una navegación coherente.

La estructura del proyecto proporciona una base organizada para mantener el sitio, incorporar nuevas funcionalidades y evolucionar hacia una solución con servicios de backend cuando los requisitos lo necesiten.

## 14. Información del proyecto

**Nombre:** Un Heladito.

**Tipo:** sitio web de heladería artesanal.

**Tecnologías principales:** React, Vite, JavaScript, CSS y React Router.

**Repositorio:** [Un Heladito React en GitHub](https://github.com/Edu-Acevedo/unHeladito-React).
