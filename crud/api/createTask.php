<?php

include "./api/Connection.php";
$titulo = $_POST['title'];
$idusuairo = $_POST['users'];


try {
$agregar = $conn->prepare("insert into task (idUser, title, completed) values (?, ?, 0)");
$agregar->execute([$idusuairo, $titulo]);
} catch (PDOException $e) {
    die($e->getMessage());
}