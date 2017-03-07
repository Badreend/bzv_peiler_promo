var socket = io();
var circleWidth = $('.v0').width();
var left0 = $('.v0').offset().left;
var top0 = $('.v0').offset().top;

var left1 = $('.v1').offset().left;
var top1  = $('.v1').offset().top;

var left2 = $('.v2').offset().left;
var top2 = $('.v2').offset().top;
var stack = undefined;	
$(function(){
	$(".msgContainer").typed({
		strings: ['<div class="msg">Blaas liefde in de ballonnen met:</div> <img src="img/0.png" class="msgEmoji"><img src="img/1.png" class="msgEmoji"><img src="img/2.png" class="msgEmoji">'],
		typeSpeed:  0,
		backSpeed:  -5000,
         backDelay: 8000,

		 loop: true,
         loopCount: true,
	});
});
socket.on('initControlPanel', function(_data){
	stack = _data.stack;

});



var center = undefined;
socket.on('getProfile',function(_data){
	addFace(_data);
});

socket.on('getStackValue',function(_data){
	stack = _data;
});

socket.on('getStack',function(_data){
	var v = undefined;
	var typeClass = undefined;
	if(_data.id === 0){
		v = $('.v0');
		typeClass = $('.LOVE');
		angles.love = 0;
	}else if(_data.id === 1){
		v = $('.v1');
		typeClass = $('.HAHA');
		angles.haha = 0;
	}else if(_data.id === 2){
		v = $('.v2');
		typeClass = $('.WOW');
		angles.wow = 0;

	}else{
		return;
	}
	v.addClass('pulseAnimation');
	setTimeout(function() {
		v.removeClass('pulseAnimation');
	}, 2000);
	typeClass.animate({
		left : v.offset().left+center,
		top : v.offset().top+center,
		scale : '1%'
	}, {duration:3000})
	.queue(function() {
		$(this).remove();
	});
	
});

var angles = {
	love: 0,
	haha: 0,
	wow: 0
}

function addFace(_profile){
	var left = undefined;
	var top = undefined;
	var angle = calcAngle(_profile);
	var radius = circleWidth * .70;
	var typeImg = undefined;
	center = circleWidth/2-12;
	if(_profile.type === "LOVE"){
		left = left0;
		top = top0;
		typeImg = "0.png";
	}else if(_profile.type === "HAHA"){
		left = left1;
		top = top1;
		typeImg = "1.png";
	}else if(_profile.type === "WOW"){
		left = left2
		top = top2;
		typeImg = "2.png";
	}

	left += center - Math.cos(angle) * radius;
	top +=  center - Math.sin(angle) * radius + 8;

	$pic = $('<img>').attr('src',_profile.pic_large).attr('class',angle + ' profilePic '+ _profile.type).attr("type",_profile.type).css({top:top+"px",left:left+"px"});
	$pic2 = $('<img>').attr('src',"img/"+typeImg).attr('class','profilePic tempEmoji '+ _profile.type).attr("type",_profile.type).css({top:top+"px",left:left+"px"});

	$('.canvas').append($pic2);
	$('.canvas').append($pic);

}


function calcAngle(_profile){
	var one = (Math.PI * 2 / stack);
	if(_profile.type === "LOVE"){
	var angle = one * angles.love  + (Math.PI/2);
	angles.love++;
	}else if(_profile.type === "HAHA"){
	var angle = one * angles.haha  + (Math.PI/2);
	angles.haha++;	
	}else if(_profile.type === "WOW"){
	var angle = one * angles.wow  + (Math.PI/2);
	angles.wow++;
	}
	return angle;

}



