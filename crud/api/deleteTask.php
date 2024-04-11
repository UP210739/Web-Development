<?php

include "./api/Connection.php";
$idtarea = $_POST['taskId'];

try {
        $eliminar = $conn->prepare( "delete from task where id = ?" );
    $eliminar->execute([$idtarea]);
    


} catch (PDOException $e) {
    echo json_encode();
}