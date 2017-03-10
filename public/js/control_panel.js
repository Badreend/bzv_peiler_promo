
var socket = io();

var speedValue = undefined;
var stackValue = undefined;
var timeValue = undefined;

$('.btn0').click(function() {
	socket.emit('blowup',{id:0});
	console.log('blow up 0' )
});
$('.btn1').click(function() {
	socket.emit('blowup',{id:1});
});
$('.btn2').click(function() {
	socket.emit('blowup',{id:2});
});

$('.close0').click(function() {
  socket.emit('close',{id:0});
  console.log('close 0' )
});
$('.close1').click(function() {
  socket.emit('close',{id:1});
    console.log('close 1' )

});
$('.close2').click(function() {
  socket.emit('close',{id:2});
      console.log('close 2' )

});

function sendNewValues(){
	socket.emit('getSettings', {stack:stackValue,time:timeValue,speed:speedValue});
}	

socket.on('initControlPanel', function(_data){
  $('.postIDInput').val(_data.id);
  $('.speed').val(_data.speed);
  $('.stack').val(_data.stack);
  $('.time').val(_data.time);

  speedValue = _data.speed;
  stackValue = _data.stack;
  timeValue = _data.time;

$(".speed").slider({
    ticks: [1, 100, 250, 500, 1000],
    value: speedValue,
    scale: 'logarithmic',
    ticks_snap_bounds: 10,
});

$(".speed").change(function(e){
	speedValue = e.value.newValue;
	sendNewValues();
});

$(".stack").slider({
    ticks: [1, 10, 30],
    value: stackValue,
    ticks_snap_bounds: 1
});

$(".stack").change(function(e){
	stackValue = e.value.newValue;
	sendNewValues();
});

$(".time").slider({
    ticks: [300, 500, 1000, 2000, 5000],
    value: timeValue,
    ticks_snap_bounds: 100
});
$(".time").change(function(e){
	timeValue = e.value.newValue;
	sendNewValues();
});


  return false;
});

