<?php
/**
 * detalle_pedido.php
 * GET /detalle_pedido.php?pedido_id=1 -> detalles de un pedido
 */

require_once __DIR__ . '/conexion.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    responder(['error' => 'Método no permitido'], 405);
}

$pedidoId = isset($_GET['pedido_id']) ? (int) $_GET['pedido_id'] : 0;

if ($pedidoId <= 0) {
    responder(['error' => 'pedido_id es obligatorio'], 400);
}

$pdo = conectar();

$stmt = $pdo->prepare(
    'SELECT dp.id, dp.pedido_id, dp.producto_id, p.nombre AS producto, p.imagen,
            dp.cantidad, dp.precio_unitario
     FROM detalle_pedido dp
     JOIN productos p ON p.id = dp.producto_id
     WHERE dp.pedido_id = ?'
);
$stmt->execute([$pedidoId]);
$detalles = $stmt->fetchAll();

if (empty($detalles)) {
    responder(['error' => 'El pedido no tiene detalles registrados'], 404);
}

responder(['success' => true, 'detalle_pedido' => $detalles]);