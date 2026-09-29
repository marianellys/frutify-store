# Historias de Usuario - Frutify

## 1. Introducción

Este documento describe las historias de usuario para la aplicación Frutify, una plataforma de e-commerce para la venta de frutas y vegetales frescos.

## 2. Historias de Usuario

### Epic: Autenticación

#### HU-001: Registro de Usuario
**Como** cliente nuevo  
**Quiero** poder registrarme en la plataforma  
**Para** poder comprar productos y gestionar mi cuenta

**Criterios de Aceptación:**
- El usuario debe poder ingresar nombre, email y contraseña
- El usuario debe confirmar la contraseña
- El usuario debe aceptar los términos y condiciones
- El sistema debe validar que las contraseñas coincidan
- El sistema debe crear la cuenta en la base de datos vía `registro.php` (backend PHP)
- El sistema debe redirigir al home después del registro exitoso
- El sistema debe mostrar un mensaje de error si el registro falla
- El sistema debe mostrar un error si el email ya está registrado

**Prioridad:** Alta  
**Story Points:** 5

---

#### HU-002: Inicio de Sesión
**Como** cliente registrado  
**Quiero** poder iniciar sesión con mi email y contraseña  
**Para** acceder a mi cuenta y realizar compras

**Criterios de Aceptación:**
- El usuario debe poder ingresar email y contraseña
- El usuario debe poder marcar "recordarme"
- El sistema debe validar las credenciales contra la base de datos vía `login.php` (backend PHP)
- El sistema debe mantener la sesión activa
- El sistema debe redirigir al home después del login exitoso
- El sistema debe mostrar un mensaje de error si las credenciales son incorrectas

**Prioridad:** Alta  
**Story Points:** 3

---

#### HU-003: Cierre de Sesión
**Como** cliente autenticado  
**Quiero** poder cerrar mi sesión  
**Para** proteger mi cuenta cuando no estoy usando la aplicación

**Criterios de Aceptación:**
- El usuario debe poder cerrar sesión desde el menú de usuario
- El sistema debe limpiar los datos de sesión
- El sistema debe redirigir a la página de login
- El sistema no debe mantener datos sensibles después del logout

**Prioridad:** Media  
**Story Points:** 2

---

### Epic: Catálogo de Productos

#### HU-004: Visualización de Productos
**Como** cliente  
**Quiero** ver un catálogo de productos organizados  
**Para** encontrar frutas y vegetales que desee comprar

**Criterios de Aceptación:**
- El sistema debe obtener el catálogo desde `productos.php` (backend PHP) con respaldo mock
- El sistema debe mostrar productos en una grilla
- Cada producto debe mostrar imagen, nombre y precio
- El sistema debe mostrar la categoría del producto
- El sistema debe permitir paginación si hay muchos productos
- La vista debe ser responsiva en móviles

**Prioridad:** Alta  
**Story Points:** 5

---

#### HU-005: Búsqueda de Productos
**Como** cliente  
**Quiero** poder buscar productos por nombre  
**Para** encontrar rápidamente lo que necesito

**Criterios de Aceptación:**
- El sistema debe tener un campo de búsqueda
- La búsqueda debe filtrar por nombre y descripción
- La búsqueda debe ser en tiempo real o al presionar enter
- El sistema debe mostrar resultados relevantes
- El sistema debe mostrar mensaje si no hay resultados

**Prioridad:** Media  
**Story Points:** 3

---

#### HU-006: Filtrado por Categoría
**Como** cliente  
**Quiero** poder filtrar productos por categoría  
**Para** ver solo frutas o solo vegetales

**Criterios de Aceptación:**
- El sistema debe mostrar categorías disponibles
- El usuario debe poder seleccionar una categoría
- El sistema debe filtrar productos según la categoría
- El usuario debe poder limpiar el filtro
- El sistema debe mostrar cantidad de productos por categoría

**Prioridad:** Media  
**Story Points:** 4

---

#### HU-007: Detalle de Producto
**Como** cliente  
**Quiero** ver los detalles de un producto específico  
**Para** tomar una decisión de compra informada

**Criterios de Aceptación:**
- El sistema debe mostrar imagen grande del producto
- El sistema debe mostrar descripción completa
- El sistema debe mostrar precio y rating
- El sistema debe mostrar categoría
- El sistema debe tener botón para agregar al carrito
- El sistema debe tener botón para agregar a favoritos

**Prioridad:** Alta  
**Story Points:** 3

---

### Epic: Carrito de Compras

#### HU-008: Agregar al Carrito
**Como** cliente  
**Quiero** poder agregar productos al carrito  
**Para** comprar varios productos en una sola orden

**Criterios de Aceptación:**
- El usuario debe poder agregar productos desde el catálogo
- El usuario debe poder agregar productos desde el detalle
- El sistema debe mostrar confirmación al agregar
- El sistema debe actualizar el contador del carrito
- El sistema debe mantener el carrito en localStorage
- Si el producto ya existe, debe incrementar la cantidad

**Prioridad:** Alta  
**Story Points:** 5

---

#### HU-009: Ver Carrito
**Como** cliente  
**Quiero** ver los productos en mi carrito  
**Para** revisar mi compra antes de pagar

**Criterios de Aceptación:**
- El sistema debe mostrar todos los productos del carrito
- El sistema debe mostrar cantidad de cada producto
- El sistema debe mostrar precio unitario y subtotal
- El sistema debe mostrar el total a pagar
- El usuario debe poder modificar cantidades
- El usuario debe poder eliminar productos
- El carrito debe persistir entre sesiones

**Prioridad:** Alta  
**Story Points:** 5

---

#### HU-010: Modificar Cantidad
**Como** cliente  
**Quiero** poder modificar la cantidad de productos  
**Para** ajustar mi compra según mis necesidades

**Criterios de Aceptación:**
- El usuario debe poder incrementar cantidad
- El usuario debe poder decrementar cantidad
- El usuario debe poder ingresar cantidad manualmente
- Si la cantidad es 0, el producto debe eliminarse
- El total debe actualizarse automáticamente

**Prioridad:** Media  
**Story Points:** 3

---

#### HU-011: Eliminar del Carrito
**Como** cliente  
**Quiero** poder eliminar productos del carrito  
**Para** remover productos que ya no quiero comprar

**Criterios de Aceptación:**
- El usuario debe poder eliminar productos individuales
- El sistema debe pedir confirmación antes de eliminar
- El total debe actualizarse después de eliminar
- El contador del carrito debe actualizarse

**Prioridad:** Media  
**Story Points:** 2

---

### Epic: Lista de Deseos

#### HU-012: Agregar a Favoritos
**Como** cliente  
**Quiero** poder agregar productos a mi lista de deseos  
**Para** guardar productos para comprar después

**Criterios de Aceptación:**
- El usuario debe poder agregar productos desde el catálogo
- El usuario debe poder agregar desde el detalle de producto
- El sistema debe mostrar confirmación al agregar
- El sistema debe evitar duplicados
- La lista debe persistir en localStorage

**Prioridad:** Baja  
**Story Points:** 3

---

#### HU-013: Ver Lista de Deseos
**Como** cliente  
**Quiero** ver mi lista de deseos  
**Para** recordar productos que me interesan

**Criterios de Aceptación:**
- El sistema debe mostrar todos los productos favoritos
- El sistema debe mostrar imagen, nombre y precio
- El usuario debe poder agregar al carrito desde favoritos
- El usuario debe poder eliminar de favoritos
- La lista debe persistir entre sesiones

**Prioridad:** Baja  
**Story Points:** 3

---

### Epic: Checkout

#### HU-014: Proceso de Compra
**Como** cliente  
**Quiero** poder completar mi compra  
**Para** recibir mis productos en casa

**Criterios de Aceptación:**
- El usuario debe poder acceder al checkout desde el carrito
- El sistema debe mostrar resumen del pedido
- El usuario debe ingresar datos de envío
- El usuario debe seleccionar método de pago
- El sistema debe validar todos los campos
- El sistema debe guardar el pedido en la base de datos (`pedidos.php` y `detalle_pedido.php`)
- El sistema debe mostrar confirmación de pedido
- El carrito debe vaciarse después de la compra

**Prioridad:** Alta  
**Story Points:** 8

---

### Epic: Cuenta de Usuario

#### HU-015: Ver Perfil
**Como** cliente autenticado  
**Quiero** ver mi información de perfil  
**Para** mantener mis datos actualizados

**Criterios de Aceptación:**
- El sistema debe mostrar nombre del usuario
- El sistema debe mostrar email del usuario
- El usuario debe poder editar su información
- El sistema debe guardar los cambios
- El sistema debe mostrar historial de pedidos

**Prioridad:** Media  
**Story Points:** 4

---

#### HU-016: Historial de Pedidos
**Como** cliente  
**Quiero** ver mi historial de pedidos  
**Para** rastrear mis compras anteriores

**Criterios de Aceptación:**
- El sistema debe obtener el historial desde `pedidos.php` (backend PHP)
- El sistema debe mostrar lista de pedidos anteriores
- Cada pedido debe mostrar fecha y monto
- El usuario debe poder ver detalles de cada pedido (`detalle_pedido.php`)
- El sistema debe mostrar estado del pedido

**Prioridad:** Baja  
**Story Points:** 5

---

### Epic: Navegación

#### HU-017: Navegación Principal
**Como** usuario  
**Quiero** navegar fácilmente por la aplicación  
**Para** encontrar lo que busco rápidamente

**Criterios de Aceptación:**
- El header debe tener links a todas las páginas principales
- El header debe ser responsivo en móviles
- El header debe mostrar logo de la marca
- El header debe mostrar estado de autenticación
- El footer debe tener información de contacto
- La navegación debe ser intuitiva

**Prioridad:** Alta  
**Story Points:** 5

---

#### HU-018: Página de Inicio
**Como** visitante  
**Quiero** ver una página de inicio atractiva  
**Para** conocer la plataforma y sus productos

**Criterios de Aceptación:**
- La página debe tener un banner promocional
- La página debe mostrar categorías destacadas
- La página debe mostrar productos populares
- La página debe tener call-to-action para comprar
- El diseño debe ser atractivo y profesional

**Prioridad:** Alta  
**Story Points:** 5

---

#### HU-019: Página de Contacto
**Como** usuario  
**Quiero** poder contactar a la empresa  
**Para** hacer preguntas o reportar problemas

**Criterios de Aceptación:**
- La página debe tener un formulario de contacto
- El formulario debe validar campos requeridos
- El sistema debe mostrar confirmación al enviar
- La página debe mostrar información de contacto
- La página debe mostrar redes sociales

**Prioridad:** Baja  
**Story Points:** 3

---

## 3. Matriz de Prioridades

| Epic | Historias | Prioridad Alta | Prioridad Media | Prioridad Baja | Total |
|------|-----------|----------------|-----------------|----------------|-------|
| Autenticación | 3 | 2 | 1 | 0 | 3 |
| Catálogo | 4 | 2 | 2 | 0 | 4 |
| Carrito | 4 | 2 | 2 | 0 | 4 |
| Lista de Deseos | 2 | 0 | 0 | 2 | 2 |
| Checkout | 1 | 1 | 0 | 0 | 1 |
| Cuenta | 2 | 0 | 1 | 1 | 2 |
| Navegación | 3 | 2 | 0 | 1 | 3 |
| **TOTAL** | **19** | **9** | **6** | **4** | **19** |

## 4. Sprint Sugerido

### Sprint 1 (MVP - 2 semanas)
- HU-001: Registro de Usuario
- HU-002: Inicio de Sesión
- HU-004: Visualización de Productos
- HU-007: Detalle de Producto
- HU-008: Agregar al Carrito
- HU-009: Ver Carrito
- HU-014: Proceso de Compra
- HU-017: Navegación Principal
- HU-018: Página de Inicio

### Sprint 2 (Mejoras - 2 semanas)
- HU-003: Cierre de Sesión
- HU-005: Búsqueda de Productos
- HU-006: Filtrado por Categoría
- HU-010: Modificar Cantidad
- HU-011: Eliminar del Carrito
- HU-015: Ver Perfil

### Sprint 3 (Features adicionales - 1 semana)
- HU-012: Agregar a Favoritos
- HU-013: Ver Lista de Deseos
- HU-016: Historial de Pedidos
- HU-019: Página de Contacto
