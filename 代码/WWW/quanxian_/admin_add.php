<?php

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];
$name = $_REQUEST["name"];
$sex = $_REQUEST["sex"];
$phone = $_REQUEST["phone"];
$role = $_REQUEST["role"];
if ($sex == "男") {
	$sex = "male";
}
else if ($sex == "女"){
	$sex = "female";
}

if ($role == "超级管理员"){
	$role = "superuser";
}
else if ($role == "游客"){
	$role = "visitor";
}	
else if ($role == "后台人员"){
	$role = "backWorker";
}

	
// echo ("var p = "."$sex".";");
// echo("INSERT INTO users(username,password,name,sex,phone,station,role)values('$username','$password','$name','$sex','$phone','1','$role')");

$conn = mysqli_connect("192.144.231.225", "root", "471892957");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

mysqli_query($conn,"use agricultrualdata");

$check_query = mysqli_query($conn,"INSERT INTO users(username,password,name,sex,phone,station,role) values('$username','$password','$name','$sex','$phone','1','$role')");
if ($check_query){
	echo("var re = 1;");
}
else{
	echo("var re = 0;");
}

mysqli_close($conn);

?>