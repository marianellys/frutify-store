<?php
/**
 * pedidos.php
 * POST /pedidos.php            -> crea un pedido con sus detalles
 * GET  /pedidos.php?usuario_id=1 -> historial de pedidos del usuario
 *
 * Body POST (JSON):
 * {
 *   "usuario_id": 1,
 *   "direccion": "...",
 *   "ciudad": "...",
 *   "telefono": "...",
 *   "metodo_pago": "tarjeta",
 *   "total": 12.45,
 *   "items": [ { "producto_id": 1, "cantidad": 2, "precio": 2.99 } ]
 * }
 */

require_once __DIR__ . '/conexion.php';

$pdo = conectar();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $usuarioId = isset($_GET['usuario_id']) ? (int) $_GET['usuario_id'] : 0;

    if ($usuarioId <= 0) {
        responder(['error' => 'usuario_id es obligatorio'], 400);
    }

    $stmt = $pdo->prepare('SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY creado_en DESC');
    $stmt->execute([$usuarioId]);
    foreach ($stmt->fetchAll() as &$pedido) {
        $pedido['items'] = obtenerDetalles($pdo, (int) $pedido['id']);
    }
    unset($pedido);

    responder(['success' => true, 'pedidos' => $stmt->fetchAll()]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(['error' => 'Método no permitido'], 405);
}

$datos = json_decode(file_get_contents('php://input'), true) ?? [];

$usuarioId   = (int) ($datos['usuario_id'] ?? 0);
$direccion   = trim($datos['direccion'] ?? '');
$ciudad      = trim($datos['ciudad'] ?? '');
$telefono    = trim($datos['telefono'] ?? '');
$metodoPago  = trim($datos['metodo_pago'] ?? '');
$total       = (float) ($datos['total'] ?? 0);
$items       = $datos['items'] ?? [];

if ($usuarioId <= 0) {
    responder(['error' => 'usuario_id es obligatorio'], 400);
}

if ($direccion === '' || $ciudad === '') {
    responder(['error' => 'La dirección de envío es obligatoria'], 400);
}

if (empty($items)) {
    responder(['error' => 'El pedido debe contener al menos un producto'], 400);
}

$pdo->beginTransaction();

try {
    $stmt = $pdo->prepare(
        'INSERT INTO pedidos (usuario_id, total, estado, direccion, ciudad, telefono, metodo_pago)
         VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([$usuarioId, $total, 'pendiente', $direccion, $ciudad, $telefono, $metodoPago]);
    $pedidoId = (int) $pdo->lastInsertId();

    foreach ($items as $item) {
        $productoId = (int) ($item['producto_id'] ?? 0);
        $cantidad   = (int) ($item['cantidad'] ?? 1);
        $precio     = (float) ($item['precio'] ?? 0);

        if ($productoId <= 0 || $cantidad <= 0) {
            throw new RuntimeException('Datos de producto inválidos en el pedido');
        }

        $stmt = $pdo->prepare(
            'INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unitario)
             VALUES (?, ?, ?, ?)'
        );
        $stmt->execute([$pedidoId, $productoId, $cantidad, $precio]);
    }

    $pdo->commit();

    $stmt = $pdo->prepare('SELECT * FROM pedidos WHERE id = ?');
    $stmt->execute([$pedidoId]);
    $pedido = $stmt->fetch();
    $pedido['items'] = obtenerDetalles($pdo, $pedidoId);

    responder(['success' => true, 'pedido' => $pedido], 201);
} catch (Throwable $e) {
    $pdo->rollBack();
    responder(['error' => 'No se pudo crear el pedido: ' . $e->getMessage()], 500);
}

/**
 * Devuelve los ítems de un pedido con el nombre del producto.
 */
function obtenerDetalles(PDO $pdo, int $pedidoId): array
{
    $stmt = $pdo->prepare(
        'SELECT dp.id, dp.producto_id, p.nombre AS producto, dp.cantidad, dp.precio_unitario
         FROM detalle_pedido dp
         JOIN productos p ON p.id = dp.producto_id
         WHERE dp.pedido_id = ?'
    );
    $stmt->execute([$pedidoId]);
    return $stmt->fetchAll();
}