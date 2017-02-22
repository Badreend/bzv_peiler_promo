var socket = io();


$('body').click(function() {
	socket.emit('getData', {id:1,time:500});
	console.log('emit');
});