<?php

$startDate = $_REQUEST["startDate"];
$endDate = $_REQUEST["endDate"];
// echo("$startDate & $endDate");
// echo("SELECT * FROM device_data1 WHERE Time > '$startDate 00:00:00' and Time < '$endDate 23:59:59';");
$conn = mysqli_connect("192.144.231.225", "root", "471892957");

// 检测连接
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

mysqli_query($conn,"use agricultrualdata");

$check_query = mysqli_query($conn,"SELECT * FROM device_data1 WHERE Time > '$startDate 00:00:00' and Time < '$endDate 23:59:59';");

$data = array();
while($result = mysqli_fetch_array($check_query)){
	$data[] = $result;
}
header('content-type:application/json');
$data = json_encode($data);
echo("var data_="."$data".";");


mysqli_close($conn);
?>