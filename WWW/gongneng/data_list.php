<?php
$conn = mysqli_connect("192.144.231.225", "root", "471892957");
// 检测连接

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

mysqli_query($conn,"use agricultrualdata");

$check_query = mysqli_query($conn,"SELECT * FROM device_data1 WHERE Time > '2020-01-16 00:00:00' and Time <'2020-01-16 23:59:59';");

$data = array();
while($result = mysqli_fetch_array($check_query)){
	$data[] = $result;
}
// print_r($result);

header('content-type:application/json');
$data = json_encode($data);
// echo json_encode($result);
echo("var data_="."$data".";");
// echo("var flag = 0;");//用于让查询只执行一次


mysqli_close($conn);
?>