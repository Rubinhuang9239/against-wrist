var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http); 

//---------------History-----------------//
var historyList =new Array();

http.listen(3000,function(){
	console.log("hi! 3000");
   console.log(' ');
  console.log('        _____ ');
  console.log('    __- ----  -_ ');
  console.log('   /|||||||||||||、 ');
  console.log('  /|||||||||||||||、 ');
  console.log('  |--____         | ');
  console.log('  |_/    `------—--| ');
  console.log('  |/  ^   ` --___ | ');
  console.log(' (|   |     |   `|)');
  console.log('  |   ~      ~.  | ');
  console.log('   、    ^      /   ');
  console.log('    `、        ‘    ');
  console.log('    O /`----/ | /O ');
  console.log(' ');
});

app.use(express.static('public'));

app.get('/a',function(req,res){
  if(userCount<2){
  res.sendfile('public/a.html');
  }
  else{
    res.sendfile('public/none.html');
  }

});

app.get('/b',function(req,res){
  if(userCount<2){
  res.sendfile('public/b.html');
  }
  else{
    res.sendfile('public/none.html');
  }

});

app.get('/local',function(req,res){
  if(userCount<2){
  res.sendfile('public/a.html');
  }
  else{
    res.sendfile('public/none.html');
  }

});

var ACounts = 0, BCounts = 0, currentPos = 0, userCount=0;

io.on('connection', function(socket){

  userCount++;
   //console.log('someone_comes!');

   socket.on('A', function(){
    ACounts++;
   });

   socket.on('B', function(){
    BCounts--;
   });

   socket.on('requestPos',function(){
    io.emit('givePos',currentPos);
   });

    socket.on('lose',function(){
    setTimeout(function(){
    io.emit('reset',"");
    console.log("reset");
    currentPos = 0;
    },2500);
   });

    socket.on('disconnect', function () {
   userCount--;
  });
});

setInterval(function(){

currentPos += (ACounts+BCounts);
//console.log(currentPos);

},80);

setInterval(function(){

ACounts=0;
BCounts=0;

},400);

