<?php
$conn = mysqli_connect("192.144.231.225", "root", "471892957");
// 检测连接

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

mysqli_query($conn,"use agricultrualdata");

$check_query = mysqli_query($conn,"SELECT * FROM users;");

$data = array();
while($result = mysqli_fetch_array($check_query)){
	$data[] = $result;
}
// print_r($result);

header('content-type:application/json');
$data = json_encode($data);
// echo json_encode($result);
echo("var data="."$data".";");
// echo("var flag = 0;");//用于让查询只执行一次


mysqli_close($conn);
?>