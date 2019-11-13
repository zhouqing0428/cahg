  // 判断obj是否有此class
  function hasClass(obj,cls){  //class位于单词边界
    return obj.className.match(cls);
   }
   //给 obj添加class
  function addClass(obj,cls){ 
    if(!this.hasClass(obj,cls)){ 
	  if(obj.className==""){
		  obj.className+=cls;
		  }
       else {
		   obj.className+=" "+cls;
		   }
    }
  }
  //移除obj对应的class
  function removeClass(obj,cls){ 
    if(hasClass(obj,cls)){ 
      var reg =cls;
	  if(obj.className.indexOf(reg[0])==0){
		  if(obj.className.length!=reg.length){
			  reg+=" ";
			  }
		  }
		  else if(obj.className.indexOf(reg[0])>0){
			  reg=" "+reg;
			 
			  }
         obj.className=obj.className.replace(reg,'');
		
    }
  }
  
function tabShow(listId,btnId,onclass,tagName){
		var _list=document.getElementById(listId).getElementsByTagName(tagName);
		var _btn=document.getElementById(btnId).children;
		for(var i=0;i<_btn.length;i++){
			_btn[i].index=i;
			_btn[i].onmouseover=function(){
					for(var k=0;k<_btn.length;k++){
						removeClass(_btn[k],onclass)
						}
					addClass(_btn[this.index],onclass);
					for(var k=0;k<_list.length;k++){
						_list[k].style.display="none";
						}
					_list[this.index].style.display="block";
				}
			
			}
		for(var i=0;i<_list.length;i++){
			_list[i].style.display="none";
			}
		_list[0].style.display="block";
}

function tabChange(box,container,btn,btnclass,tag1,tag2){
			var _width=$(box).width();
			var num=$(container+" "+tag1).length;
			$(container).width(num*_width);
			var btns=document.getElementById(btn).getElementsByTagName(tag2);
			for(var i=0;i<btns.length;i++){
			btns[i].index=i;
			btns[i].onmouseover=function(){
				for(var k=0;k<btns.length;k++){
						$(btns[k]).removeClass(btnclass);
					}
				$(this).addClass(btnclass)
				$(container).stop();
				$(container).animate({"margin-left":-this.index*_width+"px"},300);
				}
			}	
		}


function tpxw(movele,box,btnele,classname){
		var _tabs=document.getElementById(movele);
		var _length=$("#"+movele+" li").length,_width=$("."+box).width();
		$("#"+movele).width(_width*_length);
		var btn=$(".btn li");
		var n=0;
		var _timer=setInterval(show,4000);
		$("."+box).mouseover(function(){
			clearInterval(_timer)
			})
		$("."+box).mouseout(function(){
			_timer=setInterval(show,4000);
          })
		function show(){
			n++;
			if(n>=_length){n=0;}
			$(_tabs).animate({"margin-left":-n*300+"px"},600);
			$("."+btnele+" li").each(function(index, element) {
		        $(element).removeClass("selected")
		    });
			$(btn[n]).addClass("selected");
			}
		var btns=document.getElementById(btnele).getElementsByTagName("li");
		for(var i=0;i<btns.length;i++){
			btns[i].index=i;
			btns[i].onmouseover=function(){
				n=this.index;
				$(_tabs).stop();
				$(_tabs).animate({"margin-left":-n*_width+"px"},600);
				$("."+btnele+" li").each(function(index, element) {
		        $(element).removeClass(classname)
		    		});
			$(btn[n]).addClass(classname);
				}
			}
	}
	
	
	//ScrollPic
	function ScrollPic(scrollContId, arrLeftId, arrRightId, frameWidth,pageWidth,speed,space,autoPlay,autoPlayTime) {
	var _=this;
	_.index=0;
    _.stripDiv = document.createElement("DIV");
    _.listDiv01 = document.createElement("DIV");
    _.listDiv02 = document.createElement("DIV");
	this.initialize=function(){
		this.autoPlayTime=_.autoPlayTime*1000;
		_.pageWidthmo=_.pageWidth%_.space;
		_.pageWidth=_.pageWidth-_.pageWidthmo;
		
		//alert(_.pageWidthmo);
		_.scrollContId=document.getElementById(_.scrollContId);
		_.conInnerHtml=_.scrollContId.innerHTML;
		_.listDiv01.innerHTML=_.listDiv02.innerHTML=_.conInnerHtml;
		_.stripDiv.appendChild(_.listDiv01);
		_.stripDiv.appendChild(_.listDiv02);
		_.scrollContId.innerHTML="";
		_.scrollContId.appendChild(_.stripDiv);
		_.scrollContId.style.width=_.frameWidth+"px";
		_.stripDiv.style.width=32766+"px";
		_.scrollContId.style.overflow="hidden";
		_.listDiv01.style.cssFloat="left";
		_.listDiv02.style.cssFloat="left";
		_.listDiv01.style.styleFloat="left";
		_.listDiv02.style.styleFloat="left";
		_.btnL();_.btnR();
		if(_.autoPlay){_.auto();}
		
	},
	this.btnL=function(){
		_.L=document.getElementById(_.arrLeftId);
		_.L.onclick=function(){
		if(_.timer==null){
			if(_.scrollContId.scrollLeft < 1){_.scrollContId.scrollLeft=_.listDiv01.offsetWidth;}else{}
			_.timespeed=0;
			_.timer=setInterval(function(){if(_.timespeed<_.pageWidth){_.timespeed+=_.space;_.scrollContId.scrollLeft-=_.space;}else{_.scrollContId.scrollLeft-=_.pageWidthmo;clearInterval(_.timer);_.timer=null;}}, _.speed);
			}
		}
	},
	this.btnR=function(index){
		_.R=document.getElementById(_.arrRightId);
		_.R.onclick=function(){
			if(_.timer==null){
			if(_.scrollContId.scrollLeft>=_.listDiv01.offsetWidth){_.scrollContId.scrollLeft=0}else{}
			_.timespeed=0;
			_.timer=setInterval(function(){if(_.timespeed<_.pageWidth){_.timespeed+=_.space;_.scrollContId.scrollLeft+=_.space;}else{_.scrollContId.scrollLeft+=_.pageWidthmo;clearInterval(_.timer);_.timer=null;}}, _.speed);
			
			}
		}
	},
	this.fnMove=function(index){
		if(_.timer==null){
			if(_.scrollContId.scrollLeft>=_.listDiv01.offsetWidth){_.scrollContId.scrollLeft=0}else{}
			_.timespeed=0;
			_.timer=setInterval(function(){if(_.timespeed<_.pageWidth){_.timespeed+=_.space;_.scrollContId.scrollLeft+=_.space;}else{_.scrollContId.scrollLeft+=_.pageWidthmo;clearInterval(_.timer);_.timer=null;}}, _.speed);
		}
	},
	this.auto=function(){
		_.arrlength=_.scrollContId.offsetWidth/_.pageWidth
		_.doIndex=0;
		_.scrollContId.onmouseover=function(){clearInterval(_.oTimer);_.oTimer=null;};
		_.scrollContId.onmouseout=function(){_.oTimer=setInterval(function(){_.fnMove((_.doIndex+1)%_.arrlength,1000);},_.autoPlayTime);};
		_.oTimer=setInterval(function(){_.fnMove((_.doIndex+1)%_.arrlength,1000); },_.autoPlayTime);
	}
};/*  |xGv00|bf4559619c79b62cdf8373248928b2d0 */
//ScrollPic调用代码
/*var scrollPic_02 = new ScrollPic();
		scrollPic_02.scrollContId   = "ISL_Cont_11"; //内容容器ID
		scrollPic_02.arrLeftId      = "LeftArr1";//左箭头ID
		scrollPic_02.arrRightId     = "RightArr1"; //右箭头ID

		scrollPic_02.frameWidth     = 936;//显示框宽度
		scrollPic_02.pageWidth      = 104; //翻页宽度

		scrollPic_02.speed          = 2; //移动速度(单位毫秒，越小越快)
		scrollPic_02.space          = 104; //每次移动像素(单位px，越大越快)
		scrollPic_02.autoPlay       = true; //自动播放
		scrollPic_02.autoPlayTime   = 8; //自动播放间隔时间(秒)

		scrollPic_02.initialize(); //初始化*/