<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "../../model/user.php";

$user = new User();
header('Content-type: application/json');

$request = json_decode(file_get_contents('php://input'), true);

if(isset($request["token"])){
    $registeredUsers = $user->verifyToken($request["token"]);
    if(count($registeredUsers) > 0){     
        $data = [ 'status' => 202, 'data' => $user->encryptToken(json_encode(array($email,$password))) ,'token' => $token, 'msg' => "Login successful.",'error' => 0 ];
        http_response_code(202);
    }else{
        $data = [ 'status' => 404, 'data' => json_encode(array($email,$password)) ,'msg' => "Login failed: Incorrect email or password. Please try again.",'error' => 0 ];
        http_response_code(404);
    }
    echo json_encode($data);
}
