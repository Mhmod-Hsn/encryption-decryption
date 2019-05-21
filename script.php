<?php

    $dsn =  'mysql:host=localhost;
             dbname=security;';

    $user = 'root';
    $pass='';

    $options = array (
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    );

    try{
        $con = new PDO ( $dsn , $user , $pass , $options);
        $con -> setAttribute(PDO::ATTR_ERRMODE , PDO::ERRMODE_EXCEPTION);
        echo 'you are connected , welcome to database';
    }
    catch (PDOException $e){
        echo 'failed to connect ' . $e->getMessage();
    }




/*mysqli_connect("localhost" , "root" , "") or die (mysqli_error('index.html'));
mysqli_select_db("securityproject") or die();

$input_text = $_POST['input_text'];
$input_type = $_POST['input_type'];
$algorithm = $_POST['algorithm'];
$key = $_POST['used_key'];
$output_text = $_POST['result_text'];


mysqli_query('')or die (mysql_error();*/


?>