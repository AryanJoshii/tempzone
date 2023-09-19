<?php
require_once('database.php'); 
class User
{
    private $database;
    private $connection;
    public function __construct()
    { 
        $this->database = new Database();
        $this->connection = $this->database->getConnection();
    }

    public function getUsersField($field)
    {
        $sql = "SELECT $field FROM " . Database::USER_TABLE;
        return $this->select($sql);
    }

    public function getUsersName(){
        
        $sql = "SELECT " . Database::USER_NAME . " FROM " . Database::USER_TABLE;
        return $this->select($sql, Database::USER_NAME);
    }

    public function userLogin($email, $password)
    {
        $passwordHash = md5($password);
        $sql = "SELECT * FROM " . Database::USER_TABLE . " WHERE " . Database::USER_EMAIL . " = '$email' AND " . Database::USER_PASSWORD . " = '$passwordHash'";
        return $this->select($sql);
    }
    public function adminUserLogin($email, $password)
    {
        $passwordHash = md5($password);
        $sql = "SELECT * FROM admin WHERE email = '$email' AND password = '$passwordHash'";
        return $this->select($sql);
    }
    public function encryptToken($data)
    {
        $token = openssl_encrypt($data,"AES-128-ECB","(!@#)(#@!)");
        return $token;
    }
    public function findByField($field, $value,$onlyExe = 0)
    {
        $escapedValue = $this->connection->real_escape_string($value);
        $sql = "SELECT * FROM " . Database::USER_TABLE . " WHERE $field = '$escapedValue'";
        if($onlyExe){
            return $this->connection->query($sql);
        }
        return $this->select($sql);
    }

    public function createUser($values){
        $values = array_map(function($key, $value) {
            if (empty($value)) {
                return 'NULL';
            } elseif ($key === Database::USER_PASSWORD) {
                return "'".md5($value)."'";
            } else {
                return "'".$value."'";
            }
        }, array_keys($values), $values);
    
        $placeholders = implode(',', $values);
        $sql = "INSERT INTO " . Database::USER_TABLE . " VALUES (NULL, $placeholders, NOW(), NOW())";
    
        return $this->executeStatement($sql);
    }
    

    private function select($query, $field = null)
    {
        $result = $this->connection->query($query);

        if ($result === false) {
            die("Query failed: " . $this->connection->error);
        }

        $rows = [];

        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }

        $result->free();

        if ($field !== null) {
            return array_column($rows, $field);
        } else {
            return $rows;
        }
    }
    public function verifyToken($token){
        $decryptedData = $this->database->decryptToken($token);
        $user_id = $decryptedData[0];
        $user = $this->findByField("user_id",$user_id,1);
        if($user->mysqli_num_rows()){
            $response = $user->fetch_assoc();
        }else{
            $response = 0;
        }
        return $user;
    }
    public function countTableRows() {
        $sql = "SELECT COUNT(*) AS row_count FROM ".Database::USER_TABLE;
        $result = $this->connection->query($sql);
        $data = $result->fetch_assoc()["row_count"];
        return $data;
    }
    private function executeStatement($query)
    {
        $result = $this->connection->query($query);

        if ($result === false) {
            die("Query failed: " . $this->connection->error);
        }

        return $result;
    }
}
?>
