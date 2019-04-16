let players = JSON.parse(sessionStorage.playersArr) //读取玩家身份数组
console.log(players)
let playersNumber = players.length; //读取并设置玩家人数
console.log(playersNumber)
//插入与人数相同的box
for (let i = 1; i < playersNumber; i++) {
    let node = $(".box3").eq(0).clone(true);
    $(".box2").eq(0).append(node);
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
//如果是投票页面则改变页面信息
if (sessionStorage.anhao) {
    $("heanding").eq(0).text("投票");
    $("vote").eq(0).text("投出你心目中的那一票");
    $("most").eq(0).text("投票");
}
//如果之前有出局，读取出局菜单并渲染出局玩家box
if (sessionStorage.deathList) {
    var deathlist = JSON.parse(sessionStorage.deathList); //读取死亡数组
    for (let i = 0; i < deathlist.length; i++) {
        $(".box4").eq(deathlist[i]).css("border-color", "black");
        $(".people").eq(deathlist[i]).css("background-color", "#999");
        $(".number").eq(deathlist[i]).css("background-color", "#999");
    }
}

//点击box选取出局玩家
let thisClick, lastClick;
let target = $(".box4");
let knife = $(".skill");
for (let i = 0; i < playersNumber; i++) {
    target[i].index = i;
    target[i].onclick = function () {
        thisClick = target[i].index
        //杀手杀人页，不可以出杀手
        if (!sessionStorage.anhao && players[thisClick] == "killers") {
            alert("不可以选择杀手");
            thisClick = lastClick;
            console.log(thisClick)
        }
        //第一次出人时
        else if (lastClick == undefined) {
            target.eq(thisClick).css("border-color", "black");
            knife.eq(thisClick).css("display", "block");
            lastClick = thisClick;
            console.log(thisClick)
        }
        //点击的人在出局名单中
        else if (sessionStorage.deathList && deathlist.indexOf(thisClick) > -1) {
            alert("该玩家已出局")
            thisClick = lastClick
            console.log(thisClick)
        }
        //两次点击的box一样
        else if (thisClick == lastClick) {
            target.eq(thisClick).css("border-color", "black");
            knife.eq(thisClick).css("display", "block");
            console.log(thisClick)
        }
        //选择到可以出局的玩家
        else {
            target.eq(thisClick).css("border-color", "black");
            knife.eq(thisClick).css("display", "block");
            target.eq(lastClick).css("border-color", "#fff");
            knife.eq(lastClick).css("display", "none");
            lastClick = thisClick;
            console.log(thisClick)
        }
    }
}
//nightlist 数组/ nightList 是key 
//创建白天出局数组和晚上出局数组
let daylist = []; //白天出局数组  投票页面
let nightlist = []; //夜晚出局数组  杀手页面
$("button").eq(0).click(function () {
    //读取平民人数和杀手人数
    let killersNumber = sessionStorage.killersNumber;
    let normalsNumber = sessionStorage.normalsNumber;
    console.log(normalsNumber)
    //没选择出局玩家给予提示
    if (thisClick == undefined) {
        alert("请选择出局玩家");
    }
    //选择到可以出局的玩家
    //第一次出人,必为杀手页面
    else if (!sessionStorage.deathList) {
        nightlist.push(thisClick); //出局玩家放入夜晚出局数组
        sessionStorage.nightList = JSON.stringify(nightlist); //转化为字符串并储存
        sessionStorage.dayList = JSON.stringify(daylist);
        sessionStorage.normalsNumber = sessionStorage.normalsNumber - 1 //平民数量-1
        // console.log(sessionStorage.normalsNumber)
        let deathlist = nightlist.concat(daylist); //得出死亡玩家号码数组
        sessionStorage.deathList = JSON.stringify(deathlist); //储存
        window.location = "days.html"
    } else {
        nightlist = JSON.parse(sessionStorage.nightList) //读取夜晚出局数组
        daylist = JSON.parse(sessionStorage.dayList) //读取白天出局数组
        if (sessionStorage.anhao) { //投票页
            //判断出局玩家身份
            if (players[thisClick] == "killers") {
                sessionStorage.killersNumber = sessionStorage.killersNumber - 1
            } else {
                sessionStorage.normalsNumber = sessionStorage.normalsNumber - 1
            }
            daylist.push(thisClick);
        } else { //杀手页
            sessionStorage.normalsNumber = sessionStorage.normalsNumber - 1
            nightlist.push(thisClick);
        }
        deathlist = nightlist.concat(daylist); //得出死亡玩家号码数组
        sessionStorage.deathList = JSON.stringify(deathlist); //储存
        sessionStorage.dayList = JSON.stringify(daylist);
        sessionStorage.nightList = JSON.stringify(nightlist);
        // 判断游戏是否结束
        let a = Number(sessionStorage.killersNumber)
        let b = Number( sessionStorage.normalsNumber)
        if (a >= b || a == 0) {
            window.location = "finally.html"
        } else {
            window.location = "days.html"
            //读取第几天
            if (sessionStorage.anhao) {
                let dayArray = JSON.parse(sessionStorage.Days)
                dayArray.push("b");
                sessionStorage.Days = JSON.stringify(dayArray);
                sessionStorage.removeItem("anhao");
            }
        }
    }
})

//控制audio播放
$(".player").eq(0).click(function () {
    // let song = $("#player")[0]; /*jquery对象转换成js对象*/
    let song = document.getElementById("player");
    if (song.paused) {
        /*如果已经暂停*/
        song.play(); /*播放*/
    } else {
        song.pause(); /*暂停*/
    }
})