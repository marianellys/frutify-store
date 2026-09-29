<?php
/**
 * registro.php
 * POST /registro.php
 * Body (JSON): { "nombre": "...", "email": "...", "password": "..." }
 * Crea un usuario nuevo con la contraseña encriptada (bcrypt).
 */

require_once __DIR__ . '/conexion.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(['error' => 'Método no permitido'], 405);
}

$datos = json_decode(file_get_contents('php://input'), true) ?? [];

$nombre   = trim($datos['nombre'] ?? '');
$email    = trim($datos['email'] ?? '');
$password = $datos['password'] ?? '';

if ($nombre === '' || $email === '' || $password === '') {
    responder(['error' => 'Todos los campos son obligatorios'], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder(['error' => 'El email no es válido'], 400);
}

if (strlen($password) < 6) {
    responder(['error' => 'La contraseña debe tener al menos 6 caracteres'], 400);
}

$pdo = conectar();

$stmt = $pdo->prepare('SELECT id FROM usuarios WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    responder(['error' => 'El email ya está registrado'], 409);
}

$hash = password_hash($password, PASSWORD_BCRYPT);
$stmt = $pdo->prepare('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)');
$stmt->execute([$nombre, $email, $hash]);

responder([
    'success' => true,
    'user'    => [
        'id'     => (int) $pdo->lastInsertId(),
        'nombre' => $nombre,
        'email'  => $email,
    ],
], 201);