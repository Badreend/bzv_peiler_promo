/* */
"use strict"

/* dependecies */
var app = require('express')();
var http = require('http').Server(app);
var httpPi = require('http');
var io = require('socket.io')(http);
var express  = require('express');
var url = require('url');
var $ = require('jquery');
var _ = require('lodash');
var request = require('request');
var FB = require('fb');

/*server setup*/

http.listen(process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/control_panel.html');
});
app.get('/overlay', function(req, res){
	res.sendFile(__dirname + '/overlay.html');
});


/*variables*/


/* om de 10 stemmen ga 500 ms blazen */ 
var updateSpeed = 200;
var stack = 10;
var time = 500;

var access_token = '249333598850733|k4_yKbHyvZJFynd2AsoG2Sueoko'; 
FB.setAccessToken(access_token);

var counter = 0;
var emojiData = [];
var emojiDataShown = [];
var typeCounter = {
	LIKE: 0,
	LOVE: 0,
	WOW: 0,
	HAHA: 0,
	SAD: 0,
	ANGRY: 0
}

var postID = 1589482717747961; 
var limit = '20'
var url = 'https://graph.facebook.com/v2.8/'+ postID + '/reactions' + '?fields=' + 'pic_large%2Cname%2Ctype'+ '&offset='+'5' + '&limit='+limit  +'&access_token=' + access_token;



function getEmojiData(){
	FB.api(
	  '/'+postID+'/reactions',
	  'GET',
	  {"fields":"pic_large,name,type","limit":limit},
	  function(res) {
	  	if(!res || res.error) {
		   console.log(!res ? 'error occurred' : res.error);
		   return;
		}
	      for(var i = 0; i < res.data.length; i++){
	      	for(var j = 0; j < emojiData.length; j++){
	      		if(res.data[i].id === emojiData[j].id){
					return;
				}	
	      	}
	      		emojiData.push(res.data[i]);
	      		console.log(emojiData.length);
	      }
	   
	  }
	 );
	
	
}


function update(){

	getEmojiData();
	if(emojiData[counter]){
		for(var i = 0; i < emojiDataShown.length; i++){
			if(emojiDataShown[i].id === emojiData[counter].id){
				return;
			}
		}	
		emojiDataShown.push(emojiData[counter]);
		for (var k in typeCounter){
			if(k ===  emojiData[counter].type){
				typeCounter[k]++;
				if(emojiData[counter].type === "LOVE" ||
					emojiData[counter].type === "HAHA" ||
					emojiData[counter].type === "WOW" ){
					sendProfile(emojiData[counter]);
			}
			if(typeCounter[k] % stack === 0){
				console.log("stack in " + k);
				if(k  === 'LOVE'){
					console.log(counter);
					sendToPi(0,time);
					sendStackOverlay(0,time);
				}else if(k  === 'HAHA'){
					sendToPi(1,time);
					sendStackOverlay(1,time);
				}else if(k  === 'WOW'){
					sendToPi(2,time);
					sendStackOverlay(2,time);						
				}
			}
		}
	}
	counter++;	
}
}

io.on('connection', function(socket){
	initControlPanel();
	socket.on('getData', function(_data){
		postID = _data.id;
		stack = _data.stack;
		time = _data.time;
	});
	socket.on('getSettings', function(_data){
		updateSpeed = _data.speed;
		stack = _data.stack;
		time = _data.time;
	});
	socket.on('blowup', function(_data){
		blowup(_data.id);
	});
});
function initControlPanel(){
	io.emit('initControlPanel',{id:postID,speed:updateSpeed,stack:stack,time:time});
}


function sendStackOverlay(_id,_time){
	io.emit('getStack',{id:_id,time:_time});
}

function sendProfile(_data){
	io.emit('getProfile',_data);
}
function sendToPi(_id,_time){


	//var adress = process.env.PORT || 3000 + "/addAir?secret=janken&id="+_id+"&time="+_time;
	var adress =  "/addair?secret=janken&id="+_id+"&time="+_time;
	var adress2 = "192.168.9.221";
	var port = 3000;
	console.log(adress);

	var options = {
		host: adress2,
		path: adress,
		port: port,
		method: "GET"
	}
	var request = httpPi.request(options,function(req){
	});
	request.on('error',function(err){
		console.log(err);
	});

	request.end();
}


function blowup(_id){
	var adress =  "/blowup?secret=janken&id="+_id;
	var adress2 = "192.168.9.221";
	var port = 3000;

	var options = {
		host: adress2,
		path: adress,
		port: port,
		method: "GET"
	}
	var request = httpPi.request(options,function(req){
	});
	request.on('error',function(err){
		console.log(err);
	});

	request.end();
	
	console.log('blowUp')
}



	setInterval(update, updateSpeed);


update();
