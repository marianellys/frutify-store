<?php
/**
 * carrito.php
 * GET    /carrito.php?usuario_id=1          -> obtener carrito del usuario
 * POST   /carrito.php                       -> agregar producto al carrito
 * PUT    /carrito.php                       -> actualizar cantidad
 * DELETE /carrito.php?usuario_id=1&id=5     -> eliminar producto del carrito
 *
 * Body POST/PUT (JSON):
 * { "usuario_id": 1, "producto_id": 2, "cantidad": 3 }
 */

require_once __DIR__ . '/conexion.php';

$pdo = conectar();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $usuarioId = isset($_GET['usuario_id']) ? (int) $_GET['usuario_id'] : 0;

    if ($usuarioId <= 0) {
        responder(['error' => 'usuario_id es obligatorio'], 400);
    }

    $stmt = $pdo->prepare(
        'SELECT c.id, c.producto_id, c.cantidad, p.nombre, p.precio, p.imagen, p.descripcion
         FROM carrito c
         JOIN productos p ON p.id = c.producto_id
         WHERE c.usuario_id = ?
         ORDER BY c.agregado_en DESC'
    );
    $stmt->execute([$usuarioId]);

    responder(['success' => true, 'items' => $stmt->fetchAll()]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $datos = json_decode(file_get_contents('php://input'), true) ?? [];

    $usuarioId  = (int) ($datos['usuario_id'] ?? 0);
    $productoId = (int) ($datos['producto_id'] ?? 0);
    $cantidad   = (int) ($datos['cantidad'] ?? 1);

    if ($usuarioId <= 0 || $productoId <= 0) {
        responder(['error' => 'usuario_id y producto_id son obligatorios'], 400);
    }

    // Verificar que el producto existe
    $stmt = $pdo->prepare('SELECT id FROM productos WHERE id = ?');
    $stmt->execute([$productoId]);
    if (!$stmt->fetch()) {
        responder(['error' => 'Producto no encontrado'], 404);
    }

    // Verificar si ya existe en el carrito
    $stmt = $pdo->prepare('SELECT id, cantidad FROM carrito WHERE usuario_id = ? AND producto_id = ?');
    $stmt->execute([$usuarioId, $productoId]);
    $existing = $stmt->fetch();

    if ($existing) {
        $newQuantity = $existing['cantidad'] + $cantidad;
        $stmt = $pdo->prepare('UPDATE carrito SET cantidad = ? WHERE id = ?');
        $stmt->execute([$newQuantity, $existing['id']]);
    } else {
        $stmt = $pdo->prepare('INSERT INTO carrito (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)');
        $stmt->execute([$usuarioId, $productoId, $cantidad]);
    }

    responder(['success' => true, 'message' => 'Producto agregado al carrito'], 201);
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $datos = json_decode(file_get_contents('php://input'), true) ?? [];

    $usuarioId  = (int) ($datos['usuario_id'] ?? 0);
    $productoId = (int) ($datos['producto_id'] ?? 0);
    $cantidad   = (int) ($datos['cantidad'] ?? 1);

    if ($usuarioId <= 0 || $productoId <= 0) {
        responder(['error' => 'usuario_id y producto_id son obligatorios'], 400);
    }

    if ($cantidad <= 0) {
        $stmt = $pdo->prepare('DELETE FROM carrito WHERE usuario_id = ? AND producto_id = ?');
        $stmt->execute([$usuarioId, $productoId]);
        responder(['success' => true, 'message' => 'Producto eliminado del carrito']);
    }

    $stmt = $pdo->prepare('UPDATE carrito SET cantidad = ? WHERE usuario_id = ? AND producto_id = ?');
    $stmt->execute([$cantidad, $usuarioId, $productoId]);

    responder(['success' => true, 'message' => 'Cantidad actualizada']);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $usuarioId = isset($_GET['usuario_id']) ? (int) $_GET['usuario_id'] : 0;
    $id        = isset($_GET['id']) ? (int) $_GET['id'] : 0;

    if ($usuarioId <= 0) {
        responder(['error' => 'usuario_id es obligatorio'], 400);
    }

    if ($id > 0) {
        $stmt = $pdo->prepare('DELETE FROM carrito WHERE id = ? AND usuario_id = ?');
        $stmt->execute([$id, $usuarioId]);
    } else {
        $stmt = $pdo->prepare('DELETE FROM carrito WHERE usuario_id = ?');
        $stmt->execute([$usuarioId]);
    }

    responder(['success' => true, 'message' => 'Carrito actualizado']);
}

responder(['error' => 'Método no permitido'], 405);
