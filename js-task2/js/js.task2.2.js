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
    number[i].innerHTML=Number(i+1)+"号"
    //获取玩家身份DOM节点
    let people = document.getElementsByClassName("people");
    //i-1个玩家对应i-1个身份，如果身份是杀手输出杀手，是平民输出平民
    if(a[i] == "killers"){
        people[i].innerHTML="杀手"
    }
    else{
        people[i].innerHTML="平民"
    }
}
let number = document.getElementsByClassName("number");
let people = document.getElementsByClassName("people");
let wrap = document.getElementsByClassName("box4");
if(sessionStorage.Death){
    let death = JSON.parse(sessionStorage.Death);
    let deathLength = death.length;
    for (let i = 0; i<deathLength;i++){
        number[death[i]].style.background="#999";
        people[death[i]].style.background="#999";
        wrap[death[i]].style.borderColor="black";
    }
}

if(sessionStorage.check){
    document.getElementsByTagName("button")[0].innerHTML="返回"
}

document.getElementsByTagName("button")[0].onclick=function(){
    if(sessionStorage.check){
        sessionStorage.removeItem("check");
    }
    location="js-task2.6.html"
}