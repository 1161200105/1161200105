<?php

$username = $_REQUEST["username"];
$name = $_REQUEST["name"];
$sex = $_REQUEST["sex"];
$phone = $_REQUEST["phone"];

if ($sex == "男") {
	$sex = "male";
}
else if ($sex = "女"){
	$sex = "female";
}
	
// echo ("var p = "."$sex".";");
// echo("UPDATE users SET name = '$name' ,sex = '$sex' ,phone = '$phone' WHERE username = '$username' ;");

$conn = mysqli_connect("192.144.231.225", "root", "471892957");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

mysqli_query($conn,"use agricultrualdata");

$check_query = mysqli_query($conn,"UPDATE users SET name = '$name' ,sex = '$sex' ,phone = '$phone' WHERE username = '$username' ;");
// echo("var re = "."$check_query");


mysqli_close($conn);

?>