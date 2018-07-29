<?php
  header("Content-Type:application/json;charset=utf-8");
  @$rtel=$_REQUEST["rtel"] or die('{"code":-2,"msg":"手机号不能为空"}');
  @$rpwd=$_REQUEST["rpwd"] or die('{"code":-3,"msg":"密码不能为空"}');
  require("init.php");
  $sql="INSERT INTO wy2_user VALUES(null,'$rtel','$rpwd')";
  $result=mysqli_query($conn,$sql);
  if($result===true){
     echo('{"code":1,"msg":"注册成功"}');
  }else{
    echo('{"code":-1,"msg":"注册失败"}');
  }
?>