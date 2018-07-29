$(function(){
    "use strict";
    //顶部关闭按钮点击事件
    $("#top>a").click(function(e){
        e.preventDefault();
        $(e.target).parent().css("display","none");
    });
//图片轮播
    var wait=2000;
    var $divs=$("#banner>div");
    var $lis=$("#banner>ul.icons>li");
    var i=0;
    var timer=setInterval(function(){
        i<$divs.size()-1?i++:i=0;
        $divs.eq(i).addClass('active').siblings().removeClass('active');
        $lis.eq(i).addClass('active').siblings().removeClass('active');
    },wait);
//利用冒泡
    $("#banner>ul.icons").on("click","li:not(.active)",(e)=>{
        i=$lis.index(e.target);
        //console.log(i);
        $divs.eq(i).addClass('active').siblings().removeClass('active');
        $lis.eq(i).addClass('active').siblings().removeClass('active');
    });
//左右箭头点击事件
    $("#banner").on("click",".previous",(e)=>{
        "use strict";
        var $div=$(e.target).siblings(".active");
        //console.log($div);
        i=$divs.index($div);
        i--;
        $divs.eq(i).addClass('active').siblings().removeClass('active');
        $lis.eq(i).addClass('active').siblings().removeClass('active');
        if(i==0){
            i=2;
        }
    })
        .on("click",".next",(e)=>{
            "use strict";
            var $div=$(e.target).siblings(".active");
            //console.log($div);
            i=$divs.index($div);
            i++;
            $divs.eq(i).addClass('active').siblings().removeClass('active');
            $lis.eq(i).addClass('active').siblings().removeClass('active');
            if(i>=$divs.size()-1){
                i=0;
            }
        });
//images定时器，定时滚动
//动态添加滚动图片
    var imgs=[
        "images/pj-01.jpg",
        "images/pj-02.png",
        "images/pj-03.jpg",
        "images/pj-04.png",
        "images/pj-05.png",
        "images/pj-03.jpg",
        "images/pj-04.png",
        "images/pj-02.png"
    ];
    var ulImg=document.querySelector("#images>ul");
    var LIWIDTH=320;
//拼接代码片段
    var strImgs='<li><a href="#"><img src="'+
        imgs.join(
            '"></a></li><li><a href="#"><img src="')
        +'"></a></li>';
//再重复追加第一张图片
    strImgs+= `<li><a href="#"><img src="${imgs[0]}"></a></li>`;
    ulImg.innerHTML=strImgs;
    var OFFSET=10;
    var WAIT=2000;
    var j=0;
    var tm=null;
    function move(){
        tm=setInterval(()=>{
            "use strict";
            imgs.length-j>=4?j++:j=0;
            var left=-(LIWIDTH+OFFSET)*j;
            ulImg.style.left=left+"px";
        },WAIT);
    }
    move();
//最热排行图文滚动
    var ulItems=document.querySelector("#hot>ul");
    var lis=document.querySelectorAll("#hot>ul>li");
    var LIHEIGHT=50;
    var offSet=20;
    var speed=2000;
    var timer2=null;
    var n=0;
    timer2=setInterval(function(){
        n++;
        var top=-(LIHEIGHT+offSet)*n;
        ulItems.style.top=top+"px";
        if(lis.length-n<=6){
            n=0;
        }
    },speed);















});
