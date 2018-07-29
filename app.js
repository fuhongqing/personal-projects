//express框架创建服务器，监听端口
const pool=require("./pool");
const http=require("http");
const express=require("express");
const qs=require("querystring");
var app=express();
var server=http.createServer(app);
server.listen(8081);
//中间件
app.use(express.static("public"));
app.get("/",(req,res)=>{
    "use strict";
    res.redirect("login.html");
});
//用户登录
app.post("/login",(req,res)=>{
    "use strict";
    req.on("data",(data)=>{
        var obj=qs.parse(data.toString());
        pool.getConnection((err,conn)=>{
            if(err){
                throw err;
            }else{
                var sql="SELECT * FROM product_user WHERE uname=? AND upwd=?";
                conn.query(sql,[obj.uname,obj.upwd],(err,result)=>{
                    if(result.length>0){
                        var output={code:1,msg:"登录成功",uid:result[0].uid};
                    }else{
                        var output={code:2,msg:"用户名或密码错误"};
                    }
                    res.json(output);
                    conn.release();
                });
            }
        });
    });
});
//用户注册
app.post("/register",(req,res)=>{
    "use strict";
    req.on("data",(data)=>{
        var obj=qs.parse(data.toString());
        pool.getConnection((err,conn)=>{
            if(err){
                throw err;
            }else{
                var sql="INSERT INTO product_user VALUES(null,?,?)";
                conn.query(sql,[obj.uname,obj.upwd],(err,result)=>{
                    if(err){
                        throw err;
                    }else{
                        var output={code:1,msg:"注册成功"};
                    }
                    res.json(output);
                    conn.release();
                });
            }
        });
    });
});
//产品内容的自动生成
app.post("/list",(req,res)=>{
    "use strict";
    req.on("data",(data)=>{
        var obj=qs.parse(data.toString());
        if(obj.pageNo===null){
            obj.pageNo=1;
        }
        pool.getConnection((err,conn)=>{
            if(err){
                throw err;
            }else{
                var offset=(obj.pageNo-1)*20;
                var sql="SELECT * FROM product_list limit ?,?";
                conn.query(sql,[offset,20],(err,result)=>{
                    if(err){
                        throw err;
                    }
                    res.json(result);
                    conn.release();
                });
            }
        });
    });
});
app.get("/page",(req,res)=>{
    "use strict";
    pool.getConnection((err,conn)=>{
        if(err)throw err;
        var sql="SELECT count(pid) FROM product_list";
        conn.query(sql,(err,result)=>{
            if(err)throw err;
            var str=qs.stringify(result[0]);
            var arr=qs.parse(str);
            var pageNo=Math.ceil(arr["count(pid)"]/20);
            var output={page:pageNo};
            res.json(output);
            conn.release();
        });
    });
});