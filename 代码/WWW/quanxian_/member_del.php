<?php

$username = $_REQUEST["username"];
$conn = mysqli_connect("192.144.231.225", "root", "471892957");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

mysqli_query($conn,"use agricultrualdata");

$check_query = mysqli_query($conn,"DELETE FROM users WHERE username = "."$username".";");
echo("var re = "."$check_query");


mysqli_close($conn);

?>