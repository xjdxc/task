//读取储存的数组
let a = JSON.parse(sessionStorage.getItem("hiphop"))
console.log(typeof "a")
console.log(a)
let c = a.length
// console.log(c)
//初始化点击数
var counter = 0;
document.getElementsByClassName("look")[0].onclick = function () {
    //记录button点击数
    counter += 1;
    //给b变量赋值点击数
    let b = counter;
    console.log(b);
    //把要显示和隐藏的标签名赋值给变量
    let inverse = document.getElementsByClassName("inverse")[0];
    let face = document.getElementsByClassName("face")[0];
    let identity = document.getElementsByClassName("identity")[0];
    //设置变量i用来遍历数组a，根据点击数和数组下标的关系
    let i = Math.floor(b / 2)

    if (i < c) {
        document.getElementsByClassName("number")[0].innerHTML = i + 1
    } else {}
    //当点击数为奇数正面出现
    if ((b % 2) == 1) {
        inverse.style.display = "none";
        face.style.display = "block";
        identity.style.display = "block";
        if (i < c - 1) {
            document.getElementsByClassName("look")[0].innerHTML = "隐藏并传递给" + Number(i + 2) + "号"
        } else {
            document.getElementsByClassName("look")[0].innerHTML = "法官查看"
        }
        if (a[i] == "normals") {
            document.getElementsByClassName("identity")[0].innerHTML = "平民"
        } else {
            document.getElementsByClassName("identity")[0].innerHTML = "杀手"
        }

    }
    //点击数为双数反面出现
    else {
        if (i < c) {
            document.getElementsByClassName("look")[0].innerHTML = "查看" + Number(i + 1) + "号身份"
        } else {}
        inverse.style.display = "block";
        face.style.display = "none";
        identity.style.display = "none";
        if (i < c) {} else {
            window.location = "js-task2.2.html"
        }
    }
}