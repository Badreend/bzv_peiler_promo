/* */
"use strict"

/* dependecies */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express  = require('express');
var url = require('url');
var $ = require('jquery');
var _ = require('lodash');
var request = require('request');

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
var access_token = '249333598850733|k4_yKbHyvZJFynd2AsoG2Sueoko'; 
var counter = 0;
var emojiData = [];
var emojiDataShown = [];
var typeCounter = {
	LIKE: 0,
	LOVE: 0,
	HAHA: 0,
	SAD: 0,
	ANGRY: 0
}

var postID = 1456455931045706; 
var limit = '2'
var url = 'https://graph.facebook.com/v2.8/'+ postID + '/reactions' + '?fields=' + 'pic%2Cpic_large%2Cname%2Ctype%2Ccreated_time' + '&limit='+limit + '&access_token=' + access_token;
function getEmojiData(){
	request(url, function(_err, _res, _data){
		var data = JSON.parse(_data);
		if (data === undefined) {
			console.log('No connection');
			return;
		}
		emojiData = data.data;
		emojiData.reverse();
		console.log(emojiData);
		console.log('--------')
	});
}

 
function update(){
	getEmojiData();
	if(emojiData[counter]){
		for(var i = 0; i < emojiDataShown.length; i++){
			if(emojiDataShown[i].id === emojiData[counter].id){
				return;
			}
		}	
		for (var k in typeCounter){
			if(k ===  emojiData[counter].type){
				typeCounter[k]++;
				console.log(emojiData[counter].name + ' blaast ' + k);
			}
		}
		counter++;	
	}
}

setInterval(update, 500);
update();
