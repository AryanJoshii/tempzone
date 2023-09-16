<?php
require_once('database.php'); 

class Template
{
    private $database; 
    private $connection;
    
    public function __construct()
    {
        $this->database = new Database();
        $this->connection = $this->database->getConnection();
    }
    public function createTemplate($token){
        $decryptedData = $this->decryptToken($token);
        $user_id = $decryptedData[0];
        $user_name = $decryptedData[1];
        $sql = "INSERT INTO " . Database::TEMPLATE_TABLE . " VALUES (NULL, NULL,NULL,NULL, ".$user_id.", NOW(), NOW())"; 
        $result = $this->connection->query($sql);   
        $newlyTemplate = mysqli_insert_id($this->connection);
        return $newlyTemplate;
    }
    public function updateTemplate($token,$template_data){
        $decryptedData = $this->decryptToken($token);
        // $user_id = $decryptedData[0];
        $sql ="UPDATE ".Database::TEMPLATE_TABLE." SET `template_name` = '".$template_data["template_name"]."', `template_tags` = '".json_encode($template_data["template_tags"])."', `template_category` = '".$template_data["template_category"]."',  `template_owner` = ".$template_data["template_owner"]."  WHERE `template_id` = ".$template_data["template_id"];
        $result = $this->connection->query($sql); 
        return $result;
    }
    public function fetchTemplate($token, $template_id = 0){
        $decryptedData = $this->decryptToken($token);
        $user_id = $decryptedData[0];
        if($template_id){
            $sql ="SELECT * FROM ".Database::TEMPLATE_TABLE." WHERE `template_id` =".$template_id;
        }else{
            $sql ="SELECT * FROM ".Database::TEMPLATE_TABLE; 
        }
        $result = $this->connection->query($sql);
        $records = [];
        while ($row = $result->fetch_assoc()) {
            $records[] = $row;
        }
        return $records;
    }
    public function decryptToken($token)
    {
        $decrypted_token = openssl_decrypt($token,"AES-128-ECB","(!@#)(#@!)");
        return explode(",",$decrypted_token) ;
    }
}
?>
