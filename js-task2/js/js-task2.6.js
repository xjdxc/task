let triangle = document.getElementsByClassName("triangle");
let kill = document.getElementsByClassName("kill");
let goast = document.getElementsByClassName("goast");
let player = document.getElementsByClassName("player");
let vote = document.getElementsByClassName("vote");
let killInformation = document.getElementsByClassName("killInformation");
let pushInformation = document.getElementsByClassName("pushInformation");
let playersID = JSON.parse(sessionStorage.hiphop) //保存玩家身份的数组
let node = document.getElementsByClassName("Day")[0].cloneNode(true);
let nothing = document.getElementsByClassName("nothing")[0];
let theDay = document.getElementsByClassName("theDay");
let content = document.getElementsByClassName("content");
//设置变量储存游戏进行到第几天
if (!sessionStorage.Days) {
    //第一次进入游戏设置变量
    let dayArray = new Array("b")
    var days = dayArray.length; //天数
    sessionStorage.Days = JSON.stringify(dayArray);
    console.log(days)
    console.log(typeof (dayArray))
    //天数为days，days为数组dayArray的个数.储存数组dayArray
} else {
    //不是第一次进入游戏，读取第几天变量
    let dayArray = JSON.parse(sessionStorage.Days);
    var days = dayArray.length;
    console.log(dayArray)
    console.log(days)
}
//根据第几天插入几个day信息框
for (let i = 1; i < days; i++) {
    let node = document.getElementsByClassName("Day")[0].cloneNode(true);
    let nothing = document.getElementsByClassName("nothing")[0];
    console.log(i);
    nothing.appendChild(node);
}

//展示之前天数死亡信息
if (sessionStorage.Death) {
    let death = JSON.parse(sessionStorage.Death) //保存死亡号码的数组
    let deathLength = death.length; //数组的元素数量
    if (deathLength == (days * 2) - 1) {
        for (i = 0; i < days; i++) {
            let deathID = (function () {
                if (playersID[death[2 * i]] == "killers") {
                    return "杀手"
                } else {
                    return "平民"
                }
            })()
            killInformation[i].innerHTML = "昨夜死亡的玩家是" + Number(death[2 * i] + 1) + "号，" + "他的身份是" + deathID;
        }
    }
    for (let i = 0; i < days - 1; i++) {
        let deathID = (function () {
            if (playersID[death[2 * i]] == "killers") {
                return "杀手"
            } else {
                return "平民"
            }
        })()
        killInformation[i].innerHTML = "昨夜死亡的玩家是" + Number(death[2 * i] + 1) + "号，" + "他的身份是" + deathID;
        if (sessionStorage.whichHTML == "投票页") {
            let deathID = (function () {
                if (playersID[death[2 * i + 1]] == "killers") {
                    return "杀手"
                } else {
                    return "平民"
                }
            })()
            pushInformation[i].innerHTML = "被投死的玩家是" + Number(death[2 * i + 1] + 1) + "号，" + "他的身份是" + deathID
        }
    }
}

//读取当前状态
var onstate = sessionStorage.state;
// console.log(onstate)
//判断当前状态，设置状态机的初始状态
var onstate = (function check() {
    if (onstate == "canGoast") {
        return "canGoast";
    } else if (onstate == "nextDay") {
        return "nextDay";
    } else {
        return "canKill"
    }
})();
// console.log(onstate);
//回到此页面时恢复页面状态
//最新的一天，点击过的li变色
if (onstate != "canKill") {
    kill[days - 1].style.backgroundColor = "#999";
    triangle[(days - 1) * 4].style.borderColor = "transparent #999";
    if (onstate == "nextDay") {
        goast.style.backgroundColor = "#999";
        triangle[(days - 1) * 4 + 1].style.borderColor = "transparent #999";

        player.style.backgroundColor = "#999";
        triangle[(days - 1) * 4 + 2].style.borderColor = "transparent #999";

        vote.style.backgroundColor = "#999";
        triangle[(days - 1) * 4 + 3].style.borderColor = "transparent #999";
    } else {}
}
//昨天之前全变灰色
for (i = 0; i < days - 1; i++) {
    kill[i].style.backgroundColor = "#999";
    goast[i].style.backgroundColor = "#999";
    player[i].style.backgroundColor = "#999";
    vote[i].style.backgroundColor = "#999";
}
//li之前的三角变灰色
for (i = 0; i < (days - 1) * 4; i++) {
    triangle[i].style.borderColor = "transparent #999";
}
//设置title为第几天
for (i = 0; i < days; i++) {
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
    theDay[i].innerHTML = "第" + whichDay + "天"
}
//折叠昨天之前的天数
for (i = 0; i < days - 1; i++) {
    content[i].style.display = "none"
}
//开关
for (let i = 0; i < days; i++) {
    theDay[i].onclick = function () {
        if (content[i].style.display != "none") {
            content[i].style.display = "none";
        } else {
            content[i].style.display = "block";
        }
    }
}
//右上角×的结束游戏功能
document.getElementsByClassName("help")[0].onclick = function () {
    let mymessage = confirm("真的要退出游戏吗？");
    if (mymessage == true) {
        location = "js-task2.1.html"
        sessionStorage.over="over";
    } else if (mymessage == false) {}
}
//左上角返回上一页
document.getElementsByClassName("back")[0].onclick=function(){
    window.history.back();
}
//按钮功能和法官查看功能
document.getElementsByClassName("over")[0].onclick=function(){
    let mymessage = confirm("真的要退出游戏吗？");
    if (mymessage == true) {
        location = "js-task2.3.html"
        sessionStorage.over="over";
        if(sessionStorage.check){
            sessionStorage.removeItem("check");
        }
    } else if (mymessage == false) {}
}
document.getElementsByClassName("check")[0].onclick=function(){
    location="js-task2.2.html"
    sessionStorage.check="sfdaj"
}
//创建有限状态机
var fsm = StateMachine({
    init: onstate,
    transitions: [{
            name: 'killClick',
            from: 'canKill',
            to: 'canGoast'
        },
        {
            name: 'goastClick',
            from: 'canGoast',
            to: 'canPlayer'
        },
        {
            name: 'playerClick',
            from: 'canPlayer',
            to: 'canVote'
        },
        {
            name: 'voteClick',
            from: 'canVote',
            to: 'canKill'
        }
    ],
    methods: {
        //抛出错误
        onInvalidTransition: function (transition, from, to) {
            switch (from) {
                case 'canKill':
                    alert("请按步骤操作");
                    break;
                case 'canGoast':
                    alert("请按步骤操作");
                    break;
                case 'canPlayer':
                    alert("请按步骤操作");
                    break;
                case 'canVote':
                    alert("请按步骤操作");
                    break;
            }
        },
        onKillClick: function () {
            kill[days - 1].style.backgroundColor = "#999";
            triangle[(days - 1) * 4 + 0].style.borderColor = "transparent #999";
            sessionStorage.state = fsm.state;
            window.location = "./js-task-kill.html"

        },
        onGoastClick: function () {
            alert("亡灵开始BB")
            goast[days - 1].style.backgroundColor = "#999";
            triangle[(days - 1) * 4 + 1].style.borderColor = "transparent #999";
        },
        onPlayerClick: function () {
            alert("玩家开始BB")
            player[days - 1].style.backgroundColor = "#999";
            triangle[(days - 1) * 4 + 2].style.borderColor = "transparent #999";
        },
        onVoteClick: function () {
            vote[days - 1].style.backgroundColor = "#999";
            triangle[(days - 1) * 4 + 3].style.borderColor = "transparent #999";
            sessionStorage.state = fsm.state;
            sessionStorage.whichHTML = "投票页";
            sessionStorage.anhao = "dk";
            let dayArray1 = JSON.parse(sessionStorage.Days);
            dayArray1.push("a")
            sessionStorage.Days = JSON.stringify(dayArray1);
            window.location = "./js-task-kill.html"
        }
    }
});
//给最新的一天绑定点击事件。并将状态机点击事件也一起绑定。
console.log(days);
kill[days - 1].addEventListener("click", function () {
    fsm.killClick();
})
goast[days - 1].addEventListener("click", function () {
    fsm.goastClick();
})
player[days - 1].addEventListener("click", function () {
    fsm.playerClick();
})
vote[days - 1].addEventListener("click", function () {
    fsm.voteClick();
})
