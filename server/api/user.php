<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "../Database.php";

$database = new Database();
header('Content-type: application/json');

if(isset($_GET["exist"])){
    if(isset($_POST) && !empty($_POST)){
        $email = $_POST["email"];
        $username = $_POST["username"];
        $password = $_POST["password"];    
        $registeredUsers =  $database->getUsersName();
        if(!in_array("'".$username."'",$registeredUsers)){
            $array = [$username, $email, $password];
            $response = $database->createUser($array);
            $data = [ 'response' => 'not-exist', 'error' => 0 ,'user-created' => 1 ];
        }else{
            $data = [ 'response' => 'exist', 'error' => 1 ];
        }
        echo json_encode($data);
    }
}
if(isset($_POST["password"]) && isset($_POST["email"]) && isset($_GET["login"])){
    $email = $_POST["email"];
    $password = $_POST["password"];
    $registeredUsers = $database->userLogin($email,$password);
    if(count($registeredUsers) > 0){
        $data = [ 'verified' => 'true', 'error' => 0 ];
    }else{
        $data = [ 'verified' => 'false', 'error' => 1 ];
    }
    echo json_encode($data);
}