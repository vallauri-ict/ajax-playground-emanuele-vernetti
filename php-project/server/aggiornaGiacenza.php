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
        if(!isset($_POST["modello"]))
        {
            http_response_code(400);
            die("parametro mancante: modello");
        }
        if(!isset($_POST["amount"]))
        {
            http_response_code(400);
            die("parametro mancante: amount");
        }


        // 2. connessione
        $con = _connection("emanuelevernetti_progettophp");
        $table = $con->real_escape_string($_POST["type"]);
        $modello = $con->real_escape_string($_POST["modello"]);
        $amount=$con->real_escape_string($_POST["amount"]);

        // 3. query
        $sql = "UPDATE $table SET Giacenza=Giacenza-$amount WHERE Modello='$modello'";
        $data= _eseguiQuery($con, $sql);
        $data=json_encode($data);
        echo($data);

        // 4. close
        $con->close();
    }
?>