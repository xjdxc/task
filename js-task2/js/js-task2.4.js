//获得页面初加载时玩家数量的值
var players = document.getElementById("amount").value;
//初始化杀手数量
var killers = Math.round(players / 4);
//初始化平民数量
var normals = players - killers;
//给初始页面杀手数量赋值
document.getElementById("killers").innerHTML = killers;
//初始页面平民数量赋值
document.getElementById("normals").innerHTML = normals;
//限制玩家数量只能输入数字
document.getElementById("amount").oninput = function () {
    this.value = this.value.replace(/\D/g, '')
}

//onkeyup事件，监听输入的玩家数量，及时在页面反馈杀手与平民数量
document.getElementById("amount").onkeyup = function () {
    //监听各位置数量
    players = document.getElementById("amount").value;
    killers = Math.round(players / 4);
    normals = players - killers;
    //数量满足条件时赋值
    if (4 <= players && players <= 18) {
        document.getElementById("killers").innerHTML = killers;
        document.getElementById("normals").innerHTML = normals;
    }
    //数量不满足条件赋值为空
    if (players > 18 || players < 4) {
        document.getElementById("killers").innerHTML = "";
        document.getElementById("normals").innerHTML = "";
    }
}

//onchange事件，失去焦点时检查玩家数量是否正确，如错误弹窗提示
document.getElementById("amount").onchange = function () {
    this.value = document.getElementById("amount").value;
    if (players < 4 || players > 18) {
        alert("请输入正确数量的玩家")
    }


}

document.getElementsByClassName("go")[0].onclick = function () {
    if (players < 4 || players > 18) {
        alert("请正确输入玩家数量")
    } else {
        //失去焦点时创建数组并乱序。
        //创建一个数组a，元素数量为杀手数量
        var a = new Array(killers)
        var i = 0;
        var j = 0;
        while (i < a.length) {
            a[i] = "killers";
            i++;
        }
        // console.log(a)
        //创建一个数组b，元素数量为平民数量
        var b = new Array(normals)
        while (j < b.length) {
            b[j] = "normals";
            j++;
        }
        // console.log(b)
        //创建数组c代表玩家,身份已被赋值
        var c = a.concat(b);
        // console.log(c[3])
        //方法一
        //创建一个空数组用来储存打乱后的身份
        // var d = [];
        // while (c.length) { //遍历c数组
        //     //设置一个变量e用来储存随机出来的数值
        //     var e = Math.floor(Math.random() * c.length);
        //     //将这个数值放入空数组d中
        //     d.push(c[e]) //c数组的第e个数放进d数组中
        //     //删除c数组中第c个数
        //     c.splice(e, 1);
        // }
        // var e = JSON.stringify(d)//将数组d转化为字符串e
        // sessionStorage.Array = e;//储存字符串e
        // console.log(e)

        //方法二
        for (i = c.length;0<i && i<=c.length ;i--) {
            //创建一个变量f作为被交换的元素位置
            var f = Math.floor(Math.random() * i);
            // console.log(f)
            //创建一个变量空杯g
            var g = c[i-1];
            // console.log(g)
            c[i-1] = c[f];
            c[f] = g;
        }
        var h = JSON.stringify(c)//将数组c转化为字符串h
        sessionStorage.killersLength=a.length//储存杀手人数
        sessionStorage.normalsLength=b.length//储存平民人数
        // console.log(sessionStorage.normalsLength)
        // console.log(sessionStorage.killersLength)
        sessionStorage.fuck = h;//储存字符串h
        sessionStorage.setItem("hiphop",h)
        // console.log(sessionStorage.fuck)
        // console.log(sessionStorage.getItem("hiphop"))
        window.location="./js-task2.5.html"
    }
}