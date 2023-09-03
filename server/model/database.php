<?php
class Database
{
    private $connection;

    const USER_ID = "user_id";
    const USER_NAME = "user_name";
    const USER_EMAIL = "user_email";
    const USER_PASSWORD = "password";
    const USER_TABLE = "registered_users";
    const TEMPLATE_TABLE = "user_templates";

    public function __construct()
    {
        $host = "localhost";
        $username = "bhagyesh";
        $password = "Bhagyesh@123";
        $database = "TempZone";

        $this->connection = new mysqli($host, $username, $password, $database);

        if ($this->connection->connect_error) {
            die("Connection failed: " . $this->connection->connect_error);
        }
    }
    public function getConnection()
    {
        return $this->connection;
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
