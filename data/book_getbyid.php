<?php
header('Content-Type:application/json;charset=utf-8');

//取到传递来的参数
@$did = $_REQUEST['did'];
if(empty($did))
{
 echo '[]';
 return;
}
require('init.php');
$sql = "select did,price,img_lg,detail,intro,name from dsb_book where did=$did";

$result = mysqli_query($conn,$sql);

//fetch_all(php 7.0才支持) fetch_assoc
//从数据库返回的$result取结果，返回给客户端
$output = [];

$row = mysqli_fetch_assoc($result);

if(empty($row))
{
  echo '[]';
}
else
{
  $output[] = $row;
  echo json_encode($output);
}


?>