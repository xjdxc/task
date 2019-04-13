let whowin = document.getElementsByClassName("win")[0];
let winword = document.getElementsByClassName("word1")[0];
let people1 = document.getElementsByClassName("people")[0];
let people2 = document.getElementsByClassName("people")[1];
let date = document.getElementsByClassName("date");
let night = document.getElementsByClassName("night");
let player = JSON.parse(sessionStorage.hiphop);
console.log(player)
let death = JSON.parse(sessionStorage.Death)
console.log(death)
let Days = JSON.parse(sessionStorage.Days);
let days = Days.length;
if ((days - 1) * 2 == death.length) {
    days = days - 1
}
console.log(days)
//读取剩余玩家各身份个数
let killersLength = sessionStorage.killersLength
let normalsLength = sessionStorage.normalsLength
console.log(killersLength)
console.log(normalsLength)
//展示剩余人数
people1.innerHTML = "杀&ensp;手" + killersLength + "人";
people2.innerHTML = "平&ensp;民" + normalsLength + "人";
//根据天数插入相应天数信息
for (i = 1; i < days; i++) {
    let node = document.getElementsByClassName("day")[0].cloneNode(true);
    document.getElementsByClassName("box")[0].appendChild(node);
}
if (killersLength >= normalsLength) {
    whowin.innerHTML = "杀手胜利"
    winword.innerHTML = "太棒了！你知道么？在捉鬼游戏中只有20%的杀手取得游戏最终的胜利哦！"
} else if (killersLength == 0) {
    console.log(1)
    whowin.innerHTML = "好人胜利"
    winword.innerHTML = "还行吧！你知道么？在捉鬼游戏中有80%的好人取得游戏最终的胜利哦！"
} else if (sessionStorage.over) {
    console.log(normalsLength)
    whowin.innerHTML = "游戏结束"
    winword.innerHTML = "游戏还没有分出胜负，就这样被你征服！再来一次"
}
//第一二三四五六天
for (i = 0; i < days; i++) {
    let whichDay
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
    date[i].innerHTML = "第" + whichDay + "天";
}
//展示每天出人信息
for (i = 0; i < days * 2; i++) {
    let deathID;
    switch (player[death[i]]) {
        case "killers":
            deathID = "杀手";
            break;
        case "normals":
            deathID = "平民";
            break;
    }
    if (i % 2 == 0) {
        night[i].innerHTML = "晚上：" + Number(death[i] + 1) + "号被杀手杀死，" + Number(death[i] + 1) + "号是" + deathID;
    } else if (i % 2 == 1) {
        night[i].innerHTML = "白天：" + Number(death[i] + 1) + "号被全民投出，" + Number(death[i] + 1) + "号是" + deathID;
        if (death[i] == undefined) {
            night[i].innerHTML = "白天无人死亡"
        }
    }
}
//再来一局。清除session
document.getElementsByClassName("again")[0].onclick = function () {
    sessionStorage.clear();
    location = "js-task2.1.html"
}