window.addEventListener("load", function(){
    var section = document.querySelector("#s13");

    var container = section.querySelector(".container");
    var box = container.querySelector(".box");

    var down = false;
    //var offX = 0;
    //var offY = 0;
    var offset = {x:0, y:0};

    box.onclick = function(e) {
        offset.x = e.x;
        offset.y = e.y;
        console.log(offset);

    }

    container.onmousedown = function(e) {
        console.log("down");
        down = true;
        // box.style.left = e.x + "px";
        // box.style.top = e.y + "px";
    };

    container.onmouseup = function() {
        console.log("up");
        down= false;
    };

    container.onmouseenter = function() {
        console.log("enter");
    };

    container.onmouseleave = function() {
        console.log("leave");
    };

    container.onmouseout = function() {
        console.log("out");
    };

    container.onmousemove = function(e) {
        if(down) {
        box.style.left = e.x + "px";
        box.style.top = e.y + "px";
        //console.log("move");
        // console.log("clientX:" + e.x); //clientX
        // console.log("clientY:" + e.y);//clientY
    }
    };
    
    container.onmouseover = function() {
        console.log("over");
    };

});


//--s12 트리거-------------------------------------------------------------------
window.addEventListener("load", function(){
    
    var section = document.querySelector("#s12");
    var fileBtn = section.querySelector(".file-button");
    var file = section.querySelector("input[type=file]")
   
    fileBtn.onclick = function(e){
        var event = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
          });
          
          file.dispatchEvent(event);
        };
});

// var fileBtn = Document.getElementById("file-button");
//     fileBtn.addEventListener("click", function() { 
//         var event = new MouseEvent("click", {
//             'view':window,
//             'bubbles': true,
//             'cancelable':true

//         });

//         var file = document.getElementById("gallery-file");
//         file.dispatchEvent(event);
// });




//----Ajax-------------------------------------------------------
window.addEventListener("load", function(){
    var section = document.querySelector("#s11");
    var button1 = section.querySelector(".button1");
	var tbody = section.querySelector("tbody");    
	var pager = section.querySelector(".pager");

	pager.onclick = function(e){
		e.preventDefault();		
		var page = parseInt(e.target.innerText);
		console.log(page);
		
		load(page);
	}

    button1.onclick = function(){   
        load();
    }

	function load(page){				
		
		if(page == undefined)
			page = 1;
				
		var request = new XMLHttpRequest();
		//request.onreadystatechange = function(){
		request.onload = function(){
            //if(request.readyState == 4){
	
				tbody.innerHTML = "";
	
				var notices = JSON.parse(request.responseText);				
				
				for(var i=0; i<notices.length; i++){
					var n = notices[i];
					var tr = '<tr> \
								<td>'+n.id+'</td> \
								<td><a href="detail.html">'+n.title+'</a></td> \
								<td>'+n.writerId+'</td> \
								<td> \
									2019-08-18 \
								</td> \
								<td>146</td> \
								<td><a href="">수정</a><a href="">삭제</a></td> \
							</tr>';
							
					tbody.insertAdjacentHTML('beforeend', tr);
				//}
				//tobdy.appendChild(node Object)
				//tbody.append("textnode")					
			}            	
        };
        request.open("GET", "/api/board/notice/list?p="+page, true);
        request.send();
	}
});



/*window.addEventListener("load", function () {
    var section = document.querySelector("#s11");
    var button1 = section.querySelector(".button");
    var tbody = section.querySelector("tbody");    
	var pager = section.querySelector(".page");
	
	page.onclick = function(e){
		e.preventDefault();  //버블링	
		var page =      parseInt(e.target.innerText);   //문자로 들어오기때문에 parse해주자.   
		load(page);
	};
	
	
    button1.onclick = function(){   
        var request = new XMLHttpRequest();
      //request.onreadystatechange = function(){
    	request.onload = function(){
            //if(request.readyState == 4){
   
            var notices = JSON.parse(request.responseText);            

			

            
            for(var i=0; i<notices.length; i++){
               var n = notices[i];
               var tr = '<tr> \
	                        <td>'+n.id+'</td> \
	                        <td><a href="detail.html">'+n.title+'</a></td> \
	                        <td>'+n.writerId+'</td> \
	                        <td> \
	                           2019-08-18 \
	                        </td> \
	                        <td>'+n.hit+'</td> \
                        </tr>';
                     
               tbody.insertAdjacentHTML('beforeend', tr);
           }               
					            //tobdy.appendChild(node Object)
					            //tbody.append("textnode")               
        };
        request.open("GET", "/api/board/notice/list", true);
        request.send();



		}       
});*/

// window.addEventListener("load", function(){
//     var s11 = document.querySelector("#s11");
//     var button1 = s11.querySelector(".button1");

//     button1.onclick = function(){
//         var request = new window.XMLHttpRequest();//window생략rksmd
//         request.open("GET", "/data.txt", false);
//         request.send();

//         alert(request.responseText);
//     };
// });


//! ==============s10 이벤트 객체==============
window.addEventListener("load", function() {
    var s10 = document.querySelector("#s10");  //# 은 css구문따름
    var prevButton = s10.querySelector(".prev-button");
    var nextButton = s10.querySelector(".next-button");
    var ul = s10.querySelector("ul");
    var showRoom = s10.querySelector(".show-room");
    var showRoomImg = showRoom.firstElementChild;
    
    var current = ul.querySelector("li:nth-child(4)");
    var index = 0;

    showRoomImg.style.transition = "540ms";
    
    //* 이벤트 캡처링: 부모에서 자식을 차단
    //addEventListener와 onclick의 차이
        //= addEventListener는 중첩, 세번째인자사용가능. onclick은 대치됨.
    showRoom.addEventListener("click", function(e){
        // e.stopPropagation();  //부모쪽에서 설정하면 자식에게 버블링 막음.
        console.log("부모");
        showRoomImg.style.transform = "scale(1.2, 1.2)";
    }, true);
    
    showRoomImg.onclick = function(e){
        // if(조건처리가능)
        e.stopPropagation(); //자식 쪽에서 설정하면 부모에게 버블링 막음.
        console.log("자식");
        // showRoomImg.style.width = "";
        e.target.style.transform = "scale(1.5, 1.5)";
    };


    //*이벤트 버블링에 대한 문제와 해결방법: e.stopPropagetion 버블링차단.
    /* showRoomImg.style.transition = "540ms";
    
    showRoom.onclick = function(e){
        console.log("부모");
        showRoomImg.style.transform = "scale(1.2, 1.2)";
    };
    
    showRoomImg.onclick = function(e){
        e.stopPropagation();
        console.log("자식");
        // showRoomImg.style.width = "";
        e.target.style.transform = "scale(1.7, 1.7)";
    }; */

    
    //*3단계: 하수를 면하는 방법
    ul.onclick = function(e){
        if(e.target.tagName != "IMG") //타켓의 태그이름을 비교
            return;

        current.classList.remove("current");
        current = e.target.parentElement;
        current.classList.add("current");
        // 현재선택된
        var newImg = current.firstElementChild;
        showRoomImg.src = newImg.src;

    };

    //*1단계: 가장 복잡하고 가장 바람직하지 않은 방법.
    //왜문제가될까? 반복문+function(e)객체재차생성
    /* var imgs = s10.querySelectorAll("ul img");
    for(var i=0;i<imgs.length;i++)
        imgs[i].onclick =function(e) {
            
            current.classList.remove("current");
            current = e.target.parentElement;
            current.classList.add("current");

            //현재 선택된 것
            var newImg = current.firstElementChild;
            showRoomImg.src = newImg.src;
        }; */

    prevButton.onclick = function(e){/** return으로 바로 빠져나올 수 있다. */ 
        e.preventDefault();//a, submit같은 태그의 기본이벤트를 막아준다.
        if(current.previousElementSibling == null){
            alert("마지막 항목");
            return;         /*return을 사용으로 이하를 수행하지 않고 빠져나옴 */
        }
        
        index++;                        //index-- 이동할 위치 
        var x = index*100+"px";         //var x = index* 100+px; 100px는 li의 너비, css에서 얻어오는게 바람직. 지금은 100으로 고정하고 업데이트하자.
        ul.style.transform = "translateX("+x+")";
        
        current.classList.remove("current");
        current = current.previousElementSibling;
        current.classList.add("current");
        showRoomImg.src = current.firstElementChild.src;
    };
                                                                           
    nextButton.onclick = function(e){
        e.preventDefault();
        if(current.nextElementSibling == null){
            alert("마지막 항목");
            return;
        }  
        
        index--;                        //index-- 이동할 위치 
        var x = index*100+"px";         //var x = index* 100+px; 100px는 li의 너비, css에서 얻어오는게 바람직. 지금은 100으로 고정하고 업데이트하자.
        ul.style.transform = "translateX("+x+")"; //ul.style.transform = ""

        current.classList.remove("current");
        current = current.nextElementSibling;
        current.classList.add("current");  
        //className("current")하면 css에 여러 class가 있을 경우 덧붙여진다.
        showRoomImg.src = current.firstElementChild.src;
        
        /*   
      current.style.opacity = "1";
        current.style.border = "1px solid green";
        current.style["border-width"] = "2px";     속성값 설정은 이거
        current.style.borderColor = "red"; */     /* 속성값 설정은 요거 */ 

    };
});


//! ==============s9 노드 속성 변경. 노드변경추가============== 
window.addEventListener("load", function() {
    var s9 = document.querySelector("#s9");  //# 은 css구문따름
    var container = s9.querySelector(".container");  //# 은 css구문따름
    var addButton = s9.querySelector(".add-button");
    var delButton = s9.querySelector(".del-button");
    var replaceButton = s9.querySelector(".replace-button");
    var changeButton = s9.querySelector(".change-button");
    
    var index = 1;
    addButton.onclick = function(){
        //*[1]==[추천] element+html 삽입
        var item = '<span class="item"> \
                        <input type="checkbox"> \
                        <span class="label">안녕'+index+++'</span> \
                    </span>';
        container.insertAdjacentHTML('beforeend', item);

        /*-과거방식:성능저하
        (1) var item = '<span class="item"> \
                        <input type="checkbox"> \
                        <span>안녕'+index+++'</span> \
                    </span>';
        container.innerHTML += item; */
        
        //*[2]==[추천] text 노드를 만들어서 삽입.+여러개 동시 삽입
        /* var span = document.createElement("span");
        span.append("안녕!"+ index++);
        container.append(span); */ //(span, "aaa");

        //-[과거방식](1)
        /* //1. span 엘리먼트 객체 생성
        var span = document.createElement("span");
        //2. 텍스트 노드 생성
        var text = document.createTextNode("안녕!"+index++);
        //3. span에 2번에서 생성한 text 객체 추가
        span.appendChild(text);
        //4. span 객체를 container에 추가
         container.appendChild(span);
        */
        //-[과거방식](2)
        /*//1. 텍스트노드 생성(2)
        var text = document.createTextNode("안녕!");
          //2. 컨테이너에 노드 추가
        container.appendChild(text); 
        */
    };
    delButton.onclick = function(){
        //*[2]===선택삭제 방식을 통한 구현
        //*-[추천]: 슈도 클래스 활용
        var chks = container.querySelectorAll("input[type=checkbox]:checked");
        for(var i=0;i<chks.length;i++)
            chks[i].parentElement.remove();//parentElement를 작성해야 감싼 span전체가 바뀜


        /* //-[비추]: 직접 모든 노드를 순회하며 검사
        // 1. item 목록을 얻음.
        var items = container.children;
        // 2. item을 반복적으로 순회하며 checkbox를 얻음.
        // for(var i=0;i<items.length;i++)
        //     var checkbox = items[i].querySelector("input[type=checkbox]");

        //3. checkbox 선택된 것들을 array에 담음.
        var chks = [];
        for(var i=0;i<items.length;i++){
            var checkbox = items[i].querySelector("input[type=checkbox]");
            if(checkbox.checked)
                chks.push(checkbox);
        }
        //4. 출력
        console.log(chks); */

        //*[1]=== 선택된 노드 찾기
        //*-[추천] 자신을 삭제
        // container.lastElementChild.remove();    

       //-[비추]로 구현: 하위 element를 찾아 삭제
       /* container.removeChild(container.lastElementChild); */

    };
    changeButton.onclick = function(){
        //* 선택된 항목 텍스트 변경.
        var chks = container.querySelectorAll("input[type=checkbox]:checked");

        for(var i=0;i<chks.length;i++){
            var parent = chks[i].parentElement;
            var textSpan = parent.querySelector(".label");
            textSpan.innerText = "변경";

        };    
    };

    replaceButton.onclick = function(){
        //*-[2] == 선택 항목 위치 교환
        var chks = container.querySelectorAll("input[type=checkbox]:checked");//?chks는 배열이 아니다. NOdeList 객체
        
        if(chks.length != 2) {
            alert("2개만 선택하자");
            return;
        }
        //엘리먼트 단위보다 엘리먼트가 있었던 자리를 기준으로.
        var item1 = chks[0].parentElement;
        var item2 = chks[1].parentElement;
        var before = item2.previousElementSibling;
        // container.replaceChild(newOne, oldOne);
        item1.replaceWith(item2);     
        before.insertAdjacentElement('afterend', item1);
        
        
//newOne의 앞에 놓기
        //*-[1][추천] == 고정된 항목 교체: insertAdjacent 함수
        /* var oldOne = container.children[1];
        var newOne = container.children[2];
        container.replaceChild(newOne, oldOne);
        newOne.insertAdjacentElement('afterend', oldOne); */

        /*-[비추]두번째와 세번째 교환
        var oldOne = container.children[1];
        var newOne = container.children[2];
        container.replaceChild(newOne, oldOne);
        container.insertBefore(oldOne, newOne.nextElementSibling); */

       /*-[비추]첫번째-막내 교환  
        var newOne = container.lastElementChild;
        var oldOne = container.firstElementChild;
        container.replaceChild(newOne, oldOne);
        container.appendChild(oldOne); */
        //firstone이 lastone 5번째에 있는걸 새로운 걸로 껴놓기만 한 것. 그래서 oldOne이 사라짐.



    };

});


//! ==============s8 노드 속성 변경. 노드변경추가============== 
window.addEventListener("load", function() {
    var s8 = document.querySelector("#s8");  //# 은 css구문따름
    var prevButton = s8.querySelector(".prev-button");
    var nextButton = s8.querySelector(".next-button");
    var ul = s8.querySelector("ul");
    var showRoomImg = s8.querySelector(".show-room").firstElementChild;
    
    //* ul의 li:firstchild
    // current.innerText = "하하하";
    
    /* var current = ul.firstChild;
    console.log(ul .childNodes.length);*/
    var current = ul.querySelector("li:nth-child(4)");
    var index = 0;

    prevButton.onclick = function(){/** return으로 바로 빠져나올 수 있다. */ 
        if(current.previousElementSibling == null){
            alert("마지막 항목");
            return;         /*return을 사용으로 이하를 수행하지 않고 빠져나옴 */
        }       
        current.classList.remove("current");
        current = current.previousElementSibling;
        current.classList.add("current");
        showRoomImg.src = current.firstElementChild.src;
    };
                                                                           
    nextButton.onclick = function(){
        if(current.nextElementSibling == null){
            alert("마지막 항목");
            return;
        }  
        
        index--;                        //index-- 이동할 위치 
        var x = index*100+"px";         //var x = index* 100+px; 100px는 li의 너비, css에서 얻어오는게 바람직. 지금은 100으로 고정하고 업데이트하자.
        ul.style.transform = "translateX("+x+")"; //ul.style.transform = ""

        current.classList.remove("current");
        current = current.nextElementSibling;
        current.classList.add("current");  
        //className("current")하면 css에 여러 class가 있을 경우 덧붙여진다.
        showRoomImg.src = current.firstElementChild.src;
        
        /*   
      current.style.opacity = "1";
        current.style.border = "1px solid green";
        current.style["border-width"] = "2px";     속성값 설정은 이거
        current.style.borderColor = "red"; */     /* 속성값 설정은 요거 */ 

    };
});

//! s7 노드 선택 querySelector : CSS스타일의 선택자로 DOM을 선택할 수 있다.
window.addEventListener("load", function() {
    var s7 = document.querySelector("#s7");  //# 은 css구문따름
    var prevButton = s7.querySelector(".prev-button");
    var nextButton = s7.querySelector(".next-button");
    var ul = s7.querySelector("ul");

    //*여러개 찾을 때는 All, 하나만 찾을 때는 All을 뺀다.
    //var lis = ul.querySelectorAll("li");
    //var li = ul.querySelector("li");  //모두 찾으려 했는데 이렇게쓰면 1번째만 나옴.

    //* ul의 li:firstchild
    var current = ul.querySelector("li:first-child");
    current.innerText = "하하하";

    var current = ul.firstChild;
        //console.log(ul.childNodes.length);
    
    prevButton.onclick = function(){
        current.innerText = "호호";
        current = current.previousElementSibling;  //이전 엘리먼트 선택
    };

    nextButton.onclick = function(){
        // current.nextSibling;
        current = current.nextElementSibling;
        current.innerText = "하하하";
    };
});



//! s6 노드 Sibling 으로 select
window.addEventListener("load", function() {
    var s6 = document.getElementById("s6");
    var prevButton = s6.getElementsByClassName("prev-button")[0];
    var nextButton = s6.getElementsByClassName("next-button")[0];
    var ul = s6.getElementsByTagName("ul")[0];
    // var lis = ul.getElementsByTagName("li"); 옛날방식

    //* 해당 엘리먼트 노드를 대상으로 순회 + nodeType 출력
    for(var i=0; i<ul.children.length;i++)
       // console.log("ul의 children node 타입: "+ul.children[i].nodeType); 

    //* firstElementChild: 첫번째자식노드 셀렉터
        var current = ul.firstElementChild;
        current.innerText = "터벅터벅";
        //console.log("firstElementChild: "+ ul.children[0].nodeType);

    prevButton.onclick = function(){
        current.innerText = "호호";
        current = current.previousElementSibling;
    };

    nextButton.onclick = function(){
        // current.nextSibling;
        current = current.nextElementSibling;
        current.innerText = "하하하";
    };
});




//* 버튼1 url   s5
window.addEventListener("load", function() {
    var s5 = document.getElementById("s5");
    var urlInput = s5.getElementsByClassName("url-input")[0];
    var button1 = s5.getElementsByClassName("button1")[0];

    button1.onclick = function(){
        location.href = "http://www.naver.com"; //url로 이동.
        location.reload;
        // location.replace(urlInput.value);  //이동하지만 뒤로가기 버튼X
    };
});



//*  s5 아이프레임: 접근시 contentWindow
window.addEventListener("load", function(){
    var section = document.getElementById("s4");
    var btn1 = section.getElementsByClassName("btn1")[0];
    var iWin = section.getElementsByTagName("iframe")[0].contentWindow; 

    btn1.onclick = function(){
        var btn1InIframe = iWin.document.getElementsByTagName("iframe")[0];
        btn1InIframe.value = "하하하";
    };
});


//*==========새창 open=====================
window.addEventListener("load", function() {
    var section = document.getElementById("s3");
    var searchButton = section.getElementsByClassName("search-button")[0];

    var win;

    searchButton.onclick = function(){
        win = open("ex1-zipcode.html", "_blank", "width=400px, height=300px");


    };
});



//*==============Countdown==================s2
window.addEventListener("load", function() {
    var section = document.getElementById("s2");
    var countSpan = section.getElementsByClassName("count-span")[0];
    var countdownButton = section.getElementsByTagName("input")[0];
    var count = 5;

//객체 초기화. span에 값을 넣어줌.
    countSpan.innerText = count;

    //카운트 다운 처리
    countdownButton.onclick = function(){

        //함수포장   setTimeout()
        var timerId = setInterval(function(){
            count--;
            countSpan.innerText = count;
            
            if(count == 0)
                clearInterval(timerId);
        }, 1000);

        
    };
});






//*===계산기================================
window.addEventListener("load", function(){
    var xBox = document.getElementById("x-input");
    var yBox = document.getElementById("y-input");
    var addBtn = document.getElementById("add-button");
    var resultBox = document.getElementById("result-input");
    
    addBtn.onclick = function() {
        resultBox.value = parseInt(xBox.value) + parseInt(yBox.value);
        var result = resultBox.value;

        if(isNaN(result))
            alert("숫자를 입력하세요.")
        else
            console.log("계산완료");
    };
});