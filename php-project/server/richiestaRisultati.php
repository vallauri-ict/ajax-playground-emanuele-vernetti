<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");

    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        // 1. controllo parametri
        if(!isset($_POST["type"]))
        {
            http_response_code(400);
            die("parametro mancante: type");
        }

        // 2. connessione
        $con = _connection("emanuelevernetti_progettophp");
        $type = $con->real_escape_string($_POST["type"]);

        // 3. query
        $sql = "SELECT * FROM $type ORDER BY Prezzo";
        $data= _eseguiQuery($con, $sql);
        $data=json_encode($data);
        echo($data);

        // 4. close
        $con->close();
    }
?>