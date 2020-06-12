<?php

$username = $_REQUEST["username"];
$role = $_REQUEST["role"];

if ($role == "超级管理员"){
	$role = "superuser";
}
else if ($role == "游客"){
	$role = "visitor";
}	
else if ($role == "后台人员"){
	$role = "backWorker";
}
// echo("UPDATE users SET role = '$role' WHERE username = '$username' ;");
$conn = mysqli_connect("192.144.231.225", "root", "471892957");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

mysqli_query($conn,"use agricultrualdata");

$check_query = mysqli_query($conn,"UPDATE users SET role = '$role' WHERE username = '$username' ;");
if ($check_query){
	echo("var re = 1;");
}
else{
	echo("var re = 0;");
}


mysqli_close($conn);

?>