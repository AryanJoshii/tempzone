<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "../../model/user.php";

$user = new User();
header('Content-type: application/json');

$request = json_decode(file_get_contents('php://input'), true);


if(isset($request["token"])){
    $userInfo = $user->verifyToken($request["token"]);
    if($userInfo){     
        $data = [ 'status' => 202, 'data' => $user->encryptToken(json_encode(array($userInfo,$request["token"]))) , 'msg' => "user account is exist.",'error' => 0 ];
        http_response_code(202);
    }else{
        $data = [ 'status' => 404, 'data' => json_encode(array($request["token"])) ,'msg' => "user account is not exist.",'error' => 1 ];
        http_response_code(404);
    }
    echo json_encode($data);
}
