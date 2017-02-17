		/*

		fields=reactions.type(LIKE).limit(0).summary(1).as(like),
        reactions.type(WOW).limit(0).summary(1).as(wow),
        reactions.type(SAD).limit(0).summary(1).as(sad),…
        */

		var access_token = '300916473635695|-JiAKyIwEKwBRoc7J2bjXYm2YYo'; 
		var likedShown = [];
		var counter = 0;
		var liked = [];
		var postID = 1456455931045706; 
		var limit = '20000'
		var url = 'https://graph.facebook.com/v2.8/'+ postID + '/reactions' + '?fields=' + 'pic%2Cpic_large%2Cname%2Ctype%2Ccreated_time' + '&limit='+limit + '&access_token=' + access_token;
		function getData(){
			$.getJSON(url, function(res){
				if(!res){
					return;
				}
				liked = res.data;
				liked.reverse();
			});
		}


		function update(){
			getData();
			if(liked[counter]){
				for(var i = 0; i < likedShown.length; i++){
					if(likedShown[i].id === liked[counter].id){
						return;
					}
				}	
					likedShown.push(liked[counter]);
					$pic = $('<img>').attr('src',liked[counter].pic_large).attr('class','profilePic '+ liked[counter].type).attr("type",liked[counter].type);
					$pic.delay(2700).fadeOut(400);					
					$('.emojiFaceContainer').append($pic);
					counter++;	

			}
		}

		setInterval(update, 100);
		$(document).ready(function(){
			update();
		});