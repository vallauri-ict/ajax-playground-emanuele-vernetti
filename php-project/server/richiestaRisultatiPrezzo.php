<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");

    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        // 1. Controllo parametri
        if(!isset($_POST["type"]))
        {
            http_response_code(400);
            die("parametro mancante: type");
        }
        if(!isset($_POST["min"]))
        {
            http_response_code(400);
            die("parametro mancante: min");
        }
        if(!isset($_POST["max"]))
        {
            http_response_code(400);
            die("parametro mancante: max");
        }

        // 2. Connessione
        $con = _connection("emanuelevernetti_progettophp");
        $type = $con->real_escape_string($_POST["type"]);
        $min=(int)$con->real_escape_string($_POST["min"]);
        $max=(int)$con->real_escape_string($_POST["max"]);

        // 3. Query
        $sql = "SELECT * FROM $type WHERE Prezzo BETWEEN $min AND $max ORDER BY Prezzo";
        $data= _eseguiQuery($con, $sql);
        $data=json_encode($data);
        echo($data);

        // 4. Close
        $con->close();
    }

?>