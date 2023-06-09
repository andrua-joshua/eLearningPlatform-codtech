<?php
$server = "localhost";
$username = "root";
$password = "";
$database = "Digital Schools";
// Thegreat@2022

$connect = mysqli_connect($server, $username, $password);

if (mysqli_connect_errno()) {
    die("Server Connection Error!".mysqli_connect_error());
}

$sql = "CREATE DATABASE IF NOT EXISTS `Digital Schools`";

if (mysqli_query($connect, $sql)) {}
else {
    echo "Database creation failed".mysqli_error($connect);
}

$conn = mysqli_connect($server, $username, $password, $database);

if (mysqli_connect_errno()) {
    die("Database conenction error".mysqli_connect_error());
}
?>
