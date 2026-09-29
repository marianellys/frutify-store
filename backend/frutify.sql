-- ============================================
-- Frutify - Base de datos MySQL
-- Tablas: usuarios, productos, pedidos, detalle_pedido
-- Importar desde phpMyAdmin o: mysql -u root -p < frutify.sql
-- ============================================

CREATE DATABASE IF NOT EXISTS frutify CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE frutify;

-- ------------------------------------------------------------
-- Tabla: usuarios
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(255) NOT NULL,
    creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_email (email)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: productos
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS productos (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    imagen VARCHAR(255) DEFAULT NULL,
    descripcion TEXT,
    rating DECIMAL(2, 1) DEFAULT 0.0,
    PRIMARY KEY (id),
    KEY idx_categoria (categoria)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: pedidos
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pedidos (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    usuario_id INT UNSIGNED NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    estado ENUM('pendiente', 'procesado', 'enviado', 'entregado', 'cancelado') NOT NULL DEFAULT 'pendiente',
    direccion VARCHAR(255) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) DEFAULT NULL,
    metodo_pago VARCHAR(50) DEFAULT NULL,
    creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_usuario (usuario_id),
    CONSTRAINT fk_pedidos_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: detalle_pedido
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS detalle_pedido (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    pedido_id INT UNSIGNED NOT NULL,
    producto_id INT UNSIGNED NOT NULL,
    cantidad INT UNSIGNED NOT NULL DEFAULT 1,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (id),
    KEY idx_pedido (pedido_id),
    KEY idx_producto (producto_id),
    CONSTRAINT fk_detalle_pedido FOREIGN KEY (pedido_id) REFERENCES pedidos (id) ON DELETE CASCADE,
    CONSTRAINT fk_detalle_producto FOREIGN KEY (producto_id) REFERENCES productos (id)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Datos de ejemplo: productos (coinciden con el catálogo mock del frontend)
-- ------------------------------------------------------------
INSERT INTO productos (nombre, precio, categoria, imagen, descripcion, rating) VALUES
('Manzana Roja', 2.99, 'frutas', 'images/productos/img-pro-01.jpg', 'Manzanas frescas y crujientes, perfectas para cualquier momento del día.', 4.5),
('Plátano',     1.99, 'frutas', 'images/productos/img-pro-02.jpg', 'Plátanos maduros y dulces, ricos en potasio.', 4.8),
('Naranja',     3.49, 'frutas', 'images/productos/img-pro-03.jpg', 'Naranjas jugosas y llenas de vitamina C.', 4.6),
('Zanahoria',   1.49, 'vegetales', 'images/productos/img-pro-04.jpg', 'Zanahorias frescas y crujientes, ideales para ensaladas.', 4.3),
('Tomate',      2.29, 'vegetales', 'images/productos/big-img-01.jpg', 'Tomates rojos y jugosos, perfectos para cocinar.', 4.4),
('Lechuga',     1.99, 'vegetales', 'images/productos/big-img-02.jpg', 'Lechuga fresca y crujiente, ideal para ensaladas.', 4.2);

-- ------------------------------------------------------------
-- Ejemplo de usuario de prueba (contraseña: 123456)
-- ------------------------------------------------------------
INSERT INTO usuarios (nombre, email, password) VALUES
('Usuario Demo', 'demo@frutify.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');