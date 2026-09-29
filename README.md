# Frutify 🍎

Plataforma de e-commerce para la venta de frutas y vegetales frescos. Frontend con Angular 20, Bootstrap 5 y TypeScript; backend con PHP y MySQL.

## 📋 Descripción del Proyecto

Frutify es una aplicación web moderna que permite a los usuarios navegar, seleccionar y comprar productos frescos de frutas y vegetales. La plataforma cuenta con un diseño intuitivo, autenticación de usuarios, carrito de compras persistente y una experiencia de usuario optimizada.

### Características Principales

- **Autenticación de usuarios**: Registro, login y logout con persistencia en localStorage
- **Catálogo de productos**: Visualización de frutas y vegetales con búsqueda y filtrado
- **Carrito de compras**: Gestión completa con persistencia y cálculo de totales
- **Lista de deseos**: Guardar productos favoritos para compras futuras
- **Checkout**: Proceso de compra completo con formulario de envío
- **Diseño responsivo**: Interfaz adaptada para dispositivos móviles y desktop
- **Header sticky**: Navegación fija al hacer scroll
- **Redes sociales**: Botones de redes sociales en el lado derecho

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Angular 20.1.0
- **Lenguaje**: TypeScript 5.8.2
- **Estilos**: Bootstrap 5.3.8
- **Iconos**: FontAwesome 7.2.0
- **Build**: Angular CLI 20.1.5

### Dependencias Principales
```json
{
  "@angular/common": "^20.1.0",
  "@angular/compiler": "^20.1.0",
  "@angular/core": "^20.1.0",
  "@angular/forms": "^20.1.0",
  "@angular/platform-browser": "^20.1.0",
  "@angular/router": "^20.1.0",
  "@fortawesome/fontawesome-free": "^7.2.0",
  "bootstrap": "^5.3.8",
  "jquery": "^3.7.1",
  "rxjs": "~7.8.0"
}
```

### Backend
- **Lenguaje**: PHP 8+ con PDO (prepared statements)
- **Base de datos**: MySQL 8 (tablas `usuarios`, `productos`, `pedidos`, `detalle_pedido`)
- **Autenticación**: `password_hash()` / `password_verify()` (bcrypt)
- **Respuestas**: JSON con CORS

## 📁 Estructura del Proyecto

```
frutify/
├── frontend/                      # Aplicación Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/             # Autenticación (login, register)
│   │   │   ├── pages/            # Páginas principales (home, shop, cart, checkout...)
│   │   │   ├── shared/           # Componentes compartidos (header, footer...)
│   │   │   ├── services/         # Servicios de negocio (auth, cart, product, order)
│   │   │   ├── environments/     # Configuración de entorno (apiUrl)
│   │   │   ├── app.config.ts     # Configuración de la app
│   │   │   ├── app.routes.ts     # Rutas de la aplicación
│   │   │   ├── app.ts            # Componente principal
│   │   │   └── app.css           # Estilos globales
│   │   ├── index.html            # HTML principal
│   │   ├── main.ts               # Punto de entrada
│   │   └── styles.css            # Estilos globales
│   ├── public/                   # Archivos estáticos (imágenes, php)
│   ├── angular.json              # Configuración de Angular
│   ├── firebase.json             # Configuración de Firebase Hosting
│   └── package.json              # Dependencias del frontend
├── backend/                      # API PHP + MySQL
│   ├── conexion.php              # Conexión PDO y configuración
│   ├── login.php                 # POST - iniciar sesión
│   ├── registro.php              # POST - registrar usuario
│   ├── productos.php             # GET - catálogo de productos
│   ├── pedidos.php               # GET/POST - pedidos de usuario
│   ├── detalle_pedido.php        # GET - ítems de un pedido
│   └── frutify.sql               # Esquema + datos iniciales de la BD
├── docs/                         # Documentación del proyecto
│   ├── REQUISITOS_DE_SOFTWARE.md
│   ├── HISTORIAS_DE_USUARIO.md
│   └── DOCUMENTO_DE_VISION.md
└── README.md                     # Este archivo
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- npm o yarn
- PHP 8+ y MySQL (para el backend)

### Pasos de instalación

**Frontend**
1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd frutify/frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor de desarrollo**
```bash
ng serve
```

4. **Abrir en el navegador**
```
http://localhost:4200/
```

**Backend**
1. **Crear la base de datos** (importa `backend/frutify.sql` en phpMyAdmin o vía consola):
```bash
mysql -u root -p < backend/frutify.sql
```

2. **Ajustar credenciales** en `backend/conexion.php` si tu MySQL no usa `root` sin contraseña.

3. **Iniciar el servidor PHP de desarrollo** desde la raíz del proyecto:
```bash
php -S localhost:8000 -t backend
```

4. **Probar los endpoints**:
```
GET  http://localhost:8000/productos.php
POST http://localhost:8000/registro.php
POST http://localhost:8000/login.php
```

## 📱 Rutas de la Aplicación

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | Home | Página de inicio con banner promocional |
| `/shop` | Shop | Catálogo de productos |
| `/shop-detail` | ShopDetail | Detalle individual de producto |
| `/cart` | Cart | Carrito de compras |
| `/checkout` | Checkout | Proceso de pago |
| `/auth/login` | Login | Inicio de sesión |
| `/auth/register` | Register | Registro de usuario |
| `**` | - | Redirección al inicio |

## 🔧 Servicios

Los servicios se comunican con el backend PHP mediante HTTP. La URL base se configura en `frontend/src/environments/environment.ts`.

### AuthService
Gestiona la autenticación contra `login.php` y `registro.php`, con sesión persistida en localStorage (bcrypt en el servidor).
- `login(email, password)`: Inicia sesión (Observable)
- `register(name, email, password)`: Registra nuevo usuario (Observable)
- `logout()`: Cierra sesión
- `isLoggedIn()`: Verifica estado de autenticación
- `getCurrentUser()`: Obtiene usuario actual

### CartService
Gestiona el carrito de compras con BehaviorSubject para reactividad (persistencia en localStorage). Se convierte en pedido real vía `OrderService`.
- `addToCart(item)`: Agrega producto al carrito
- `removeFromCart(itemId)`: Elimina producto del carrito
- `updateQuantity(itemId, quantity)`: Modifica cantidad
- `getCartTotal()`: Calcula total del carrito
- `getCartCount()`: Obtiene cantidad de productos
- `clearCart()`: Vacía el carrito

### ProductService
Carga el catálogo desde `productos.php` (con datos mock como respaldo si el backend no responde).
- `loadProducts()`: Recarga el catálogo desde la API
- `getProducts()`: Obtiene todos los productos
- `getProductById(id)`: Obtiene producto por ID
- `getProductsByCategory(category)`: Filtra por categoría
- `searchProducts(query)`: Busca productos

### OrderService
Se comunica con `pedidos.php` y `detalle_pedido.php`.
- `getOrders(usuarioId)`: Obtiene el historial de pedidos
- `createOrder(order)`: Crea un pedido con sus ítems
- `getOrderDetails(pedidoId)`: Obtiene los ítems de un pedido

## 🔌 Endpoints del Backend

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/registro.php` | Registrar usuario (nombre, email, password) |
| POST | `/login.php` | Iniciar sesión (email, password) |
| GET | `/productos.php` | Catálogo de productos (filtros: `id`, `categoria`, `busqueda`) |
| POST | `/pedidos.php` | Crear pedido (usuario_id, dirección, items) |
| GET | `/pedidos.php?usuario_id=X` | Historial de pedidos del usuario |
| GET | `/detalle_pedido.php?pedido_id=X` | Ítems de un pedido |

## 🎨 Diseño y Estilos

- **Framework CSS**: Bootstrap 5.3.8
- **Colores principales**:
  - Amarillo: `#ffc107` (botones principales)
  - Gris claro: `#f8f9fa` (fondos)
  - Blanco: `#ffffff` (componentes)
  - Texto: `#212529` (texto principal), `#6c757d` (texto secundario)
- **Tipografía**: Fuente por defecto de Bootstrap
- **Responsive**: Mobile-first approach

## 🏗️ Arquitectura

### Componentes Standalone
Todos los componentes usan la arquitectura standalone de Angular 20:
- Imports explícitos de dependencias
- Sin NgModule tradicional
- Mejor performance y tree-shaking

### Servicios
- Inyectados con providedIn: 'root'
- Singleton pattern por defecto
- Separación clara de lógica de negocio

### Routing
- Router de Angular para navegación
- Lazy loading potencial para páginas grandes
- Guards de autenticación (pendiente de implementación)

## 📦 Build y Despliegue

### Desarrollo
```bash
ng serve
```

### Producción
```bash
ng build --configuration production
```

### Despliegue en Firebase
```bash
ng build
firebase deploy
```

## 🧪 Testing

### Unit Tests
```bash
ng test
```

### E2E Tests
```bash
ng e2e
```

## 📝 Documentación Adicional

Para más detalles sobre el proyecto, consulta los documentos en la carpeta `docs/`:

- **REQUISITOS_DE_SOFTWARE.md**: Requisitos funcionales y no funcionales completos
- **HISTORIAS_DE_USUARIO.md**: Historias de usuario organizadas por epics
- **DOCUMENTO_DE_VISION.md**: Visión, objetivos y roadmap del proyecto

## 🔒 Seguridad

- Autenticación con localStorage (versión demo)
- Validación de inputs en frontend
- Sin almacenamiento de contraseñas en texto plano
- Pendiente: Integración con backend seguro

## 🚧 Limitaciones Actuales

- Backend mock con localStorage (sin servidor real)
- Sin procesamiento de pagos reales
- Sin integración con pasarelas de pago
- Datos persisten solo en el navegador
- Sin panel de administración

## 🗺️ Roadmap Futuro

- [ ] Integración con backend real (Node.js/Firebase)
- [ ] Sistema de pagos integrado (Stripe/PayPal)
- [ ] Autenticación con redes sociales
- [ ] Panel de administración
- [ ] Sistema de reviews y ratings
- [ ] Notificaciones push
- [ ] Carrito compartido entre dispositivos
- [ ] App móvil nativa

## 👥 Contribución

Este es un proyecto educativo/demonstrativo. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de uso educativo. Todos los derechos reservados.

## 📞 Contacto

Para más información, contacta a:
- Email: info@frutify.com
- Proyecto: Frutify E-commerce Platform

---

**Desarrollado con ❤️ usando Angular 20**
