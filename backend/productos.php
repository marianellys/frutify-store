<?php
/**
 * productos.php
 * GET /productos.php          -> todos los productos
 * GET /productos.php?id=5     -> un producto
 * GET /productos.php?categoria=frutas&busqueda=manzana -> filtros combinables
 */

require_once __DIR__ . '/conexion.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    responder(['error' => 'Método no permitido'], 405);
}

$pdo = conectar();

$id        = isset($_GET['id']) ? (int) $_GET['id'] : 0;
$categoria = isset($_GET['categoria']) ? trim($_GET['categoria']) : '';
$busqueda  = isset($_GET['busqueda']) ? trim($_GET['busqueda']) : '';

// Producto individual
if ($id > 0) {
    $stmt = $pdo->prepare('SELECT * FROM productos WHERE id = ?');
    $stmt->execute([$id]);
    $producto = $stmt->fetch();

    if (!$producto) {
        responder(['error' => 'Producto no encontrado'], 404);
    }

    responder(['success' => true, 'producto' => $producto]);
}

// Lista con filtros opcionales
$sql    = 'SELECT * FROM productos WHERE 1 = 1';
$params = [];

if ($categoria !== '') {
    $sql .= ' AND categoria = ?';
    $params[] = $categoria;
}

if ($busqueda !== '') {
    $sql    .= ' AND (nombre LIKE ? OR descripcion LIKE ?)';
    $like    = '%' . $busqueda . '%';
    $params[] = $like;
    $params[] = $like;
}

$sql .= ' ORDER BY nombre';

$stmt = $pdo->prepare($sql);
$stmt->execute($params);

responder(['success' => true, 'productos' => $stmt->fetchAll()]);