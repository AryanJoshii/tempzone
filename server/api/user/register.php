<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "../../model/user.php";

$database = new User();
header('Content-type: application/json');

$request = json_decode(file_get_contents('php://input'), true);
if(isset($request) && !empty($request)){
    $email = $request["email"];
    $username = $request["username"];
    $password = $request["password"];    
    $registeredUsers =  $database->getUsersName();
    if(!in_array($username,$registeredUsers)){
        $array = ["username" => $username, "email" => $email, "password" => $password,NULL];
        $response = $database->createUser($array);
        $recentkyRegisteredUsers = $database->findByField("user_name",$username);
        $users_id ;
        $users_name ;
        $count = count($recentkyRegisteredUsers);
        list($usersid, $users_name) = ($count > 0) ? [$recentkyRegisteredUsers[0]["user_id"], $recentkyRegisteredUsers[0]["user_name"]] : [null, null];
        $data = [ 'status' => 200, 'data' => md5(json_encode(array($usersid, $users_name))) ,'msg' => "Registered successful.",'error' => 0 ];
        http_response_code(200);
    }else{
        $data = [ 'status' => 303, 'data' => json_encode(array($email,$password)) ,'msg' => "Username Is Exist Try Anotherone",'error' => 0 ];
        http_response_code(303);
    }
    echo json_encode($data);
}