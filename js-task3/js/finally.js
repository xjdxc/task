//判断游戏结束原因并渲染页面信息
if (sessionStorage.over) {
    $(".win").eq(0).text("游戏结束")
    $(".great").eq(0).text("游戏被终止了！再来一局吧！")
} else if (sessionStorage.killersNumber == 0) {
    $(".win").eq(0).text("好人胜利")
    $(".great").eq(0).text("太棒了！通过好人的通力合作，最终赢下了这场胜利！")
} else if(sessionStorage.killersNumber >= sessionStorage.normalsNumber){}
//展示剩余玩家数量
$("#killers").text("杀手" + sessionStorage.killersNumber + "人")
$("#normals").text("平民" + sessionStorage.normalsNumber + "人")
//根据天数插入相应的天数
let dayArray = JSON.parse(sessionStorage.Days);
let days = dayArray.length; //读取天数
console.log(days)
for (let i = 1; i < days; i++) {
    let node = $(".day").eq(0).clone(true);
    $("main").append(node)
}
//显示相应天数
for (let i = 0; i < days; i++) {
    let whichDay;
    switch (i) {
        case 0:
            whichDay = "一";
            break;
        case 1:
            whichDay = "二";
            break;
        case 2:
            whichDay = "三";
            break;
        case 3:
            whichDay = "四";
            break;
        case 4:
            whichDay = "五";
            break;
        case 5:
            whichDay = "六";
            break;
        case 6:
            whichDay = "七";
            break;
        case 7:
            whichDay = "八";
            break;
    }
    $(".date").eq(i).text("第" + whichDay + "天");
}
//展示每日出人信息
let nightlist = JSON.parse(sessionStorage.nightList) //读取夜晚出局数组
let daylist = JSON.parse(sessionStorage.dayList) //读取白天出局数组
let players = JSON.parse(sessionStorage.playersArr) //读取玩家身份
let deathlist = JSON.parse(sessionStorage.deathList) //读取死亡玩家号码
for (let i = 0; i < days; i++) {
    let deathID;
    switch (players[daylist[i]]) {
        case "killers":
            deathID = "杀手";
            break;
        case "normals":
            deathID = "平民";
            break;
    }
    if (nightlist[i] != undefined) {
        $(".night").eq(i).text("晚上:" + Number(nightlist[i] + 1) + "号被杀手杀死," + "他的身份是平民")
    }
    if (daylist[i] != undefined) {
        $(".sun").eq(i).text("白天:" + Number(daylist[i] + 1) + "号被全民投出," + "他的身份是" + deathID)
    }
}
//再来一局
$(".again").click(function () {
    sessionStorage.clear();
    location = "amount.html"
})