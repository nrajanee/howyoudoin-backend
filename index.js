var express = require('express');
var app = express();

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/scripts'));

app.get('/', function(req, res){
   res.sendFile("views/Login.html",{root: __dirname});

});

app.get('/login',function(req,res){
  res.send("Logged in");
});

app.get('/loginHandler.js',function(req,res){
  res.sendFile("loginHandler.js",{root: __dirname});
});
app.get('/home',function(req,res){
res.sendFile("views/Dashboard.html",{root: __dirname});
});

app.listen(3000);
