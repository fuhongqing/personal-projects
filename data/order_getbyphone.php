<?php
header('Content-Type:application/json;charset=utf-8');

//取到传递来的参数
@$phone = $_REQUEST['phone'];
if(empty($phone))
{
  echo '[]';
  return;
}
require('init.php');
$sql = "select b.img_sm,o.order_time,o.user_name,o.oid,o.did  from dsb_order o, dsb_book b where  o.phone='$phone' and o.did=b.did";
$result = mysqli_query($conn,$sql);

//fetch_all(php 7.0才支持) fetch_assoc
//从数据库返回的$result取结果，返回给客户端
$output = [];
while(true){
  $row = mysqli_fetch_assoc($result);
  if(!$row)
  {
    break;
  }
  $output[] = $row;
}
echo json_encode($output);
?>