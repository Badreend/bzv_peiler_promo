var socket = io();


$(function(){
	$(".msgContainer").typed({
		strings: ['<div class="msg">Blaas liefde in de ballonnen met:</div> <img src="img/0.png" class="msgEmoji"><img src="img/1.png" class="msgEmoji"><img src="img/2.png" class="msgEmoji">', "Ga naar de website voor de liefdespeiler!"],
		typeSpeed:  50,
            backDelay: 8000,

		 loop: true,
         loopCount: true,
         showCursor: true,
            cursorChar: "|",
	});
});

var center = undefined;
socket.on('getProfile',function(_data){
	addFace(_data);
});


socket.on('getStack',function(_data){
	console.log('a stack')
	console.log(_data);

	var v = undefined;
	var typeClass = undefined;
	if(_data.id === 0){
		v = $('.v0');
		typeClass = $('.LOVE');
	}else if(_data.id === 1){
		v = $('.v1');
		typeClass = $('.HAHA');
	}else if(_data.id === 2){
		v = $('.v2');
		typeClass = $('.WOW');
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


function addFace(_profile){
	var left = undefined;
	var top = undefined;
	var angle = Math.random() * (2 * Math.PI);
	var radius = $('.v0').width()*.75;
	var typeImg = undefined;
	center = $('.v0').width()/2-12;
	if(_profile.type === "LOVE"){
		left = $('.v0').offset().left;
		top = $('.v0').offset().top;
		typeImg = "0.png";
	}else if(_profile.type === "HAHA"){
		left = $('.v1').offset().left;
		top = $('.v1').offset().top;
		typeImg = "1.png";
	}else if(_profile.type === "WOW"){
		left = $('.v2').offset().left;
		top = $('.v2').offset().top;
		typeImg = "2.png";
	}

	left += center - Math.cos(angle) * radius;
	top +=  center - Math.sin(angle) * radius;;

	$pic = $('<img>').attr('src',_profile.pic_large).attr('class','profilePic '+ _profile.type).attr("type",_profile.type).css({top:top+"px",left:left+"px"});
	$pic2 = $('<img>').attr('src',"img/"+typeImg).attr('class','profilePic tempEmoji '+ _profile.type).attr("type",_profile.type).css({top:top+"px",left:left+"px"});

	$('.canvas').append($pic2);
	$('.canvas').append($pic);

	console.log('added');
}




