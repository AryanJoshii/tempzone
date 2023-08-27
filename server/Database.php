<?php
class Database
{
    protected $connection = null;
    
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
    public function getUsers()
    {
       return $this->select("SELECT * FROM registered_users");
    }
    public function getUsersName()
    {
        $users = $this->select("SELECT username FROM registered_users"); 
        return $users;
    }
    public function createUser($values)
    {
        $stringsValue = array("NULL");
        foreach ($values as $value) {
            $stringsValue[] = '"' .$value. '"';
        }
        $stringsValues = implode(",", $stringsValue);
        $sql = 'INSERT INTO registered_users VALUES ('.$stringsValues.')';
        $users = $this->executeStatement($sql); 
        return $users;
    }
    public function select($query = "" , $params = [])
    {
        try {
            $stmt = $this->executeStatement( $query , $params );
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);				
            $stmt->close();
            $singleArray = array();
            foreach ($result as $subArray) {
                $singleArray[] = "'".$subArray['username']."'";
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
