<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");
	
	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		// 1. Controllo parametri
		if(!isset($_POST["username"]))
		{
			http_response_code(400);
			die("Parametro mancante: username");
		}
		if(!isset($_POST["oldPw"]))
		{
			http_response_code(400);
			die("Parametro mancante: oldPw");
		}
        if(!isset($_POST["newPw"]))
        {
            http_response_code(400);
            die("Parametro mancante: newPw");
        }

		// 2. Connessione
		$con = _connection("emanuelevernetti_progettophp");
		$user = $con->real_escape_string($_POST["username"]);
		$oldPw = $con->real_escape_string($_POST["oldPw"]);
        $newPw = $con->real_escape_string($_POST["newPw"]);
		
		// 3. Query
        $sql = "SELECT * FROM utenti WHERE Username='$user' AND Password='$oldPw'";
        $data= _eseguiQuery($con, $sql);
        if(count($data)!=0)
        {
            $sql = "UPDATE utenti SET Password='$newPw' WHERE Username='$user'";
            $data= _eseguiQuery($con, $sql);
            $data=json_encode($data);
            echo($data);
        }
        else
        {
            $data=json_encode(array("ris"=>"nok"));
            echo($data);
        }

		// 4. Close
		$con->close();		
	}
?>