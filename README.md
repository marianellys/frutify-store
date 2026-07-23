# Frutify 🍎

Plataforma de e-commerce para la venta de frutas y vegetales frescos. Desarrollada con Angular 20, Bootstrap 5 y TypeScript.

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

## 📁 Estructura del Proyecto

```
frutify/
├── src/
│   ├── app/
│   │   ├── auth/                    # Autenticación
│   │   │   ├── login/
│   │   │   │   ├── login.ts
│   │   │   │   ├── login.html
│   │   │   │   └── login.css
│   │   │   └── register/
│   │   │       ├── register.ts
│   │   │       ├── register.html
│   │   │       └── register.css
│   │   ├── pages/                   # Páginas principales
│   │   │   ├── home/               # Página de inicio
│   │   │   ├── about/              # Página "Nosotros"
│   │   │   ├── shop/               # Tienda de productos
│   │   │   ├── shop-detail/        # Detalle de producto
│   │   │   ├── cart/               # Carrito de compras
│   │   │   ├── checkout/           # Proceso de pago
│   │   │   ├── wishlist/           # Lista de deseos
│   │   │   ├── my-account/         # Mi cuenta
│   │   │   ├── gallery/            # Galería de productos
│   │   │   └── contact-us/         # Página de contacto
│   │   ├── shared/                  # Componentes compartidos
│   │   │   ├── header/             # Header con navegación
│   │   │   ├── footer/             # Footer de la aplicación
│   │   │   ├── scroll-top/         # Botón de scroll arriba
│   │   │   └── social-networks/    # Redes sociales
│   │   ├── services/                # Servicios de negocio
│   │   │   ├── auth.service.ts     # Servicio de autenticación
│   │   │   ├── cart.service.ts     # Servicio del carrito
│   │   │   └── product.service.ts  # Servicio de productos
│   │   ├── app.config.ts           # Configuración de la app
│   │   ├── app.routes.ts           # Rutas de la aplicación
│   │   ├── app.ts                  # Componente principal
│   │   ├── app.html                # Template principal
│   │   └── app.css                 # Estilos globales
│   ├── index.html                  # HTML principal
│   ├── main.ts                     # Punto de entrada
│   └── styles.css                  # Estilos globales
├── docs/                           # Documentación
│   ├── REQUISITOS_DE_SOFTWARE.md   # Requisitos funcionales y no funcionales
│   ├── HISTORIAS_DE_USUARIO.md     # Historias de usuario del proyecto
│   └── DOCUMENTO_DE_VISION.md      # Visión y roadmap del proyecto
├── public/                         # Archivos estáticos
├── angular.json                    # Configuración de Angular
├── package.json                    # Dependencias del proyecto
└── README.md                       # Este archivo
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd frutify
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

## 📱 Rutas de la Aplicación

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | Home | Página de inicio con banner promocional |
| `/about` | About | Información sobre la empresa |
| `/shop` | Shop | Catálogo de productos |
| `/shop-detail` | ShopDetail | Detalle individual de producto |
| `/cart` | Cart | Carrito de compras |
| `/checkout` | Checkout | Proceso de pago |
| `/my-account` | MyAccount | Gestión de cuenta de usuario |
| `/wishlist` | Wishlist | Lista de deseos |
| `/gallery` | Gallery | Galería de productos |
| `/contact-us` | ContactUs | Formulario de contacto |
| `/auth/login` | Login | Inicio de sesión |
| `/auth/register` | Register | Registro de usuario |

## 🔧 Servicios

### AuthService
Gestiona la autenticación de usuarios con persistencia en localStorage.
- `login(email, password)`: Inicia sesión
- `register(name, email, password)`: Registra nuevo usuario
- `logout()`: Cierra sesión
- `isLoggedIn()`: Verifica estado de autenticación
- `getCurrentUser()`: Obtiene usuario actual

### CartService
Gestiona el carrito de compras con BehaviorSubject para reactividad.
- `addToCart(item)`: Agrega producto al carrito
- `removeFromCart(itemId)`: Elimina producto del carrito
- `updateQuantity(itemId, quantity)`: Modifica cantidad
- `getCartTotal()`: Calcula total del carrito
- `getCartCount()`: Obtiene cantidad de productos
- `clearCart()`: Vacía el carrito

### ProductService
Gestiona el catálogo de productos con datos mock.
- `getProducts()`: Obtiene todos los productos
- `getProductById(id)`: Obtiene producto por ID
- `getProductsByCategory(category)`: Filtra por categoría
- `searchProducts(query)`: Busca productos

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
