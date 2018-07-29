$(()=>{
    "use strict";
    //图片轮播
    //var speed=2000;
    var wait=2000;
    var timer=null;
    var $divs=$('#banner').find('div');
    var $lis=$('#icons').find('li');
    //console.log($divs);
    var i=0;
    var canmove=true;
    function move(){
        timer=setInterval(()=>{
            i<$divs.size()-1?i++:i=0;
            $divs.eq(i).addClass('active').siblings().removeClass('active');
            $lis.eq(i).addClass('active').siblings().removeClass('active');
        },wait);
    }
    move();
    //$('#banner').hover(
    //()=>{
    //    clearInterval(timer);
    //    canmove=false;
    //},
    //()=>{
    //    canmove=true;
    //    move();
    //});
    $('#icons').on('click','li:not(.active)',(e)=>{
        i=$lis.index(e.target);
        //console.log(i);
        $divs.eq(i).addClass('active').siblings().removeClass('active');
        $lis.eq(i).addClass('active').siblings().removeClass('active');
    });
//
    $("#search>input").focus(function(){
        $(this).css("outline","none")
    });
//弹框
    $('#top>ul>li:last-child').hover(()=>{
        "use strict";
            $('#top>ul>li:last-child>div').addClass('active')
      },
        ()=>{
            "use strict";
            $('#top>ul>li:last-child>div').removeClass('active')
        });
//查询列表弹框
    var $sublis=$('#nav-total>li');
    $sublis.hover((e)=>{
        $(e.target).children().last().addClass('active')
      },
        ()=>{
            //console.log($(e.target));
            //$(e.target).children().last().removeClass('active')
            $('#nav-total>li>div.sub-box').removeClass('active')
        });
//登录模态框
    var $li=$('#top>ul.gt>li:nth-child(4)');
    var $a=$('#login>a.mail');
    var $telA=$('#mail>a.tel');
    var $as=$('#login>div.cbk>a.reg,#mail>div.cbk>a.reg');
    var $loginA=$('#reg>p>a.login');
    var $times=$('#mask>div>span.times');
    //console.log($times);
    $li.on('click','a',(e)=>{
        //登录模态框
        e.preventDefault();
        $(e.target).parent().parent().next().css('display','block')
    });
    //邮箱登录
    $a.on('click',(e)=>{
        e.preventDefault();
        $(e.target).parent().css('display','none');
        $(e.target).parent().next().css('display','block')
    });
    //手机注册
    $telA.on('click',(e)=>{
        e.preventDefault();
        $(e.target).parent().css('display','none');
        $(e.target).parent().prev().css('display','block')
    });
    //
    $as.on('click',(e)=>{
        e.preventDefault();
        var $target=$(e.target);
        if($target.parent().parent().id=='login'){
            $target.parent().parent().css('display','none');
            $target.parent().parent().next().next().css('display','block')
        }else{
            $target.parent().parent().css('display','none');
            $target.parent().parent().next().css('display','block')
        }
    });
    //登录
    $loginA.on('click',(e)=>{
        e.preventDefault();
        $(e.target).parent().parent().css('display','none');
        $(e.target).parent().parent().prev().prev().css('display','block')
    });
    //关闭按钮点击事件
    $times.on('click',(e)=>{
        $(e.target).parent().parent().css('display','none')
    });
    //关闭按钮点击事件
    var $timeAs=$('#nav-total>li>div.sub-box>ul.sub-right>li.gt>a');
    //console.log($timeAs);
    $timeAs.on('click',(e)=>{
        $(e.target).parent().parent().parent().removeClass('active')
    });

});
//登录，注册表单验证
var tel=document.getElementById("tel");
var pwd=document.getElementById("pwd");
var button=document.getElementById("btn-login");
var email=document.getElementById("email");
var epwd=document.getElementById("epwd");
var ebutton=document.getElementById("btn-e");
var rtel=document.getElementById("rtel");
var rpwd=document.getElementById("rpwd");
var rbutton=document.getElementById("btn-r");
tel.onfocus=getFocus;
pwd.onfocus=getFocus;
email.onfocus=getFocus;
epwd.onfocus=getFocus;
rtel.onfocus=getFocus;
rpwd.onfocus=getFocus;
function getFocus(){
    "use strict";
    this.className="focus";
    this.nextElementSibling.className="gt";
}
tel.onblur=function(){
    "use strict";
    vali(this,/^1[34578]\d{9}$/)
};
email.onblur=function(){
    "use strict";
    vali(this,/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/)
};
rtel.onblur=function(){
    "use strict";
    vali(this,/^1[34578]\d{9}$/)
};
function vali(txt,reg){
    "use strict";
    txt.className="";
    var div=txt.nextElementSibling;
    if(reg.test(txt.value)){
        div.className="gt vali_success";
        return true;
    }else{
        div.className="gt vali_fail";
        return false;
    }
}
pwd.onblur=function(){
    "use strict";
    vali(this,/^\d{6}$/);
};
epwd.onblur=function(){
    "use strict";
    vali(this,/^\d{6}$/);
};
rpwd.onblur=function(){
    "use strict";
    vali(this,/^\d{6}$/);
};
button.onclick=function(e){
    "use strict";
    if(!vali(tel,/^1[34578]\d{9}$/)){
        tel.focus();
    }else if(!vali(pwd,/^\d{6}$/)){
        pwd.focus();
    }else{
        //给服务器发送jQuery异步请求，验证手机登录
        var tel1=$("#tel").val();
        var pwd1=$("#pwd").val();
        $.ajax({
            type:"POST",
            data:{tel:tel1,pwd:pwd1},
            url:"data/wy2-login.php",
            success:function(data){
                if(data.code>0){
                    alert("登录成功，用户编号为"+data.uid);
                    $(e.target).parent().parent().remove();
                }else{
                    alert("登录失败，原因是"+data.msg);
                }
            },
            error:function(data){
                alert("登录失败，请检查网络");
            }
        });
    }
};
ebutton.onclick=function(e){
    "use strict";
    if(!vali(tel,/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/)){
        email.focus();

    }else if(!vali(pwd,/^\d{6}$/)){
        epwd.focus();
    }else{
        //给服务器发送jQuery异步请求，验证邮箱登录
        var email1=$("#email").val();
        var epwd1=$("#epwd").val();
        $.ajax({
            type:"GET",
            data:{email:email1,epwd:epwd1},
            url:"data/wy2-login-e.php",
            success:function(data){
                if(data.code>0){
                    alert("登录成功，用户编号为"+data.eid);
                    $(e.target).parent().parent().remove();
                }else{
                    alert("登录失败，原因是"+data.msg);
                }
            },
            error:function(data){
                alert("登录失败，请检查网络");
            }
        });
    }
};
rbutton.onclick=function(e){
    "use strict";
    if(!vali(tel,/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/)){
        rtel.focus();

    }else if(!vali(pwd,/^\d{6}$/)){
        rpwd.focus();
    }else{
        //给服务器发送jQuery异步请求，验证注册
        var rtel1=$("#rtel").val();
        var rpwd1=$("#rpwd").val();
        $.ajax({
            type:"GET",
            data:{rtel:rtel1,rpwd:rpwd1},
            url:"data/wy2-reg.php",
            success:function(data){
                if(data.code>0){
                    alert("登录成功");
                }else{
                    alert("登录失败");
                }
            },
            error:function(data){
                alert("登录失败，请检查网络");
            }
        });
    }
};
//图片滑动
var ULLIST=document.querySelector("#slider>ul");
var LIWIDTH=235;
var OFFSET=15;
var NEXT=document.querySelector("#slider>a.next");
var PREVIOUS=document.querySelector("#slider>a.previous");
var MOVED=0;
function move(e){
    "use strict";
    e.preventDefault();
    //console.log(this);
    if(this.className.indexOf("disabled")==-1){
      MOVED+=(this.className=="next"?1:-1);
        //console.log(MOVED);
      var left=(MOVED*(-LIWIDTH))-OFFSET;
        ULLIST.style.left=left+"px";
        check();
    }
}
function check(){
    "use strict";
    if(ULLIST.children.length-MOVED==5){
        NEXT.className="next disabled";
        PREVIOUS.className="previous";
    }else if(MOVED==0){
        PREVIOUS.className="previous disabled";
    }else{
        PREVIOUS.className="previous";
        NEXT.className="next";
    }
}
NEXT.onclick=move;
PREVIOUS.onclick=move;
//楼层点亮
$(function(){
    "use strict";
    var $h3s=$("#container>div>div>h3");
    var $ele=$("#elevator");
    $(window).scroll(()=>{
        var scrollTop=$("body").scrollTop();
        //返回顶部的页面滚动事件
        if(scrollTop>=400) {
            $("#back").css("display", "block");
        }else{
            $("#back").css("display", "none");
        }
        //返回顶部结束
        $h3s.each((i,h3)=>{
            var $h3=$(h3);
            if($h3.offset().top<scrollTop+innerHeight/2){
                $h3s.removeClass("active");
                $h3.addClass("active");
                $ele.find("ul>li>a.front").css("display","block");
                $ele.find("ul>li>a.etitle").css("display","none");
                $ele.find("ul>li:eq("+(i-1>0?i-1:0)+")").addClass("active").siblings().removeClass("active");
                $ele.find("ul>li:eq("+(i-1)+")>a.front").css("display","none");
                $ele.find("ul>li:eq("+(i-1)+")>a.etitle").css("display","block");
            }else{
                $h3.removeClass("active");
            }
        });
        if($h3s.is(".active")){
            $ele.show();
        }else{
            $ele.hide();
        }
    });
    $ele.on("mouseenter","a.front",function(e){
        $(e.target).css("display","none")
        .next().css("display","block")
        .parent().addClass("active");
    })
    .on("mouseleave","a.etitle",function(e){
            var $li=$(e.target).parent();
            var i=$ele.find("ul>li").index($li);
            if(!$h3s.eq(i).is(".active")){
                $li.removeClass("active");
                $(e.target).css("display","none").prev().css("display","block")
            }
        });
    $ele.on("click","a.etitle",(e)=>{
        e.preventDefault();
        var $li=$(e.target).parent();
        var i=$ele.find("ul>li").index($li);
        $("body").animate({
            scrollTop:$h3s.eq(i).offset().top//+innerHeight/2
        },500);
    });
});
//返回顶部鼠标事件
$(function(){
    $("#back").on("mouseenter",".front",function(e){
        "use strict";
        $(e.target).css("display","none").next().css("display","block").parent().addClass("active")
    })
    .on("mouseleave",".back",function(e){
            "use strict";
            $(e.target).css("display", "none").prev().css("display", "block").parent().removeClass("active")
        });
});