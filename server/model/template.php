<?php
class Template
{
    public function __construct()
    {
        $this->database = new Database();
        $this->connection = $this->database->getConnection();
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
