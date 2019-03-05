// var express = require('express');
// var app = express();
// var server= require('http').Server(express);
// var io =require('socket.io')(server);   working with app.listen
var express = require('express');
var app = express();
var server= require('http').Server(app);
var io =require('socket.io').listen(server);



var logger =require('morgan');
var path =require('path');
var routes = require('./routes/index');
app.use(logger('dev'));

app.set('views',path.join(__dirname,'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');
app.use(express.static(path.join(__dirname,'public')));
app.use('/',routes);
io.on('connection', function(socket){
  console.log(socket.id);
  socket.on('SendMessage',function(data){
    console.log(data);
    socket.broadcast.emit('sendtoAll',{
      message:data.myMessage
    });
  });
});



// app.use('/',function(req,res){
//   res.render('index');
// });
// app.listen(3000,function(req,res){
server.listen(3000,function(req,res){
console.log('server in running on port 3000')  ;
});
