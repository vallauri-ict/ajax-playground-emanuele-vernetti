<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");

    _checkSession("Id");

    // 1. Connessione
    $con = _connection("emanuelevernetti_progettophp");

    // 2. Lettura parametri
    $id=$_SESSION["Id"];

    // 3. Query
    $sql = "SELECT * FROM utenti where Id=$id;";
    $data= _eseguiQuery($con, $sql);
    $data=json_encode($data);
    echo($data);

    // 4. Close
    $con->close();
?>