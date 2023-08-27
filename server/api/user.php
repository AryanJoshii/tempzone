<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "../Database.php";

$objFeedController = new Database();

if(isset($_POST) && !empty($_POST)){
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $registeredUsers =  $objFeedController->getUsersName();
    header('Content-type: application/json');
    if(!in_array("'".$username."'",$registeredUsers)){
        $array = [$username, $email, $password];
        $response = $objFeedController->createUser($array);
        $data = [ 'response' => 'not-exist', 'error' => 0 ,'user-created' => 1 ];
    }else{
        $data = [ 'response' => 'exist', 'error' => 1 ];
    }
    echo json_encode($data);
}