<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");
	
	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		// 1. controllo parametri
        if(!isset($_POST["nome"]))
        {
            http_response_code(400);
            die("parametro mancante: nome");
        }
        if(!isset($_POST["cognome"]))
        {
            http_response_code(400);
            die("parametro mancante: cognome");
        }
        if(!isset($_POST["mail"]))
        {
            http_response_code(400);
            die("parametro mancante: mail");
        }
        if(!isset($_POST["telefono"]))
        {
            http_response_code(400);
            die("parametro mancante: telefono");
        }
		if(!isset($_POST["username"]))
		{
			http_response_code(400);
			die("parametro mancante: username");
		}
		if(!isset($_POST["password"]))
		{
			http_response_code(400);
			die("parametro mancante: password");
		}

		// 2. connessione
		$con = _connection("emanuelevernetti_progettophp");

		$nome=$con->real_escape_string($_POST["nome"]);
        $cognome=$con->real_escape_string($_POST["cognome"]);
        $mail=$con->real_escape_string($_POST["mail"]);
        $telefono=$con->real_escape_string($_POST["telefono"]);
		$user = $con->real_escape_string($_POST["username"]);
		$password = $con->real_escape_string($_POST["password"]);
		
		// 3. query
		$sql = "SELECT * FROM utenti where Username='$user';";
		$data= _eseguiQuery($con, $sql);
		if(count($data)==0)
		{
			$sql = "INSERT INTO utenti (Nome, Cognome, Mail, Telefono, Username, Password) VALUES ('$nome','$cognome','$mail','$telefono','$user','$password');";
			_eseguiQuery($con,$sql);
			echo(json_encode(array("ris"=>"ok")));
		}
		else
		{
			http_response_code(401);
			die("Username già esistente");
		}

		// 4. close
		$con->close();		
	}
?>