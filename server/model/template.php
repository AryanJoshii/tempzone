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
    public function createTemplate($token,$category){
        $decryptedData = $this->database->decryptToken($token);
        $user_id = $decryptedData[0];
        $user_name = $decryptedData[1];
        $sql = "INSERT INTO " . Database::TEMPLATE_TABLE . " VALUES (NULL, NULL,NULL,".$category.", ".$user_id.", NOW(), NOW())"; 
        $result = $this->connection->query($sql);   
        $newlyTemplateId = mysqli_insert_id($this->connection);
        $template_data = $this->findByField("template_id",$newlyTemplateId);
        return $template_data;
    }
    public function updateTemplate($token,$template_data){
        $decryptedData = $this->database->decryptToken($token);
        $user_id = $decryptedData[0];
        $sql = "UPDATE ".Database::TEMPLATE_TABLE." SET `template_name` = '".$template_data["template_name"]."', `template_tags` = '".json_encode($template_data["template_tags"])."', `template_category` = '".$template_data["template_category"]."',  `template_owner` = ".$user_id." WHERE `template_id` = ".$template_data["template_id"];
        $result = $this->connection->query($sql);
        $template = $this->findByField("template_id",$template_data["template_id"]);
        return $template;
    }
    public function getTemplates($token){
        $decryptedData = $this->database->decryptToken($token);
        $user_id = $decryptedData[0];
        $sql = "SELECT * FROM " . Database::TEMPLATE_TABLE ;
        return $this->database->select($sql);
    }
    public function deleteTemplateByadmin($token,$template_id){
        $decryptedData = $this->database->decryptToken($token);
        $user_id = $decryptedData[0];
        $template = $this->findByField("template_id",$template_id);
        $sql = "DELETE FROM ".Database::TEMPLATE_TABLE." WHERE template_id = ".$template_id;
        $response = $this->database->onlyExe($sql);
        if($response){
            return $template;
        }
        return false;
    }
    public function findByField($field, $value){
        $escapedValue = $this->connection->real_escape_string($value);
        $sql = "SELECT * FROM " . Database::TEMPLATE_TABLE . " WHERE $field = '$escapedValue'";
        return $this->database->select($sql);
    }
    public function copyTemplateWithNewOwner($token, $template_id){
        $newlyTemplateId = null;
        $decryptedData = $this->database->decryptToken($token);
        $user_id = $decryptedData[0];
        $sql = "INSERT INTO ".Database::TEMPLATE_TABLE." (template_name, template_tags, template_category, template_owner, created_at, updated_at) SELECT template_name, template_tags, template_category, ".$user_id." AS new_owner_id, NOW() AS created_at, NOW() AS updated_at FROM ".Database::TEMPLATE_TABLE." WHERE template_id = ".$template_id;
        $response = $this->database->onlyExe($sql);
        $newlyTemplateId = mysqli_insert_id($this->connection);
        $template = $this->findByField("template_id",$newlyTemplateId);
        return $template;
    }
    public function deleteTemplate($token, $template_id){
        $decryptedData = $this->database->decryptToken($token);
        $user_id = $decryptedData[0];
        $template = $this->findByField("template_id",$template_id);
        $sql = "DELETE FROM ".Database::TEMPLATE_TABLE." WHERE template_id = ".$template_id." AND template_owner =".$user_id;
        $response = $this->database->onlyExe($sql);
        if($response){
            return $template;
        }
        return false;
    }
    public function fetchTemplate($token){
        $decryptedData = $this->database->decryptToken($token);
        $user_id = $decryptedData[0];
        $sql ="SELECT * FROM ".Database::TEMPLATE_TABLE." WHERE `template_id` =".$template_id;
        $result = $this->connection->query($sql);
        $records = [];
        while ($row = $result->fetch_assoc()) {
            $records[] = $row;
        }
        return $records;
    }
    public function fetchUserTemplate($token){
        $decryptedData = $this->database->decryptToken($token);
        $user_id = $decryptedData[0];
        $sql ="SELECT * FROM ".Database::TEMPLATE_TABLE." WHERE `template_owner` =".$user_id;
        $result = $this->connection->query($sql);
        $records = [];
        while ($row = $result->fetch_assoc()) {
            $records[] = $row;
        }
        return $records;
    }
    public function fetchAllTemplate($token){
        $decryptedData = $this->database->decryptToken($token);
        $user_id = $decryptedData[0];
        $sql ="SELECT * FROM ".Database::TEMPLATE_TABLE." WHERE `template_owner` <>".$user_id;
        $result = $this->connection->query($sql);
        $records = [];
        while ($row = $result->fetch_assoc()) {
            $records[] = $row;
        }
        return $records;
    }
}
?>
