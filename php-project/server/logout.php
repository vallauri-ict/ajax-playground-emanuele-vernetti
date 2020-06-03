<?php
    session_start();
    session_unset();
    session_destroy();

    setcookie(session_name(),"",-1,"/");

    $data=array("ok"=>"true");
    $data=json_encode($data);
    echo($data);
?>