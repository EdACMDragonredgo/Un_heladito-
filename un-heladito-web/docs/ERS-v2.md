# ERS V2 — Un Heladito

## 1. Propósito

Construir una tienda web SPA para una heladería artesanal que permita consultar productos, filtrar el catálogo, administrar un carrito, completar un checkout de demostración y gestionar productos desde una interfaz de administración.

## 2. Tecnologías y estructura

- React: componentes, propiedades, estado y composición de vistas.
- React Router: navegación interna entre rutas.
- Bootstrap 5 y CSS propio: diseño adaptable a móviles, tabletas y escritorio.
- Archivo JavaScript simulado: productos y operaciones CRUD.
- `localStorage` / `sessionStorage`: persistencia local para la demostración.

## 3. Requisitos funcionales

1. Mostrar una página de inicio con enlaces al catálogo, categorías y productos destacados.
2. Listar productos con nombre, descripción, precio, imagen, categoría, formato y stock.
3. Buscar productos por nombre, descripción o categoría, y filtrar/ordenar los resultados.
4. Mostrar el detalle de un producto y permitir agregar cantidades disponibles al carrito.
5. Permitir aumentar/disminuir cantidades, eliminar artículos, vaciar el carrito y calcular subtotales y total.
6. Persistir localmente el carrito y los cambios de inventario entre recargas del mismo navegador.
7. Validar el checkout antes de generar el pedido de demostración.
8. Simular los resultados de pago aprobado y rechazado, sin realizar cobros reales.
9. Permitir registro e inicio de sesión de demostración y mostrar la cuenta del usuario.
10. Proporcionar una vista administrativa para crear, consultar, editar y eliminar productos y consultar pedidos simulados.
11. Mostrar las vistas de historia de la tienda y contacto.

## 4. Requisitos no funcionales

- Debe ser una SPA construida con React.
- Debe utilizar Bootstrap para diseño responsive.
- Los componentes deben tener responsabilidades claras.
- Los formularios deben incluir validación y mensajes comprensibles.
- Los nombres, precios y cantidades deben mostrarse en formato local chileno cuando corresponda.
- Las pruebas deben definirse, ejecutarse y documentarse durante la etapa de testing.

## 5. Alcance y limitaciones conocidas

Esta versión usa almacenamiento del navegador. No es un sistema de producción: no dispone de backend, base de datos remota, autorización segura, envío real de correos ni pasarela de pagos. Las contraseñas de la cuenta de demostración se almacenan como datos locales para la práctica; no deben utilizarse para cuentas reales.

## 6. Vistas y rutas principales

- `/`: inicio.
- `/productos`: catálogo.
- `/productos/:id`: detalle.
- `/categorias`: categorías.
- `/ofertas`: productos marcados en oferta.
- `/carrito`: carrito.
- `/checkout`: entrega y pago de demostración.
- `/resultado-pago`: resultado del pedido simulado.
- `/login`, `/registro`, `/mi-cuenta`: funciones de cuenta.
- `/nosotros`, `/contacto`: información y formulario.
- `/admin`: gestión de productos y consulta de pedidos simulados.
