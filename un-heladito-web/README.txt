
UN HELADITO — HTML + CSS + JavaScript
=====================================

Flujos implementados:
- Registro como Cliente / Comprador.
- Registro como Administrador (correo @duoc.cl).
- Inicio de sesión con redirección por rol.
- Vista de Comprador: consulta productos + carrito local.
- Vista de Administrador: Dashboard + CRUD de productos + gestión de usuarios/roles.
- Guardas de acceso mediante sessionStorage.
- Persistencia de usuarios, productos y carrito mediante localStorage.
- Sin backend ni base de datos, de acuerdo con el ERS de la entrega.

Cuenta de prueba:
Correo: admin@duoc.cl
Contraseña: Admin123!

Archivos:
index.html
login.html
registro.html
comprador.html
admin.html
catalogo.html
producto.html
contacto.html
css/*.css
js/*.js

Importante:
Es una simulación académica cliente-side. Guardar contraseñas en localStorage NO es seguro para producción.
En un sistema real, la autenticación y los roles deben gestionarse en un backend.


Corrección del carrito:
- Se agregó carrito.html para visualizar, aumentar, disminuir y eliminar productos.
- Se centralizó la lógica en js/carrito.js.
- Los botones "Agregar al carrito" de comprador y catálogo funcionan y validan stock.
- producto.html ahora permite seleccionar cantidad y agregar el producto al carrito.
- El contador del carrito se actualiza entre páginas.
