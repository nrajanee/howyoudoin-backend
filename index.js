var express = require('express');
var app = express();

app.get('/',function(req,res){
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

app.listen(3000);
