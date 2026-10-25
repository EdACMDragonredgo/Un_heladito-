# Mapa de migración desde la web original

La aplicación React conserva los elementos útiles de `Un_heladito--main.zip` y el esqueleto de React/Vite de `un-heladito-web-carrito(1).zip`. Los antiguos HTML y scripts imperativos no se copian a la versión final: sus funcionalidades se pasan a componentes React y rutas internas.

| Archivo/funcionalidad original | Destino en la SPA React |
|---|---|
| `index.html` de la tienda | `src/pages/Home.jsx` + `src/components/Navbar.jsx` + `src/components/Footer.jsx` |
| `catalogo.html` | `src/pages/Products.jsx` + `src/components/ProductCard.jsx` |
| `producto.html` y `js/producto.js` | `src/pages/ProductDetail.jsx` |
| `js/cart.js` | `src/context/CartContext.jsx` + `src/services/format.js` |
| `carrito.html` y `js/carrito.js` | `src/pages/Cart.jsx` |
| Compra pendiente en el carrito | `src/pages/Checkout.jsx` + `src/pages/PaymentResult.jsx` con pago simulado |
| `login.html`, `registro.html`, `js/auth.js`, `js/login.js`, `js/registro.js` | `src/pages/Login.jsx`, `src/pages/Register.jsx`, `src/context/AuthContext.jsx` |
| `comprador.html` / vista de cuenta | `src/pages/Account.jsx` |
| `admin.html` y `js/admin.js` | `src/pages/admin/AdminDashboard.jsx` |
| Gestión local de productos | `src/data/mockDatabase.js` |
| Categorías de productos | `src/data/categories.js` + `src/data/useCategories.js` + `src/pages/Categories.jsx` |
| `nosotros.html` | `src/pages/About.jsx` |
| `contacto.html` y `js/contacto.js` | `src/pages/Contact.jsx` |
| Contenido de blog del flujo evaluativo | `src/pages/Blog.jsx` y `src/pages/BlogDetail.jsx` |
| CSS de páginas independientes | `src/App.css` + `src/index.css` y clases Bootstrap |
| Imágenes y piezas gráficas originales | `public/images/` |

## Qué se eliminó de la aplicación final

- Las páginas HTML duplicadas del sitio antiguo.
- Los scripts que usaban `document.querySelector`, `innerHTML`, `DOMContentLoaded` y redirecciones hacia otros archivos HTML.
- Los estilos específicos repetidos por página y los recursos de bienvenida de React/Vite.

## Qué falta antes de una publicación real

- Instalar dependencias y ejecutar `npm run build` en un entorno con acceso al registro de npm.
- Diseñar, implementar y ejecutar las pruebas del proyecto; no se incluyen pruebas automatizadas en esta entrega.
- Conectar un backend para cuentas, permisos, inventario y pedidos multiusuario.
- Integrar una pasarela de pago real solamente si el negocio lo requiere. El checkout actual es una simulación académica.
