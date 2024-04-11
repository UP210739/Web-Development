<?php

include "./api/Connection.php";
$idtarea = $_GET['selectedTaskId'];

try{
    $SQL = "select u.id , u.firstname, t.id, t.title, t.idUser
from user u inner join task t
on  u.id = t.idUser where t.id = :idTask;";

    $state = $conn->prepare($SQL);
    $state->bindParam(':idTask', $idtarea);
    $state->execute();


    $json = [];

    while($row = $state->fetch(PDO::FETCH_ASSOC)){
        array_push($json, [
        "iduser" => $row['idUser'],
        "name" => $row['firstname'],
        "idtask" => $row['id'],
        "title" => $row['title'] 
        ]);

    }

    echo json_encode($json);
}catch(PDOException $e){
    die($e->getMessage());
}