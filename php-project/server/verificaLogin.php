<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");

    _checkSession("Id");

    // 1. connessione
    $con = _connection("emanuelevernetti_progettophp");

    // 2. lettura parametri
    $id=$_SESSION["Id"];

    // 3. query
    $sql = "SELECT * FROM utenti where Id=$id;";
    $data= _eseguiQuery($con, $sql);
    $data=json_encode($data);
    echo($data);

    // 4. close
    $con->close();
?>