<?php
  header("Content-Type:application/json;charset=utf-8");
  @$tel=$_REQUEST["tel"] or die('{"code":-2,"msg":"手机号不能为空"}');
  @$pwd=$_REQUEST["pwd"] or die('{"code":-3,"msg":"密码不能为空"}');
  require("init.php");
  $sql="SELECT uid FROM wy_xy_user WHERE tel='$tel' AND pwd='$pwd'";
  $result=mysqli_query($conn,$sql);
  $row=mysqli_fetch_assoc($result);
  if($row===null){
    echo('{"code":-1,"msg":"用户名或密码错误"}');
  }else{
    $uid=$row["uid"];
	$output=["code"=>1,"msg"=>"登陆成功，欢迎回来","uid"=>$uid];
	echo(json_encode($output));
  }
?>