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
    $registeredUsersEmail =  $database->getUsersField("user_email");
    $usersEmailAddress = [];
    foreach ($registeredUsersEmail as $key => $value) {
        $usersEmailAddress[] = $value["user_email"];
    }
    switch (true) {
        case in_array($email,$usersEmailAddress):
            $data = [ 'status' => 303, 'data' => json_encode(array($email,$password)) ,'msg' => "Account already exists on this email!",'error' => 1 ];
            http_response_code(303);
            break;
        case in_array($username,$registeredUsers):
            $data = [ 'status' => 303, 'data' => json_encode(array($email,$password)) ,'msg' => "Username Is Exist Try another one",'error' => 1 ];
            http_response_code(303);
            break;
        case !in_array($username,$registeredUsers) && !in_array($email,$usersEmailAddress):
            $array = ["username" => $username, "email" => $email, "password" => $password,NULL];
            $response = $database->createUser($array);
            $recentkyRegisteredUsers = $database->findByField("user_name",$username);
            $users_id ;
            $users_name ;
            $count = count($recentkyRegisteredUsers);
            list($usersid, $users_name) = ($count > 0) ? [$recentkyRegisteredUsers[0]["user_id"], $recentkyRegisteredUsers[0]["user_name"]] : [null, null];
            $token = $database->encryptToken(json_encode(array($usersid, $users_name)));
            $data = [ 'status' => 200, 'data' => json_encode(array("userInfo" => $recentkyRegisteredUsers[0],"token" => $token ))  ,'msg' => "Registered successful.",'error' => 0 ];
            http_response_code(200);
        break;
                
        }
    echo json_encode($data);
}