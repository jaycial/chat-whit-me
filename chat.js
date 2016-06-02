var divId = 1;
var sendArr = new Array();
var receivArr = new Array();
var tempArr = new Array();
window.onload = function () {
  var browser = navigator.appName
	if (browser == "Microsoft Internet Explorer") {
		alert("您的浏览器内核版本过低不能正常访问本站，请下载最新主流内核版本浏览器");
		window.location.href = "http://www.firefox.com.cn/download/";
	}
}
/*监测键盘录入*/
document.onkeydown = KeyPress; 
function KeyPress() {
    var key; 
    key = KeyPress.arguments[0].keyCode; 
    var oEvent = window.event;  
    if(key==13){
        input();
    }
    if((oEvent.ctrlKey)&&(key==81)){
        change();
    }
}
function change() {
    /*两个数组的值进行相互替换*/
    tempArr = [];
    tempArr = receivArr.concat();
    receivArr = [];
    receivArr = sendArr.concat();
    sendArr = [];
    sendArr = tempArr.concat();
    /*替换样式*/
    for (var i = 0; i < sendArr.length; i++) {
        document.getElementById(sendArr[i]).className = "sender";
        document.getElementById('triangle' + sendArr[i]).className = "left_triangle";
        document.getElementById("pic" + sendArr[i]).src = "chat/sender.png";

    }
    for (var i = 0; i < receivArr.length; i++) {
        document.getElementById(receivArr[i]).className = "receiver";
        document.getElementById('triangle' + receivArr[i]).className = "right_triangle";
        document.getElementById("pic" + receivArr[i]).src = "chat/receiver.png";
    }
}
function input() {
    var text = document.getElementById('text').value;
    if (text.length > '0') {
        /*控制页面中只显示15个消息气泡*/
        if (divId > 15) {
            var hideId = divId - 15;
            /*隐藏当前第一个气泡*/
            document.getElementById(hideId).className = "hide";
            /*receive数组出队*/
            receivArr.shift();
        }
        /*添加一个外包元素sender*/
        var message = document.getElementById('message');
        var div1 = document.createElement("div");
        div1.className = "receiver";
        div1.setAttribute("id", divId);
        message.appendChild(div1);

        /*获取刚添加的元素为父节点，向其中添加imgDiv*/
        var sender = document.getElementById(divId);
        var div2 = document.createElement("div");
        div2.setAttribute("id", "img" + divId);
        sender.appendChild(div2);

        /*继续添向sender里添加textDiv*/
        var div3 = document.createElement("div");
        div3.setAttribute("id", "text" + divId);
        sender.appendChild(div3);

        /*向imgDiv里添加头像图片*/
        var imgDiv = document.getElementById("img" + divId);
        var img = document.createElement("img");
        img.setAttribute("id", "pic" + divId);
        img.src = "chat/receiver.png";
        imgDiv.appendChild(img);
        /*向textDiv里添加文本消息和消息箭头 */
        var textDiv = document.getElementById('text' + divId);
        var div4 = document.createElement("div");
        div4.setAttribute("id", "triangle" + divId);
        div4.className = "right_triangle";
        textDiv.appendChild(div4);
        var span = document.createElement("span");
        span.innerHTML = text;
        textDiv.appendChild(span);
        /*内容添加完成，清空文本框内容，divId添加到receive数组中，并自加1*/
        document.getElementById('text').value = "";
        receivArr.push(divId);
        divId++;
        /*将div滚动条移动到div底部*/
        document.getElementById('message').scrollTop = document.getElementById('message').scrollHeight;
    }
    else {
        return;
    }
}
/*文本框获得焦点时的函数*/
function textOnfocus() {
    document.getElementById("state").innerHTML = "没有人正在输入....";
}
/*文本框失去焦点时的函数*/
function textOnblur() {
    document.getElementById("state").innerHTML = "没有人正在与你聊天";
}