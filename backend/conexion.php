<?php
/**
 * conexion.php
 * Configuración de CORS, credenciales y conexión PDO a MySQL.
 * Un único punto de conexión reutilizado por todos los endpoints.
 */

header('Content-Type: application/json; charset=utf-8');

// CORS (en producción restringir el origen al dominio del frontend)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Credenciales de la base de datos (ajustar según el entorno)
const DB_HOST = 'localhost';
const DB_PORT = '3306';
const DB_NAME = 'frutify';
const DB_USER = 'root';
const DB_PASS = '';

/**
 * Devuelve una única instancia de PDO (conexión compartida).
 */
function conectar(): PDO
{
    static $pdo = null;

    if ($pdo === null) {
        try {
            $pdo = new PDO(
                'mysql:host=' . DB_HOST . ';port=' . DB_PORT . ';dbname=' . DB_NAME . ';charset=utf8mb4',
                DB_USER,
                DB_PASS,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]
            );
        } catch (PDOException $e) {
            responder(['error' => 'Error de conexión a la base de datos'], 500);
            exit;
        }
    }

    return $pdo;
}

/**
 * Envía una respuesta JSON con el código HTTP indicado.
 */
function responder(array $datos, int $codigo = 200): void
{
    http_response_code($codigo);
    echo json_encode($datos, JSON_UNESCAPED_UNICODE);
    exit;
}