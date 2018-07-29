$(()=> {
    "use strict";
    //查询列表弹框
    var $sublis = $('#nav-total>li');
    $sublis.hover((e)=> {
            $(e.target).children().last().addClass('active')
        },
        ()=> {
            $('#nav-total>li>div.sub-box').removeClass('active')
        });
//登录，注册表单验证
    var tel = document.getElementById("tel");
    var pwd = document.getElementById("pwd");
    var button = document.getElementById("btn-login");
    var rtel = document.getElementById("rtel");
    var rpwd = document.getElementById("rpwd");
    var rbutton = document.getElementById("btn-r");
    tel.onfocus = getFocus;
    pwd.onfocus = getFocus;
    rtel.onfocus = getFocus;
    rpwd.onfocus = getFocus;
    function getFocus() {
        "use strict";
        this.className = "focus";
    }

    tel.onblur = function () {
        "use strict";
        vali(this, /^1[34578]\d{9}$/)
    };
    rtel.onblur = function () {
        "use strict";
        vali(this, /^1[34578]\d{9}$/)
    };
    function vali(txt, reg) {
        "use strict";
        txt.className = "";
        var span = txt.parentNode.nextElementSibling;
        if (reg.test(txt.value)) {
            span.className = "gt vali_success";
            return true;
        } else {
            span.className = "gt vali_fail";
            return false;
        }
    }

    pwd.onblur = function () {
        "use strict";
        vali(this, /^\d{6}$/);
    };
    rpwd.onblur = function () {
        "use strict";
        vali(this, /^\d{6}$/);
    };
    button.onclick = function (e) {
        "use strict";
        if (!vali(tel, /^1[34578]\d{9}$/)) {
            tel.focus();
        } else if (!vali(pwd, /^\d{6}$/)) {
            pwd.focus();
        } else {
            //给服务器发送jQuery异步请求，验证手机登录
            var tel1 = $("#tel").val();
            var pwd1 = $("#pwd").val();
            $.ajax({
                type: "POST",
                data: {tel: tel1, pwd: pwd1},
                url: "data/wy2-login.php",
                success: function (data) {
                    if (data.code > 0) {
                        alert("登录成功，用户编号为" + data.uid);
                    } else {
                        alert("登录失败，原因是" + data.msg);
                    }
                },
                error: function (data) {
                    alert("登录失败，请检查网络");
                }
            });
        }
    };
    rbutton.onclick = function (e) {
        "use strict";
        if (!vali(tel, /^1[34578]\d{9}$/)) {
            rtel.focus();

        } else if (!vali(pwd, /^\d{6}$/)) {
            rpwd.focus();
        } else {
            //给服务器发送jQuery异步请求，验证注册
            var rtel1 = $("#rtel").val();
            var rpwd1 = $("#rpwd").val();
            $.ajax({
                type: "GET",
                data: {rtel: rtel1, rpwd: rpwd1},
                url: "data/wy2-reg.php",
                success: function (data) {
                    if (data.code > 0) {
                        alert("登录成功");
                    } else {
                        alert("登录失败");
                    }
                },
                error: function (data) {
                    alert("登录失败，请检查网络");
                }
            });
        }
    };
//图片滑动
    var ULLIST = document.querySelector("#slider ul");
    var LIWIDTH = 235;
    var OFFSET = 15;
    var NEXT = document.querySelector("#slider>a.next");
    var PREVIOUS = document.querySelector("#slider>a.previous");
    var MOVED = 0;

    function move(e) {
        "use strict";
        e.preventDefault();
        //console.log(this);
        if (this.className.indexOf("disabled") == -1) {
            MOVED += (this.className == "next" ? 1 : -1);
            //console.log(MOVED);
            var left = (MOVED * (-LIWIDTH)) - OFFSET;
            ULLIST.style.left = left + "px";
            check();
        }
    }

    function check() {
        "use strict";
        if (ULLIST.children.length - MOVED == 5) {
            NEXT.className = "next disabled";
            PREVIOUS.className = "previous";
        } else if (MOVED == 0) {
            PREVIOUS.className = "previous disabled";
        } else {
            PREVIOUS.className = "previous";
            NEXT.className = "next";
        }
    }

    NEXT.onclick = move;
    PREVIOUS.onclick = move;
});