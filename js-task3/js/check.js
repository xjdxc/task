let players = JSON.parse(sessionStorage.playersArr); //读取玩家身份数组
let playersNumber = players.length; //设置玩家数量
for (let i = 1; i < playersNumber; i++) {
    console.log(1)
    let node = $(".box3").eq(0).clone() //设置克隆体
    $(".box2").append(node) //插入相应数量的克隆体
}
//赋予box身份
for (let i = 0; i < playersNumber; i++) {
    let playerID;
    if (players[i] == "killers") {
        playerID = "杀手";
    } else {
        playerID = "平民";
    }
    $(".people").eq(i).text(playerID)
}
//发放号码牌
for (let i = 0; i <= playersNumber; i++) {
    $(".number").eq(i).text(i + 1 + "号")
}
//如果有出局，读取出局菜单并渲染出局玩家box
if (sessionStorage.deathList) {
    var deathlist = JSON.parse(sessionStorage.deathList); //读取死亡数组
    for (let i = 0; i < deathlist.length; i++) {
        $(".box4").eq(deathlist[i]).css("border-color", "black");
        $(".people").eq(deathlist[i]).css("background-color", "#999");
        $(".number").eq(deathlist[i]).css("background-color", "#999");
    }
}
//如果是投票页面则改变页面信息
if (sessionStorage.check) {
    $("button").text("返回")
}
//结束游戏按钮
$(".close").click(function () {
    let message = confirm("真的要结束游戏吗？")
    if (message == true) {
        location = "amount.html"
        sessionStorage.clear()
    }
})
//游戏开始
$("button").click(function () {
    location = "days.html"
})