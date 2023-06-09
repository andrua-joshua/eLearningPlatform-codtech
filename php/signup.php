<?php
require("connect.php");

$create_table = "CREATE TABLE IF NOT EXISTS `Students_Bio` (`ID` INT(25) AUTO_INCREMENT NOT NULL PRIMARY KEY, `FIRST NAME` VARCHAR(50) NOT NULL, 
                `LAST NAME` VARCHAR(50) NOT NULL, `EMAIL` VARCHAR(255) NOT NULL, `PASSWORD` VARCHAR(255) NOT NULL)";

if (mysqli_query($conn, $create_table)) {}
else {
    echo "Table creation error".mysqli_erro();
}

if (isset($_POST["signup"])) {
    $firstName = $_POST["firstName"];
    $lastName = $_POST["lastName"];
    $set_password = $_POST["set_password"];
    $confirm_password = $_POST["confirm_password"];
    $email = $_POST["email"];

    // checking if input fields are empty
    if (empty($firstName) || empty($lastName) || empty($email) || empty($set_password) || empty($confirm_password)) {
        echo "Fill in Form input fields";
    }
    else {
        // validate password
        if (!preg_match("/^[a-z]{2, 23}\w[^_]$/i", $set_password) && strlen($set_password)<8) {
            echo "Weak Password";
        }
        elseif ($set_password !== $confirm_password) {
            echo "Passwords don't match";
        }
        else {
            // validate email
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                echo "Invalid Email";
            }
            else {
                // check if email is already signed up
                $sql = $conn->prepare("SELECT * FROM `Students_Bio` WHERE `EMAIL`=?");
            
                if (!$sql) {
                    die(mysqli_error($conn));
                }
                else {
                    $sql->bind_param("s", $email);
                    $sql->execute();
                    $sql->store_result();

                    if ($sql->num_rows() > 0) {
                        echo "This Email is already registered";
                    }
                    else {
                        $enc_password = password_hash($set_password, PASSWORD_DEFAULT);

                        $ins_data = $conn->prepare("INSERT INTO `Students_Bio` (`FIRST NAME`, `LAST NAME`, `EMAIL`, `PASSWORD`) VALUES (?, ?, ?, ?)");
            
                        $ins_data->bind_param("ssss", $firstName, $lastName, $email, $enc_password);
                        $ins_data->execute();    
            
                        if (!$ins_data) {
                            echo "signupError".mysqli_error($conn);
                        }
                        else {
                            echo "signupSuccess";
                        }
                    }
                }
            }
        }
    }
}
?>
