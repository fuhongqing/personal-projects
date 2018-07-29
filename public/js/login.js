$("#bt-login").click(function(){
    "use strict";
    var u=$("#uname").val();
    var p=$("#upwd").val();
    var reguname=/^[a-z0-9]{2,8}$/i;
    var regupwd=/^[a-z0-9]{2,8}$/i;
    if(!reguname.test(u)){
        alert("用户名格式不正确");
        return;
    }
    if(!regupwd.test(p)){
        alert("密码格式不正确");
        return;
    }
    $.ajax({
        type:"POST",
        url:"/login",
        data:{uname:u,upwd:p},
        success:function(data){
            if(data.code===1){
                alert("登陆成功，3s后返回首页");
                sessionStorage['loginName']=u;
                sessionStorage['loginUid']=data.uid;
                setTimeout(function(){
                    location.href="index.html";
                },3000);
            }else{
                alert("登录失败"+data.msg);
            }
        }
    });
});
