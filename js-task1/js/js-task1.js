function change() {
    var a = Math.floor(Math.random() * 9);
    var d = Math.floor(Math.random() * 9);
    //让d和a不同赋值
    while (d == a) {
        d = Math.floor(Math.random() * 9);
    }
    //赋值c和a与d都不同
    var c = Math.floor(Math.random() * 9);
    while (c == a || c == d) {
        c = Math.floor(Math.random() * 9);
    }
    //第一组随机色
    var r1 = Math.floor(Math.random() * 256);
    var g1 = Math.floor(Math.random() * 256);
    var b1 = Math.floor(Math.random() * 256);
    var rgb1 = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')';
    //第二组随机色
    var r2 = Math.floor(Math.random() * 256);
    var g2 = Math.floor(Math.random() * 256);
    var b2 = Math.floor(Math.random() * 256);
    var rgb2 = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';
    //第三组随机色
    var r3 = Math.floor(Math.random() * 256);
    var g3 = Math.floor(Math.random() * 256);
    var b3 = Math.floor(Math.random() * 256);
    var rgb3 = 'rgb(' + r3 + ',' + g3 + ',' + b3 + ')';
    //随机获取三个格子改变颜色
    document.getElementsByTagName('div')[a].style.backgroundColor = rgb1; //方法一、使用标签名
    document.getElementsByTagName('div')[d].style.backgroundColor = rgb2;
    document.getElementsByTagName('div')[c].style.backgroundColor = rgb3;

    // document.getElementById('box' + a).style.backgroundColor = rgb1;//方法二、使用ID
    // document.getElementById('box' + d).style.backgroundColor = rgb2;
    // document.getElementById('box' + c).style.backgroundColor = rgb3;
}

//恢复橘色
function recover() {
    for (var i = 0; i < 9; i++) {
        document.getElementById('box' + i).style.backgroundColor = "orange";
    }
}

//此动作为先改变颜色，0.999s后恢复为橘色
function flash() {
    setTimeout(change, 000);
    setTimeout(recover, 999);
}

//定义变量但不赋值
var lalala;

//闪之前先clear，避免叠加。给上面的函数嵌套1s的循环
function dididi() {
    clearInterval(lalala);
    lalala = setInterval(flash, 1000);
}

//使用刚定义的变量clear
function stopFlash() {
    recover();
    clearInterval(lalala);
}