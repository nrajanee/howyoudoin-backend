var express = require('express');
var app = express();

app.get('/login',function(req,res){
 console.log("reached node.js")
 if(!req.query.user){
    return res.status(422).send({
    errorType: 'RequestFormatError',
    message: 'Must include the userName.',
    });
 }
 if(!req.query.password){
     return res.status(422).send({
     errorType: 'RequestFormatError',
     message: 'Must include the password.',
     });
  }

});
app.get('/',function(req,res){
     return res.status(200).send({
       message: 'Reached the main page'
     });
});
app.listen(process.env.PORT || 5000);
//app.listen(3000);
