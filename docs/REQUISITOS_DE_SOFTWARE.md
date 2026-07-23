# Requisitos de Software - Frutify

## 1. Introducción

Frutify es una aplicación web de e-commerce para la venta de frutas y vegetales frescos. Este documento detalla los requisitos funcionales y no funcionales del sistema.

## 2. Requisitos Funcionales

### 2.1 Autenticación y Autorización
- **RF-001:** El sistema debe permitir a los usuarios registrarse con nombre, email y contraseña
- **RF-002:** El sistema debe permitir a los usuarios iniciar sesión con email y contraseña
- **RF-003:** El sistema debe permitir a los usuarios cerrar sesión
- **RF-004:** El sistema debe mantener la sesión del usuario activa mediante localStorage
- **RF-005:** El sistema debe mostrar el nombre del usuario en el header cuando está autenticado

### 2.2 Gestión de Productos
- **RF-006:** El sistema debe mostrar un catálogo de productos (frutas y vegetales)
- **RF-007:** El sistema debe permitir filtrar productos por categoría
- **RF-008:** El sistema debe permitir buscar productos por nombre o descripción
- **RF-009:** El sistema debe mostrar detalles individuales de cada producto
- **RF-010:** Cada producto debe mostrar: nombre, precio, categoría, imagen, descripción y rating

### 2.3 Carrito de Compras
- **RF-011:** El sistema debe permitir a los usuarios agregar productos al carrito
- **RF-012:** El sistema debe permitir a los usuarios modificar la cantidad de productos en el carrito
- **RF-013:** El sistema debe permitir a los usuarios eliminar productos del carrito
- **RF-014:** El sistema debe calcular el total del carrito automáticamente
- **RF-015:** El sistema debe mostrar el contador de productos en el carrito
- **RF-016:** El sistema debe persistir el carrito en localStorage

### 2.4 Lista de Deseos
- **RF-017:** El sistema debe permitir a los usuarios agregar productos a la lista de deseos
- **RF-018:** El sistema debe permitir a los usuarios eliminar productos de la lista de deseos
- **RF-019:** El sistema debe mostrar la lista de deseos del usuario

### 2.5 Proceso de Compra
- **RF-020:** El sistema debe permitir a los usuarios proceder al checkout desde el carrito
- **RF-021:** El sistema debe mostrar un formulario de datos de envío
- **RF-022:** El sistema debe mostrar un resumen del pedido antes de confirmar
- **RF-023:** El sistema debe permitir seleccionar método de pago

### 2.6 Cuenta de Usuario
- **RF-024:** El sistema debe permitir a los usuarios ver su perfil
- **RF-025:** El sistema debe permitir a los usuarios editar su información personal
- **RF-026:** El sistema debe mostrar el historial de pedidos del usuario

### 2.7 Navegación y Páginas
- **RF-027:** El sistema debe tener una página de inicio con banner promocional
- **RF-028:** El sistema debe tener una página "Nosotros" con información de la empresa
- **RF-029:** El sistema debe tener una página de galería de productos
- **RF-030:** El sistema debe tener una página de contacto con formulario
- **RF-031:** El sistema debe tener un header con navegación principal
- **RF-032:** El sistema debe tener un footer con información de contacto

## 3. Requisitos No Funcionales

### 3.1 Performance
- **RNF-001:** La aplicación debe cargar en menos de 3 segundos en conexión 4G
- **RNF-002:** Las transiciones entre páginas deben ser fluidas (< 500ms)
- **RNF-003:** El sistema debe soportar hasta 1000 productos en el catálogo sin degradación

### 3.2 Usabilidad
- **RNF-004:** La interfaz debe ser responsiva y funcionar en dispositivos móviles
- **RNF-005:** La interfaz debe seguir los lineamientos de Bootstrap 5
- **RNF-006:** Los colores deben ser consistentes en toda la aplicación
- **RNF-007:** La navegación debe ser intuitiva y fácil de usar

### 3.3 Seguridad
- **RNF-008:** Las contraseñas no deben almacenarse en texto plano
- **RNF-009:** Los datos del usuario deben persistir solo en localStorage (versión demo)
- **RNF-010:** El sistema debe validar inputs de usuario en el frontend

### 3.4 Compatibilidad
- **RNF-011:** La aplicación debe funcionar en los navegadores modernos (Chrome, Firefox, Safari, Edge)
- **RNF-012:** La aplicación debe ser compatible con Angular 20+
- **RNF-013:** La aplicación debe usar TypeScript para type safety

### 3.5 Mantenibilidad
- **RNF-014:** El código debe seguir buenas prácticas de Angular
- **RNF-015:** Los componentes deben ser standalone y reutilizables
- **RNF-016:** La lógica de negocio debe estar separada en servicios
- **RNF-017:** La estructura de carpetas debe ser organizada y escalable

## 4. Stack Tecnológico

### Frontend
- **Framework:** Angular 20.1.0
- **Lenguaje:** TypeScript 5.8.2
- **Estilos:** Bootstrap 5.3.8
- **Iconos:** FontAwesome 7.2.0
- **Build:** Angular CLI 20.1.5

### Estructura del Proyecto
```
src/app/
├── auth/              # Autenticación (login, register)
├── pages/             # Páginas principales
├── shared/            # Componentes compartidos
├── services/          # Servicios de negocio
├── app.config.ts      # Configuración de la app
├── app.routes.ts      # Rutas de la aplicación
└── app.ts             # Componente principal
```

## 5. Requisitos de Despliegue

- **Hosting:** La aplicación debe poder desplegarse en Firebase Hosting
- **Build:** El build debe generar archivos estáticos optimizados
- **Environment:** Debe soportar configuración de entorno para desarrollo y producción

## 6. Limitaciones Actuales

- **Backend:** Actualmente usa mock data y localStorage (sin backend real)
- **Pagos:** No procesa pagos reales (solo simulación)
- **Persistencia:** Los datos se pierden al limpiar el navegador
- **Email:** No envía emails de confirmación o recuperación

## 7. Roadmap Futuro

- Integración con backend real (Node.js/Firebase)
- Sistema de pagos integrado (Stripe/PayPal)
- Autenticación con redes sociales
- Panel de administración
- Sistema de reviews y ratings
- Notificaciones push
- Carrito compartido entre dispositivos
