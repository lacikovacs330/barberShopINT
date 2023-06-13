<?php

session_start();

include "includes/config.php";
include "includes/db_config.php";

$conn = connectDatabase($dsn, $pdoOptions);


?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../css/style.css">

</head>
<body>
<nav class="navbar navbar-expand-lg navbar-light" style="background-color:#222227">
    <img src="img/logo.png">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link text-light" href="index.php">Kezdőlap <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-light" href="index.php#introduction">Bemutatkozás</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-light" href="index.php#services">Szolgáltatásaink</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-light" href="index.php#action">Akcióink</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-light" href="salons.php">Fodrász szalonok <span class="sr-only">(current)</span></a>
            </li>
            <?php
            if (isset($_SESSION["id_user"])){
                $stmt = $conn->query("SELECT * FROM users WHERE id_user = '$_SESSION[id_user]' ");
                if ($row = $stmt->fetch()) {
			$id_user = $row["id_user"];
                    $_SESSION["id_user"] = $id_user;

                    if ($row["role"] == "admin") {
                        echo '<li class="nav-item"><a class="nav-link text-light" href="add_salon.php">Tulajdonos add<span class="sr-only">(current)</span></a></li>';
                        echo '<li class="nav-item"><a class="nav-link text-light" href="datatable.php">Admin<span class="sr-only">(current)</span></a></li>';
                    }

                    if ($row["role"] == "user")
                    {
                        echo '<li class="nav-item"><a class="nav-link text-light" href="reservation.php">Foglalásaim<span class="sr-only">(current)</span></a></li>';
                        echo '<li class="nav-item"><a class="nav-link text-light" href="searcher.php">Keresés<span class="sr-only">(current)</span></a></li>';

                    }

                    if ($row["role"] == "owner") {
                        echo '<li class="nav-item"><a class="nav-link text-light" href="owner_salon.php">Saját szalon<span class="sr-only">(current)</span></a></li>';
                    }
                            if ($row["role"] == "worker") {
                                echo '<li class="nav-item"><a class="nav-link text-light" href="add_services.php">Szolgáltatásaim<span class="sr-only">(current)</span></a></li>';
                                echo '<li class="nav-item"><a class="nav-link text-light" href="calendar.php">Naptár<span class="sr-only">(current)</span></a></li>';
                            }
                        }
                    }
            ?>
        </ul>
        <span class="navbar-text">
            <?php if (isset($_SESSION["id_user"]))
            {
                echo '<a href="profile.php" style="margin-right:15px" class="text-light">' . $_SESSION["un"] . '</a>';
                echo '<button type="button" class="btn" style="background-color: #9E8A78"><a href="logout.php">Kijelentkezés</a></button>';
            }
            else
            {
                echo '<button type="button" class="btn" style="background-color: #9E8A78"><a href="login.php">Bejelentkezés</a></button>';
            }
            ?>

    </span>
    </div>
</nav>
</body>
</html>
