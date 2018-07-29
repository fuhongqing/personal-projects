<?php
  header("Content-Type:application/json;charset=utf-8");
  @$email=$_REQUEST["email"] or die('{"code":-2,"msg":"邮箱账号不能为空"}');
  @$epwd=$_REQUEST["epwd"] or die('{"code":-3,"msg":"密码不能为空"}');
  require("init.php");
  $sql="SELECT eid FROM wy2_user_email WHERE email='$email' AND epwd='$epwd'";
  $result=mysqli_query($conn,$sql);
  $row=mysqli_fetch_assoc($result);
  if($row===null){
    echo('{"code":-1,"msg":"用户名或密码错误"}');
  }else{
    $eid=$row["eid"];
	$output=["code"=>1,"msg"=>"登陆成功，欢迎回来","eid"=>$eid];
	echo(json_encode($output));
  }
?>