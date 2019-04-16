let amount = document.getElementById("amount").value; //获取输入值赋值给变量
let slide = document.getElementById("range").value; //获取滑动条值赋值给变量
let killers = Math.round(amount / 4); //计算杀手数量
let normals = amount - killers; //计算平民数量
//封装函数，获取玩家人数并在页面动态展现
function initialization() {
    amount = document.getElementById("amount").value;
    slide = document.getElementById("range").value;
    killers = Math.round(amount / 4);
    normals = amount - killers;
    $("#killers").text(killers);
    $("#normals").text(normals);
    $("#range").val(amount);
}
//立即执行，初始化玩家人数
$(function () {
    initialization();
});
//模拟js的oninput事件  只能输入数字
$("#amount").bind('input ', function () {
    $(this).val($(this).val().replace(/\D/g, ''));
})
//根据玩家输入的数字动态改变杀手与平民配比
$("#amount").keyup(function () {
    amount = document.getElementById("amount").value;
    if (amount < 4 || amount > 18) {
        $("#killers").text('');
        $("#normals").text('');
    } else {
        initialization();
    }
})
//玩家数量输入错误，失去焦点时警告
$("#amount").change(function () {
    if (amount > 18 || amount < 4) {
        alert("请输入正确的玩家数量");
    }
})
//滑动条设置玩家数量
$("#range").bind('input propertychange', function () {
    // $("#amount").val($("#range").val())
    // amount = document.getElementById("amount").value
    amount = $("#range").val()
    killers = Math.round(amount / 4);
    normals = amount - killers;
    $("#killers").text(killers);
    $("#normals").text(normals);
    $("#amount").val(amount);
})
//滑动条左右的加减号赋予功能
$(".minus").click(function () {
    amount = document.getElementById("amount").value - 1;
    if (amount >= 4 && amount <= 18) {
        killers = Math.round(amount / 4);
        normals = amount - killers;
        $("#killers").text(killers);
        $("#normals").text(normals);
        $("#amount").val(amount);
        $("#range").val(amount);
    } else {
        alert("请输入正确的玩家数量")
    }
})

$(".maxus").click(function () {
    amount = Number(document.getElementById("amount").value) + 1;
    if (amount >= 4 && amount <= 18) {
        killers = Math.round(amount / 4);
        normals = amount - killers;
        $("#killers").text(killers);
        $("#normals").text(normals);
        $("#amount").val(amount);
        $("#range").val(amount);
    } else {
        alert("请输入正确的玩家数量")
    }
})
let players //创建一个元素数量为玩家人数的数组
$(".go").click(function () {
    amount = Number(document.getElementById("amount").value)
    if (amount < 4 || amount > 18) {
        alert("请输入正确的玩家数量");
    } else {
        players = new Array(amount)
        //给数组元素赋值，也就是身份
        for (i = 0; i < players.length; i++) {
            if (i < killers) {
                players[i] = "killers";
            } else {
                players[i] = "normals";
            }
        }
        console.log(players)
    }
    //打乱玩家身份
    for (i = players.length - 1; i >= 0; i--) {
        //选取一个随机数用来和交换
        let randomNumber = Math.floor(Math.random() * (Number(i) + 1));
        //创建一个空杯变量
        let emptyCup;
        emptyCup = players[i];
        players[i] = players[randomNumber];
        players[randomNumber] = emptyCup;
    }
    // console.log(players)
    sessionStorage.playersArr=JSON.stringify(players);//玩家身份转换字符串并储存
    sessionStorage.killersNumber=killers;
    sessionStorage.normalsNumber=normals;
    // console.log(killers)
    // console.log(normals)
    window.location.href="look.html";
})