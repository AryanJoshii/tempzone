<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "../../../model/user.php";

$user = new User();
header('Content-type: application/json');

$request = json_decode(file_get_contents('php://input'), true);

if(isset($request["password"]) && isset($request["email"])){
    $email = $request["email"];
    $password = $request["password"];
    $adminUser = $user->adminUserLogin($email,$password);
    if(count($adminUser) > 0){
        if(isset($adminUser[0]["admin_id"]) && isset($adminUser[0]["username"])){
           $token = $user->encryptToken(json_encode(array($adminUser[0]["admin_id"],$adminUser[0]["username"])));
        }
        $data = [ 'status' => 202, 'data' => array("adminInfo" => $adminUser[0], "token" => $token) , 'msg' => "Login successful.",'error' => 0 ];
        http_response_code(202);
    }else{
        $data = [ 'status' => 404, 'data' => array($email,$password) ,'msg' => "Login failed: Incorrect email or password. Please try again.",'error' => 0 ];
        http_response_code(404);
    }
    echo json_encode($data);
}

