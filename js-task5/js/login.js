// document.getElementsByTagName("button")[0].addEventListener("click", function () {
//     let xmlhttp = new XMLHttpRequest();
//     let name = document.getElementsByClassName("user-name")[0].value;
//     let password = document.getElementsByClassName("user-password")[0].value;
//     xmlhttp.onreadystatechange = function () {
//         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//             let data = JSON.parse(xmlhttp.responseText)
//             document.getElementById("fuck").innerHTML = data.message;
//             console.log(data.code)
//             if (data.code == 0) {
//                 window.location = "http://dev.admin.carrots.ptteng.com/"
//             }
//         }
//     }
//     xmlhttp.open("POST", "/carrots-admin-ajaxa/a/login", true);
//     xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     console.log("name=" + name + "&pwd=" + password);
//     xmlhttp.send("name=" + name + "&pwd=" + password);
// })


$("button").eq(0).click(function () {
    let name = $(".user-name").eq(0).val();
    let password = $(".user-password").eq(0).val();
    let dota = "name=" + name + "&pwd=" + password;
    // let dota = $(".login").eq(0).serialize();
    console.log(dota)
    if (name == "" || password == "") {
        $("#fuck").text("请输入用户名及密码")
        setTimeout(function () {
            $("#fuck").text("")
        }, 2000)
    } else {
        $.post("/carrots-admin-ajaxa/a/login", dota,
            function (data) {
                data = JSON.parse(data)
                $("#fuck").text(data.message)
                setTimeout(function () {
                    $("#fuck").text("")
                }, 2000)
                if (data.code == 0) {
                    window.location = "http://dev.admin.carrots.ptteng.com/"
                }
            }, );
    }
}, );
//得到焦点时改变背景颜色
$(".user-name").eq(0).focus(function () {
    $(this).css("background", " url(../image/loginuser-active.png)  .1rem .1rem   no-repeat")
})
//失去焦点恢复背景颜色
$(".user-name").eq(0).blur(function () {
    $(this).css("background", " url(../image/loginuser.png)  .1rem .1rem   no-repeat")
})

$(".user-password").eq(0).focus(function () {
    $(this).css("background", " url(../image/loginpsd-active.png)  .1rem .1rem   no-repeat")
})

$(".user-password").eq(0).blur(function () {
    $(this).css("background", " url(../image/loginpsd.png)  .1rem .1rem   no-repeat")
})