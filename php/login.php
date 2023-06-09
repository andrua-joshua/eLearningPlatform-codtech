<?php
require("connect.php");

if (isset($_GET["login"])) {
    $login_email = $_GET["login_email"];
    $login_password = $_GET["login_password"];

    //check empty fields
    if (empty($login_email) && empty($login_password)) {
        echo "emptyFields";
    }
    elseif (empty($login_email)) {
        echo "emptyEmail";
    }
    elseif (empty($login_password)) {
        echo "emptyPassword";
    }
    else {
            // checking email in database and initiating login if data matches
        $stmt = $conn->prepare("SELECT `PASSWORD` FROM `Students_Bio` WHERE `EMAIL` = ? ");

        if (!$stmt) {
        echo mysqli_error($conn);
        }
        else {
            $stmt->bind_param("s", $login_email);
            $stmt->execute();
            $stmt->store_result();

            if ($stmt->num_rows() > 0) {
                $stmt->bind_result($set_password);
                $stmt->fetch();

                if  (password_verify($login_password, $set_password)) {
                    echo "success";
                }

                else {
                    echo "invalidPassword";
                }
            }
            else {
                echo "emailNotFound";
            }
        }
    } 
}

?>