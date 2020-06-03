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
		if(!isset($_POST["password"]))
		{
			http_response_code(400);
			die("Parametro mancante: password");
		}

		// 2. Connessione
		$con = _connection("emanuelevernetti_progettophp");
		$user = $con->real_escape_string($_POST["username"]);
		$password = $con->real_escape_string($_POST["password"]);
		
		// 3. Query
		$sql = "SELECT * FROM utenti where Username='$user';";
		$data= _eseguiQuery($con, $sql);
		if(count($data)==0)
		{
		    http_response_code(401);
			die("Utente non registrato");
		}
		else if($data[0]["Password"]!=md5($password))
		{
            http_response_code(401);
            die("Utente non registrato");
		}
		else
        {
            //4. Creazione della sessione
            session_start();
            $_SESSION["Id"]=$data[0]["Id"];
            $_SESSION["scadenza"]=time()+SCADENZA;
            setcookie(session_name(),session_id(),(time()+SCADENZA),"/");

            $data=json_encode($data);
            echo($data);
        }

		// 5. Close
		$con->close();		
	}
?>