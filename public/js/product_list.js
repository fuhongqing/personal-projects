$(function(){
    "use strict";
    function loadProduct(pageNo){
        //异步请求产品列表信息
        $.ajax({
            type:"POST",
            data:{pageNo:pageNo},
            url:"/list",
            success:function(data){
                //循环拼接字符串，生成产品列表
                var html="";
                $.each(data,(i,p)=>{
                    html+=`
                        <ul>
                          <li><a href="#"><img src="${p.pic}" alt=""/></a></li>
                          <li>${p.pin}</li>
                          <li><a href="#">${p.pname}</a></li>
                          <li><a href="#">${p.pcount}</a></li>
                          <li><a href="#" title="加入购物车" class="addcart">¥${p.price}</a></li>
                        </ul>
                    `;
                });
                $("#list").html(html);
            }
        });
        //异步请求总页数
        $.ajax({
            type:"GET",
            url:"/page",
            success:function(data){
                var pageTotal=data.page;
                //循环拼接字符串，生成翻页功能
                var html="";
                for(var i=1;i<=pageTotal;i++){
                    if(i==pageNo){
                      html+=`
                        <li class="active"><a href="#">${i}</a></li>
                      `;
                    }else{
                        html+=`
                          <li><a href="#">${i}</a></li>
                        `;
                    }
                }
                $("#change>ul").html(html);
            }
        });

    }
    loadProduct(1);
    //为页码父元素绑定点击事件
    $("#change>ul").on("click","li a",function(e){
        e.preventDefault();
        var p=$(this).text();
        loadProduct(p);
    });
});