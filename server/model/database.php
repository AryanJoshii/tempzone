<?php
class Database
{
    private $connection;
    private $host;
    private $username;
    private $password;
    private $database;

    const USER_ID = "user_id";
    const USER_NAME = "user_name";
    const USER_EMAIL = "user_email";
    const USER_PASSWORD = "password";
    const USER_TABLE = "registered_users";
    const TEMPLATE_TABLE = "user_templates";
    const CATEGORY_TABLE = "category";

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
    public function executeStatement($query)
    {
        $result = $this->connection->query($query);

        if ($result === false) {
            die("Query failed: " . $this->connection->error);
        }
        return $result;
    }
    public function onlyExe($query)
    {
        return  $this->connection->query($query);
    }
    public function encryptToken($data)
    {
        $token = openssl_encrypt($data,"AES-128-ECB","(!@#)(#@!)");
        return $token;
    }
    public function decryptToken($token)
    {
        $decrypted_token = openssl_decrypt($token,"AES-128-ECB","(!@#)(#@!)");
        return json_decode($decrypted_token);
    }
    public function select($query, $field = null)
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
}
?>
