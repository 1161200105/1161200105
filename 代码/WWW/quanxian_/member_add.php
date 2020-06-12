<?php

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];
$name = $_REQUEST["name"];
$sex = $_REQUEST["sex"];
$phone = $_REQUEST["phone"];

if ($sex == "男") {
	$sex = "male";
}
else if ($sex == "女"){
	$sex = "female";
}
	
// echo ("var p = "."$sex".";");
// echo("INSERT INTO users(username,password,name,sex,phone,station,role)values('$username','$password','$name','$sex','$phone','1','visitor')");

$conn = mysqli_connect("192.144.231.225", "root", "471892957");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

mysqli_query($conn,"use agricultrualdata");

$check_query = mysqli_query($conn,"INSERT INTO users(username,password,name,sex,phone,station,role) values('$username','$password','$name','$sex','$phone','1','visitor')");
if ($check_query){
	echo("var re = 1;");
}
else{
	echo("var re = 0;");
}

mysqli_close($conn);

?>