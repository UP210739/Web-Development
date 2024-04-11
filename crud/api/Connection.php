<?php

$host = 'localhost';
$dbName = 'todoApp';
$user = "root";
$password = "lenovo123";
$protocol = "mysql:host={$host};dbname={$dbName}";
try {
  $conn = new PDO($protocol, $user, $password);
} catch (PDOException $e) {
  die($e->getMessage());
}