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
		var limit = '100'
		var url = 'https://graph.facebook.com/v2.8/'+ postID + '/reactions' + '?fields=' + 'pic%2Cpic_large%2Cname%2Ctype%2Ccreated_time' + '&limit='+limit + '&access_token=' + access_token;
		function getEmojiData(){
			$.getJSON(url, function(res){
				console.log(res);
				if(!res){
					return;
				}
				emojiData = res.data;
				emojiData.reverse();
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
		$(document).ready(function(){
			update();
		});