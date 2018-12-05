var express = require('express');
var app = express();

const { Client } = require('pg');

app.get('/login',function(req,res){
 console.log("reached node.js")
 if(!req.query.userName){
    return res.status(422).send({
    errorType: 'RequestFormatError',
    message: 'Must include the userName.',
    });
 }
 if(!req.query.userPassword){
     return res.status(422).send({
     errorType: 'RequestFormatError',
     message: 'Must include the password.',
     });
  }

   const client = new Client({connectionString: process.env.DATABASE_URL
   });

  client.connect();

  var authenticate = 'SELECT * FROM Register WHERE Username =' + req.query.userName + ';';

     client.query(authenticate, (sqlErr,sqlRes) => {
     if(sqlErr) throw sqlErr;


     if(sqlRes.length <= 0){
       return res.status(404).send({
           errorType: 'RequestFormatError',
           message: 'Cannot find the username.',
           });

     }
     if(sqlRes.Password != req.query.userPassword){
               return res.status(404).send({
                          errorType: 'RequestFormatError',
                          message: 'incorrect Password.',
                          });
     }
      client.end();
  });



});

app.get('/register',function(req,res){
 console.log("reached node.js")
 if(!req.query.userName){
    return res.status(422).send({
    errorType: 'RequestFormatError',
    message: 'Must include the userName.',
    });
 }
 if(!req.query.userPassword){
     return res.status(422).send({
     errorType: 'RequestFormatError',
     message: 'Must include the password.',
     });
  }
if(!req.query.emailId){
     return res.status(422).send({
     errorType: 'RequestFormatError',
     message: 'Must include the password.',
     });
  }
   const client = new Client({connectionString: process.env.DATABASE_URL
   });

  client.connect();

  var addUser = "INSERT INTO Register (Username,Password,EmailId) VALUES ('" + req.query.userName + "','" +  + req.query.userPassword + "','" + req.query.emailId + "')";

});

