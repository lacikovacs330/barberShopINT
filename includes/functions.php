<?php

require "config.php";
require "db_config.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$conn = connectDatabase($dsn, $pdoOptions);

function sendMail($token, $email,$subject)
{

    require 'vendor/autoload.php';
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'mail.misura.stud.vts.su.ac.rs';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'misura';                     //SMTP username
        $mail->Password   = 'CsSClJ8k4cDYlIr';                               //SMTP password
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`


        //Recipients
        $mail->setFrom('misura@misura.stud.vts.su.ac.rs', 'Misura');
        $mail->addAddress($email, 'User');     //Add a recipient

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = $subject;
        $mail->Body    = "Erősisd meg a regisztrációt" . "<a href='https://misura.stud.vts.su.ac.rs/barberShop/active.php?token=$token'> <b>Megerősités</b></a>";

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}

function redirection($url)
{
    header("Location:$url");
    exit();
}

function ResetPassword($email, $subject)
{

    require 'vendor/autoload.php';
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'mail.misura.stud.vts.su.ac.rs';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'misura';                     //SMTP username
        $mail->Password   = 'CsSClJ8k4cDYlIr';                               //SMTP password
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`


        //Recipients
        $mail->setFrom('misura@misura.stud.vts.su.ac.rs', 'Misura');
        $mail->addAddress($email, 'User');     //Add a recipient

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = $subject;
        $mail->Body    = "Jelszó váltáshoz kattints a linkre !" . "<a href='https://misura.stud.vts.su.ac.rs/barberShop/reset_password.php'> <b>Jelszó váltás</b></a>";

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}