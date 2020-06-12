<?php

//************添加内容***************
session_start();
//************添加内容***************

if(!isset($_POST['submit'])){
    exit('Invalid Visit!');
}

//echo $_POST['username'];
//header("Location: index.html");  





// Create connection
$conn = mysqli_connect("192.144.231.225", "root", "471892957");

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

//session_start();

$username = $_POST['username'];
$password = $_POST['password'];

//检测用户名及密码是否正确
mysqli_query($conn,"use agricultrualdata");

$check_query = mysqli_query($conn,"SELECT station FROM users WHERE username='$username' and password='$password' limit 1");
$result = mysqli_fetch_array($check_query);
if ($result[0] == 0) {
	exit('Failed to login,No Right！Click here to <a href="javascript:history.back(-1);">Return</a>');
}

$check_query = mysqli_query($conn,"SELECT role FROM users WHERE username='$username' and password='$password' limit 1");
$result = mysqli_fetch_array($check_query);
    //登录成功

echo $result[0];
if ($result[0] == 'superuser') {
	date_default_timezone_set('PRC');
	$date = date('Y-m-d  H:i:s');
	mysqli_query($conn,"INSERT INTO logs(username,Time,action) VALUES('$username','$date','login');");
    header("Location:index.html");  
	exit;
}
elseif ($result[0] == 'farmer') {
	header("Location:blank.html");
	exit;
}
else {
	exit('Failed to login！Click here to <a href="javascript:history.back(-1);">Return</a>');
}

mysqli_close($conn);

?>