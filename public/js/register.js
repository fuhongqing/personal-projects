$("#bt-register").click(function(){
    "use strict";
    var u=$("#uname").val();
    var p=$("#upwd").val();
    var p1=$("#upwd1").val();
    if(u===""){
        alert("用户名不能为空");
        return;
    }
    if(p===""){
        alert("密码不能为空");
        return;
    }
    if(p1!=p){
        alert("前后密码不一致");
        return;
    }
    $.ajax({
        type:"POST",
        url:"/register",
        data:{uname:u,upwd:p},
        success:function(data){
            if(data.code===1){
                alert("注册成功,3s后跳转登录页面");
                setTimeout(function(){
                    location.href="login.html";
                },3000);
            }else{
                alert("注册失败");
            }
        }
    });
});
