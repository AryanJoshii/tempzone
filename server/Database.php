<?php
class Database
{
    protected $connection = null;
    const USER_ID = "user_id";
    const USER_NAME = "user_name";
    const USER_EMAIL = "user_email";
    const USER_PASSWORD = "password";

    public function __construct()
    {
        $host_name = "localhost";
        $mysql_username = "bhagyesh";
        $mysql_password = "Bhagyesh@123";
        $db_name = "TempZone";
        try {
            $this->connection = new mysqli($host_name , $mysql_username , $mysql_password ,$db_name);
            if (mysqli_connect_errno()) {
                throw new Exception("Could not connect to database.");   
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());   
        }			
    }
    public function getUsersField($filed)    
    {
        $stringsFileds = implode(",", $filed);
        $sql = "SELECT ".$stringsFileds." FROM registered_users";
        return $this->select($sql);
    }
    public function getUsersName()
    {
        $users = $this->select("SELECT user_name FROM registered_users","user_name"); 
        return $users;
    }
    public function userLogin($email,$password)
    {
        $password = md5($password);
        $sql = "SELECT * FROM registered_users WHERE ".self::USER_EMAIL."= '".$email."' && ".self::USER_PASSWORD."= '".$password."'";
        $users = $this->select($sql); 
        return $users;
    }
    public function createUser($values)
    {
        $stringsValue = array("NULL");
        foreach ($values as $key => $value) {
            if($key == "password"){
                $value = md5($value);
                $stringsValue[] = '"' .$value. '"';
            }else{
                $stringsValue[] = '"' .$value. '"';
            }
        }
        $stringsValues = implode(",", $stringsValue);
        $sql = 'INSERT INTO registered_users VALUES ('.$stringsValues.',now(),now())';
        $users = $this->executeStatement($sql); 
        return $users;
    }
    public function select($query = "" , $field = "",$params = [])
    {
        try {
            $stmt = $this->executeStatement( $query , $params );
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);				
            $stmt->close();
            $singleArray = array();
            if(strlen($field) > 0){
                foreach ($result as $subArray) {
                    $singleArray[] = "'".$subArray[$field]."'";
                }
            }else{
                foreach ($result as $subArray) {
                    foreach ($subArray as $key => $value) {
                        $singleArray[] = "'".$value."'";
                    }
                }
            }
            return $singleArray;
        } catch(Exception $e) {
            throw New Exception( $e->getMessage() );
        }
        return false;
    }
    private function executeStatement($query = "" , $params = [])
    {
        try {
            $stmt = $this->connection->prepare( $query );
            if($stmt === false) {
                throw New Exception("Unable to do prepared statement: " . $query);
            }
            if( $params ) {
                $stmt->bind_param($params[0], $params[1]);
            }
            $stmt->execute();
            return $stmt;
        } catch(Exception $e) {
            throw New Exception( $e->getMessage() );
        }	
    }
}
?>
