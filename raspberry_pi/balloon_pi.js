var express = require('express')
//var gpio = require('rpi-gpio');
var gpio = require("pi-gpio");
var app = express();
const exec = require('child_process').exec;

var pins = [6,13,19,26];

// gpio.setMode(gpio.MODE_BCM);
 for (var i = 0, len = pins.length; i < len; i++) {
// 	//gpio.setup(pins[i], gpio.DIR_OUT);
exec('echo ' + pins[i] + ' > /sys/class/gpio/export;', function(error, stdout, stderr) {
  	});
    	    exec('echo out > /sys/class/gpio/gpio' + pins[i] + '/direction;', function(error, stdout, stderr) {
  	});
    	    exec('echo 1 > /sys/class/gpio/gpio' + pins[i] + '/value;', function(error, stdout, stderr) {
  	});
 }



app.get('/addAir', function(req, res, next) {
  if(req.query.secret == "janken") {
  	var starttime = new Date().getTime();
    var id = req.query.id;
    if( id>=0 && id<pins.length){
    var time = req.query.time;
    if(time > 5000){
    	console.log(time);
    	time = 100;
    }
    var once = true;
    console.log("starting " + id);
    // while(new Date().getTime() - starttime < time){
    // 	if(once){
    		exec('echo 0 > /sys/class/gpio/gpio' + pins[id] + '/value;', function(error, stdout, stderr) {
  	});

   	setTimeout(function() { putOut(id); }, time);

    res.send("OK");
}
  }else{
    res.status(403).send("NO. :(");
  }
});


app.get('/blowUp', function(req, res, next) {
  if(req.query.secret == "janken") {
  	var id = req.query.id;

  	if( id>=0 && id<pins.length){
  	exec('echo 0 > /sys/class/gpio/gpio' + pins[id] + '/value;', function(error, stdout, stderr) {
  	});
  	setTimeout(function() { putOut(id); }, 10000);
  }

  }

});


app.get('/close', function(req, res, next) {
  if(req.query.secret == "janken") {
    var id = req.query.id;
    putOut(id);
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


function putOut(_id){
	exec('echo 1 > /sys/class/gpio/gpio' + pins[_id] + '/value;', function(error, stdout, stderr) {
  	});
    console.log("stopping " + _id);
}

