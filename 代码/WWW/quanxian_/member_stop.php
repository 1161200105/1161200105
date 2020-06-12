<?php

$username = $_REQUEST["username"];
$state = $_REQUEST["state"];
$conn = mysqli_connect("192.144.231.225", "root", "471892957");

// echo("var q ="."$state".";");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

mysqli_query($conn,"use agricultrualdata");

$check_query = mysqli_query($conn,"UPDATE users SET station = "."$state"." WHERE username = "."$username".";");
echo("var re = "."$check_query");
// echo("UPDATE users SET station = "."$state"." WHERE username = '"."$username"."';");
mysqli_close($conn);

?>