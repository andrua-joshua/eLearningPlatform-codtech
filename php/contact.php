<?php
require("connect.php");

$create_table = "CREATE TABLE IF NOT EXISTS `Students_Bio` (`ID` INT(25) AUTO_INCREMENT NOT NULL PRIMARY KEY, `FIRST NAME` VARCHAR(50) NOT NULL, 
                `LAST NAME` VARCHAR(50) NOT NULL, `EMAIL` VARCHAR(255) NOT NULL, `PASSWORD` VARCHAR(255) NOT NULL)";

if (mysqli_query($conn, $create_table)) {}
else {
    echo "<br>Table creation error".mysqli_erro();
}

if (isset($_POST["signup"])) {
    $firstName = $_POST["firstName"];
    $lastName = $_POST["lastName"];
    $set_password = $_POST["set_password"];
    $email = $_POST["email"];

    $enc_password = password_hash($set_password, PASSWORD_DEFAULT);

    $ins_data = $conn->prepare("INSERT INTO `Students_Bio` (`FIRST NAME`, `LAST NAME`, `EMAIL`, `PASSWORD`) VALUES (?, ?, ?, ?)");

    $ins_data->bind_param("ssss", $firstName, $lastName, $email, $enc_password);
    $ins_data->execute();    

    if (!$ins_data) {
        echo "<br>Record not saved!".mysqli_error($conn);
    }
    else {
        echo "<br>Record saved";
    }

}
?>