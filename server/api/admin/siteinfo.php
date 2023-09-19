<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "../../model/template.php";
require_once "../../model/user.php";

$template = new Template();
$user = new User();

header('Content-type: application/json');

$request = json_decode(file_get_contents('php://input'), true);
$headers = getallheaders();

if(array_key_exists("Authorization", $headers) && isset($request["template_category"])){
    $templates_count = (int)$template->countTableRows();
    $categories_count = (int)$template->countCategoryTableRows();
    $users_count = (int)$user->countTableRows();

    $data = array(
        "templates" => $templates_count,
        "users" => $users_count,
        "categories" => $categories_count
    );

    $data = [ 'status' => 200, 'data' => $data ,'msg' => "Site info fetched successfully.",'error' => 0 ];
    http_response_code(200);
    // $template_data = $database->createTemplate($headers["Authorization"],$request["template_category"]);
    // if($template_data){
    // }else{
    //     $data = ['status' => 404, 'data' => json_decode("{}") ,'msg' => "Error Occurce In Create Template. Please try again.",'error' => 0 ];
    //     http_response_code(404);
    // }
    echo json_encode($data);
} else {
    $data = [ 'status' => 401, 'data' => json_decode("{}"),'msg' => "Unauthorized",'error' => "Unauthorized" ];
    http_response_code(401);
    echo json_encode($data);
}
