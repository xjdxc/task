//读取储存的数据并转化为数组存在变量a中
let a = JSON.parse(sessionStorage.fuck)
console.log(a)
//设置变量b为数组元素个数
let b = a.length
console.log(b)
//parent为要插入元素的父节点.child为要插入的子节点
let parent = document.getElementsByClassName("box2")[0];
let child = document.getElementsByClassName("box3")[0];
//因为原来有一个box，插入i-1个box
for (let i = 1; i < b; i++) {
    //先克隆child
    let node = child.cloneNode(true);
    //向parent里插入克隆体
    parent.appendChild(node);
}

for (let i = 0; i < b; i++) {
    //获取玩家号码
    let number = document.getElementsByClassName("number");
    //设置玩家号码
    number[i].innerHTML = Number(i + 1) + "号"
    //获取玩家身份DOM节点
    let people = document.getElementsByClassName("people");
    //i-1个玩家对应i-1个身份，如果身份是杀手输出杀手，是平民输出平民people
    if (a[i] == "killers") {
        people[i].innerHTML = "杀手"
    } else {
        people[i].innerHTML = "平民"
    }
}
//杀手页
/************************************************************************/
//初始化页面
if (sessionStorage.whichHTML == "投票页") {
    let heading = document.getElementsByClassName("heading")[0];
    let vote = document.getElementsByClassName("vote")[0];
    let most = document.getElementsByTagName("button")[0];
    heading.innerHTML = "投票";
    vote.innerHTML = "投出你心目中的那一票！";
    most.innerHTML = "投票";
}
let target = document.getElementsByClassName("box4");
let people = document.getElementsByClassName("people");
let number = document.getElementsByClassName("number");
//死亡名单存储到数组asd中
if (sessionStorage.Death) {
    var asd = JSON.parse(sessionStorage.Death)
    console.log(typeof (asd[0]))
    //渲染死亡box
    for (let i = 0; i < asd.length; i++) {
        target[asd[i]].style.borderColor = "black";
        people[asd[i]].style.backgroundColor = "#999"
        number[asd[i]].style.backgroundColor = "#999"
    }
}
/************************************************************************/
var firstClick;
var secondClick;
let knife = document.getElementsByClassName("skill");
//如果有死亡名单，读取并储存为数组
if (sessionStorage.Death) {
    var Death1 = JSON.parse(sessionStorage.Death)
}
//点击box事件
for (let i = 0; i < b; i++) {
    target[i].index = i;
    target[i].onclick = function () {
        firstClick = target[i].index;
        //如果有死亡名单且此次选择的人在死亡名单中
        if (sessionStorage.Death && (asd.indexOf(firstClick) > -1)) {
            alert("不可以鞭尸")
        }
        //没有暗号，代表是杀手页。不可以投杀手。此时肯定不是第一次出人
        else if (a[firstClick] == "killers" && (!sessionStorage.anhao)) {
            alert("我杀我自己？")
            firstClick = secondClick;
            console.log(firstClick)
        }
        //第一次出人时
        else if (secondClick == undefined) {
            target[firstClick].style.borderColor = "black";
            knife[firstClick].style.display = "block"
            secondClick = firstClick;
            console.log(firstClick)
        }
        //这一次点击的box和上一次不一样
        else if (firstClick == secondClick){
            target[firstClick].style.borderColor = "black"
            knife[firstClick].style.display = "block"
            secondClick = firstClick;
        }
        else {
            target[firstClick].style.borderColor = "black"
            target[secondClick].style.borderColor = "#fff"
            knife[firstClick].style.display = "block"
            knife[secondClick].style.display = "none"
            secondClick = firstClick;
            console.log(firstClick)
        }
    }
}
//创建数组储存死亡信息
var deathNumber = [];
document.getElementsByTagName("button")[0].onclick = function () {
    console.log(firstClick)
    //如果没选人
    if (firstClick == undefined) {
        alert("杀人啊兄弟")
    }
    //选人了
    else {
        //如果有暗号，删除掉以备下次接收
        if (sessionStorage.anhao) {
            sessionStorage.removeItem("anhao")
        }
        //出局的号码放入数组内并储存为Death字符串
        //先读取之前的数组，加入数字后再存！！！
        if (sessionStorage.Death) {
            var guodu = JSON.parse(sessionStorage.Death)
            guodu.push(firstClick)
            sessionStorage.Death = JSON.stringify(guodu)
        } else {
            deathNumber.push(firstClick)
            sessionStorage.Death = JSON.stringify(deathNumber);
        }
        //读取杀手和平民存活数
        let KillersLength = sessionStorage.killersLength;
        let NormalsLength = sessionStorage.normalsLength;

        //根据此次出局人身份，相应群体人数-1
        if (a[firstClick] == "killers") {
            KillersLength = KillersLength - 1
            sessionStorage.killersLength = KillersLength
        } else {
            NormalsLength = NormalsLength - 1
            sessionStorage.normalsLength = NormalsLength
        }
        console.log(KillersLength)
        console.log(NormalsLength)
        //判断游戏是否结束
        if ((KillersLength >= NormalsLength) || (KillersLength == 0)) {
            window.location = "js-task2.3.html"
        } else {
            window.location = "js-task2.6.html"
         
        }
    }
}