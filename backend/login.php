<?php
/**
 * login.php
 * POST /login.php
 * Body (JSON): { "email": "...", "password": "..." }
 * Verifica las credenciales y devuelve el usuario con un token de sesión.
 */

require_once __DIR__ . '/conexion.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(['error' => 'Método no permitido'], 405);
}

$datos = json_decode(file_get_contents('php://input'), true) ?? [];

$email    = trim($datos['email'] ?? '');
$password = $datos['password'] ?? '';

if ($email === '' || $password === '') {
    responder(['error' => 'Email y contraseña son obligatorios'], 400);
}

$pdo = conectar();

$stmt = $pdo->prepare('SELECT id, nombre, email, password FROM usuarios WHERE email = ?');
$stmt->execute([$email]);
$usuario = $stmt->fetch();

if (!$usuario || !password_verify($password, $usuario['password'])) {
    responder(['error' => 'Credenciales incorrectas'], 401);
}

responder([
    'success' => true,
    'user'    => [
        'id'     => (int) $usuario['id'],
        'nombre' => $usuario['nombre'],
        'email'  => $usuario['email'],
    ],
    'token'   => bin2hex(random_bytes(32)),
]);