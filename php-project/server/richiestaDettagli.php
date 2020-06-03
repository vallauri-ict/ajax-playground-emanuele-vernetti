<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");

    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        // 1. Controllo parametri
        if(!isset($_POST["id"]))
        {
            http_response_code(400);
            die("parametro mancante: id");
        }
        if(!isset($_POST["table"]))
        {
            http_response_code(400);
            die("parametro mancante: table");
        }

        // 2. Connessione
        $con = _connection("emanuelevernetti_progettophp");
        $id = $con->real_escape_string($_POST["id"]);
        $table=$con->real_escape_string($_POST["table"]);

        // 3. Query
        $sql = "SELECT * FROM $table WHERE Id=$id;";
        $data= _eseguiQuery($con, $sql);
        $data=json_encode($data);
        echo($data);

        // 4. Close
        $con->close();
    }
?>