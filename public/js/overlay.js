var socket = io();


$(function(){
	$(".msgContainer").typed({
		strings: ['<div class="msg">Blaas liefde in de ballonnen met:</div> <img src="img/0.png" class="msgEmoji"><img src="img/1.png" class="msgEmoji"><img src="img/2.png" class="msgEmoji">', "Ga naar de website voor de liefdespeiler!"],
		typeSpeed:  0,
		backSpeed:  -5000,
         backDelay: 8000,

		 loop: true,
         loopCount: true,
	});
});

var center = undefined;
socket.on('getProfile',function(_data){
	addFace(_data);
});


socket.on('getStack',function(_data){
	var v = undefined;
	var typeClass = undefined;
	if(_data.id === 0){
		v = $('.v0');
		typeClass = $('.LOVE');
		angles.love = [];
	}else if(_data.id === 1){
		v = $('.v1');
		typeClass = $('.HAHA');
		angles.haha = [];
	}else if(_data.id === 2){
		v = $('.v2');
		typeClass = $('.WOW');
		angles.wow = [];

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
	love: [],
	haha: [],
	wow: [],
}

function addFace(_profile){
	var left = undefined;
	var top = undefined;
	var angle = calcAngle(_profile);
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

	$pic = $('<img>').attr('src',_profile.pic_large).attr('class',angle + ' profilePic '+ _profile.type).attr("type",_profile.type).css({top:top+"px",left:left+"px"});
	$pic2 = $('<img>').attr('src',"img/"+typeImg).attr('class','profilePic tempEmoji '+ _profile.type).attr("type",_profile.type).css({top:top+"px",left:left+"px"});

	$('.canvas').append($pic2);
	$('.canvas').append($pic);

}


function calcAngle(_profile){
	var angle = Math.random() * (2 * Math.PI);
	var minDiff = .5;
	if(_profile.type === "LOVE"){
		for(var i= 0; i < angles.love.length; i++){
					var diff = Math.abs(angles.love[i] - angle);
					if(diff < minDiff){
						angle = Math.random() * (2 * Math.PI);
					}
				}
		angles.love.push(angle);
	}else if(_profile.type === "HAHA"){
		for(var i= 0; i < angles.haha.length; i++){
			var diff = Math.abs(angles.haha[i] - angle);
			if(diff < minDiff){
				angle = Math.random() * (2 * Math.PI);
				i = 0; 
				console.log('repeat');
				console.log(diff);
				console.log('----repeat----');
			}
		}
			angles.haha.push(angle);		
	
	}else if(_profile.type === "WOW"){
		console.log('wow')
	}
	console.log('calced');

	return angle;
}



