let players = JSON.parse(sessionStorage.playersArr);
if (!sessionStorage.Days) {
    //第一次进入游戏设置天数变量并储存
    let dayArray = new Array("a");
    var days = dayArray.length; //天数
    sessionStorage.Days = JSON.stringify(dayArray);
    console.log(days);
    console.log(typeof (dayArray));
    //天数为days，days为数组dayArray的个数.储存数组dayArray
} else {
    //不是第一次进入游戏，读取第几天变量
    let dayArray = JSON.parse(sessionStorage.Days);
    var days = dayArray.length;
    console.log(dayArray);
    console.log(days);
}
//根据第几天插入几个day信息框
for (let i = 1; i < days; i++) {
    let node = $(".Day").eq(0).clone(true);
    $(".nothing").eq(0).append(node);
}

//设置title为第几天
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
    $(".theDay").eq(i).text("第"+whichDay+"天")
}

//折叠昨天之前的天数
for (i = 0; i < days - 1; i++) {
    $(".content").eq(i).css("display","none")
}

//展示死亡信息
if (sessionStorage.nightList) { //杀人信息
    let nightlist = JSON.parse(sessionStorage.nightList);
    for (let i = 0; i < days; i++) {
        if (nightlist[i] != undefined) {
            $(".killInformation").eq(i).text("昨夜死亡的玩家是" + Number(nightlist[i] + 1) + "号，" + "他的身份是平民");
        }
    }
}
if (sessionStorage.nightList) { //投票信息
    let daylist = JSON.parse(sessionStorage.dayList);
    let pushID;
    for (let i = 0; i < days; i++) {
        if (players[daylist[i]] == "killers") {
            pushID = "杀手";
        } else {
            pushID = "平民";
        }
        if (daylist[i] != undefined) {
            $(".pushInformation").eq(i).text("投票出局的玩家是" + Number(daylist[i] + 1) + "号，" + "他的身份是" + pushID);
        }
    }
}

//设置回到此页面时的状态
//过去的天数，点击过的li变灰色
for (let i = 0; i < days - 1; i++) {
    $(".kill").eq(i).css("background-color", "#999")
    $(".goast").eq(i).css("background-color", "#999")
    $(".player").eq(i).css("background-color", "#999")
    $(".vote").eq(i).css("background-color", "#999")
}
for (i = 0; i < (days - 1) * 4; i++) {
    $(".triangle").eq(i).css("border-color", "transparent #999")
}
//当天点击过的li变灰色
if (sessionStorage.state) {
    if (sessionStorage.state == "canGoast") {
        $(".kill").eq(days - 1).css("background-color", "#999")
        $(".triangle").eq((days - 1) * 4).css("border-color", "transparent #999")
    }
}

//设置变量储存有限状态机的状态
let onstate = function () {
    if (sessionStorage.state == "canGoast") {
        return "canGoast";
    } else {
        return "canKill";
    }
}()
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
            $(".kill").eq(days - 1).css("background-color", "#999");
            $(".triangle").eq((days - 1) * 4).css("border-color", "transparent #999");
            sessionStorage.state = fsm.state; //储存状态
            window.location = "kill.html"
        },
        onGoastClick: function () {
            alert("亡灵开始发表遗言");
            $(".goast").eq(days - 1).css("background-color", "#999");
            $(".triangle").eq((days - 1) * 4 + 1).css("border-color", "transparent #999");
        },
        onPlayerClick: function () {
            alert("玩家开始讨论");
            $(".player").eq(days - 1).css("background-color", "#999");
            $(".triangle").eq((days - 1) * 4 + 2).css("border-color", "transparent #999");
        },
        onVoteClick: function () {
            $(".vote").eq(days - 1).css("background-color", "#999");
            $(".triangle").eq((days - 1) * 4 + 3).css("border-color", "transparent #999");
            window.location = "kill.html"
            sessionStorage.state = fsm.state; //储存状态
            sessionStorage.anhao = "anhao"; //投票页面的暗号
        }
    }
})
//给最新的一天绑定点击事件。并将状态机点击事件也一起绑定。
$(".kill").eq(days - 1).click(function () {
    fsm.killClick()
})
$(".goast").eq(days - 1).click(function () {
    fsm.goastClick();
})
$(".player").eq(days - 1).click(function () {
    fsm.playerClick();
})
$(".vote").eq(days - 1).click(function () {
    fsm.voteClick();
})

//折叠显示按钮
for (let i = 0; i < days; i++) {
    $(".theDay").eq(i).click(function () {
        $(".content").eq(i).toggle();
    })
}

//返回上一页
$(".back").click(function(){
    window.history.back()
})

//结束游戏
function over(){
    let message = confirm("确定要退出游戏吗？")
    if(message == true){
        sessionStorage.over="over"
        location="finally.html"
    }else{}
}
$(".help").click(function(){
    over();
})
$(".over").click(function(){
    over();
})

//法官查看
$(".check").click(function(){
    location="check.html";
    sessionStorage.check="check";
})

