var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
const { Client } = require('pg');

app.get('/login',function(req,res){
 console.log("reached node.js");
 console.log(req.query.userName);
 console.log(req.query.userPassword);

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

  const client = new Client({connectionString: process.env.DATABASE_URL });

  client.connect();

     var usern = req.query.userName;
     var authenticate = "SELECT * FROM Register WHERE Username = '" + usern + "'";
     client.query(authenticate, (sqlErr,sqlRes) => {
        if(sqlErr){
            return res.status(500).send({
                   errorType: 'InternalError',
                   message: 'SQL',
            });
        }

        if(!sqlRes.rows[0]){
            return res.status(404).send({
            errorType: 'RequestFormatError',
            message: 'Cannot find the username.',
            });

        }
        console.log(sqlRes.rows[0].password)
        if(sqlRes.rows[0].password.trim()!== req.query.userPassword.trim()){
            return res.status(404).send({
            errorType: 'RequestFormatError',
            message: 'incorrect Password.',
                });
        }

        return res.status(200).send({
              message: 'Reached the login'
        });

        client.end();

  });

 //console.log("done");


});

app.get('/register',function(req,res){
 console.log("reached register form")
 console.log(req.query.userName);
 console.log(req.query.userPassword);
 console.log(req.query.emailId);

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
  var usern = req.query.userName;
  var userp = req.query.userPassword;
  var em = req.query.emailId;

  var addUser = "INSERT INTO Register (Username,Password,EmailId) VALUES ('" + req.query.userName + "','" + req.query.userPassword + "','" + req.query.emailId + "')";
  console.log(addUser);
  client.query(addUser, (sqlErr,sqlRes) => {
        if(sqlErr){
            return res.status(500).send({
                errorType: 'Primary Key exiists',
                message: 'User already exists',
            });
        }
        return res.status(200).send({
            message: 'Registered Successfully'
        });

        client.end();
  })
});

app.post('/iFeel', function(req, res) {
   //userName emotion
    const client = new Client({connectionString: process.env.DATABASE_URL });
    client.connect();
    var uname = res.query.userName;
    var emo = res.query.emotion;
    var getEmo = "select " + emo + " from MoodTracker where Username = '" + uname + "'";
    var count = 0;
    client.query(getEmo, (sqlErr,sqlRes) => {
        count = sqlRes.rows[0][0];
        count++;
    });
    var update_emo = "update MoodTracker set " + emo + " = " + count + " where Username = '" + uname + "'";
    client.query(update_emo, (sqlErr,sqlRes) => {
         if(sqlErr){
             return res.status(500).send({
                    errorType: 'Internal Error',
                    message: 'SQL Error',
             });
         }
         return res.status(200).send({
                message: 'Data modified successfully'
         });

         client.end();
    });
});
/*
app.get('/moodTracker',function(req,res){
console.log(moodTracker.query.userName)
if(!req.query.userName){
    return res.status(422).send({
    errorType: 'RequestFormatError',
    message: 'Must include the userName.',
    });
 }

   const client = new Client({connectionString: process.env.DATABASE_URL
      });

  client.connect();

     var usern = req.query.userName;
     var authenticate = "SELECT * FROM MoodTracker WHERE Username = '" + usern + "'";
     client.query(authenticate, (sqlErr,sqlRes) => {
     if(sqlErr){
        return res.status(500).send({
                   errorType: 'InternalError',
                   message: 'SQL',
                   });
     }


    if(!sqlRes.rows[0]){
       return res.status(404).send({
           errorType: 'RequestFormatError',
           message: 'Cannot find these emotions for this person; this person has no emotions.',
           });

     }
     return res.status(200).send({
              message: 'Reached the login'
              data: sqlRes.rows[0]
            });

      client.end();

  });

});
*/
app.get('/',function(req,res){
     return res.status(200).send({
       message: 'Reached the main page'
     });
});
app.listen(process.env.PORT || 5000);
