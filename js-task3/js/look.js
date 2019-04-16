let players = JSON.parse(sessionStorage.playersArr); //读取玩家身份
let clickCount = 0;
console.log(players);
//回到上一页
$(".back").click(function () {
    window.history.back();
})
//结束游戏
$(".help").click(function () {
    location = "edition.html";
    sessionStorage.clear();
})
//点击功能
$(".look").click(function () {
    //显示和隐藏交替
    $(".identity").toggle();
    $(".face").toggle();
    $(".inverse").toggle();
    clickCount = clickCount + 1;
    let i = Math.floor(clickCount / 2);
    // if (i < players.length) {
    //     $(".look").text("查看" + Number(i + 1) + "号身份")
    //     $(".number").text(Number(i + 1))
    // }
    console.log(i)
    //点击次数为奇数，正面出现。
    if (clickCount % 2 == 1) {
        if (i < players.length - 1) {
            $(".look").text("隐藏并传递给" + Number(i + 2) + "号");
        } else {
            $(".look").text("法官查看");
        }
        if (players[i] == ("normals")) {
            $(".identity").text("平民")
        } else {
            $(".identity").text("杀手")
        }
    }
    //反面出现时
    else {
        if (i < players.length) {
            $(".look").text("查看" + Number(i + 1) + "号身份");
            $(".number").text(Number(i + 1))
        }else{
            location="check.html"
        }
    }
})