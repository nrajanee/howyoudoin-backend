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

  client.connect(); //connect

     var usern = req.query.userName;
     var authenticate = "SELECT * FROM Register WHERE Username = '" + usern + "'";
     client.query(authenticate, (sqlErr,sqlRes) => {
        if(sqlErr){
            client.end();
            return res.status(500).send({
                   errorType: 'InternalError',
                   message: 'SQL',
            });
        }

        if(!sqlRes.rows[0]){
             client.end();
            return res.status(404).send({
            errorType: 'RequestFormatError',
            message: 'Cannot find the username.',
            });

        }
        console.log(sqlRes.rows[0].password)
        if(sqlRes.rows[0].password.trim()!== req.query.userPassword.trim()){
            client.end();
            return res.status(404).send({
            errorType: 'RequestFormatError',
            message: 'incorrect Password.',
                });
        }

         client.end();
        return res.status(200).send({
              message: 'Reached the login'
        });

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
            client.end();
            return res.status(500).send({
                errorType: 'Primary Key exiists',
                message: 'User already exists',
            });
        }
  })

  var addUserToMoodTracker = "INSERT INTO MoodTracker(Username,Happiness,Surprise,Sadness,Fear,Anger,Disgust) VALUES ('" + usern + "',0,0,0,0,0,0)";
  console.log(addUserToMoodTracker);
  client.query(addUserToMoodTracker, (sqlErr,sqlRes) => {
          if(sqlErr){
              client.end();
              return res.status(500).send({
                  errorType: 'Primary Key exiists',
                  message: 'User already exists',
              });
          }
          client.end();
         return res.status(200).send({
                         message: 'Registered sucessfully'
                  });
    })

});
app.get('/iFeel1', function(req, res){
    const client = new Client({connectionString: process.env.DATABASE_URL });
    client.connect();
    console.log("inside iFeel1 post")
    var uname = req.query.userName;
    console.log(uname);
    var emo = req.query.emotion;
    console.log(emo);
    var getEmo = "select " + emo + " from MoodTracker where Username = '" + uname + "'";
    console.log(getEmo);
    var count = 0;
    client.query(getEmo, (sqlErr,sqlRes) => {
        if(sqlErr){
             client.end();
             return res.status(500).send({
                 errorType: 'Internal Error',
                 message: 'SQL Error',
             });
        }
        console.log(sqlRes.rows[0]);

        if(emo.trim() === 'Happiness'){
           count = sqlRes.rows[0].happiness;
        }
        if(emo.trim() === 'Surprise'){
            count = sqlRes.rows[0].surprise;
        }
        if(emo.trim() == 'Anger'){
            count = sqlRes.rows[0].anger;
        }
        if(emo.trim() == 'Sadness'){
            count = sqlRes.rows[0].sadness;
        }
        if(emo.trim() == 'Disgust'){
            count = sqlRes.rows[0].disgust;
        }
        if(emo.trim() == 'Fear'){
            count = sqlRes.rows[0].fear;
        }      

        console.log("Emotioncount " + count);
        //count++;
        //console.log("should get incremented");
        count++;

        console.log("EmotioncountIncremented " + count);
        client.end();
        return res.status(200).send({
                message: "iFeel1 done",
                data : count,
        });
    });

});

app.post('/iFeel2', function(req, res) {
   //userName emotion
    console.log("inside iFeel2 post")
    var uname = req.query.userName;
    console.log(uname);
    var emo = req.query.emotion;
    console.log(emo);

    var increased = req.query.count;
    console.log(increased);
    const client = new Client({connectionString: process.env.DATABASE_URL });
    client.connect();
    //console.log(count);
    var update_emo = "update MoodTracker set " + emo + " = " + increased + " where Username = '" + uname + "'";
    console.log(update_emo);
    client.query(update_emo, (sqlErr,sqlRes) => {
         if(sqlErr){
             client.end();
             return res.status(500).send({
                    errorType: 'Internal Error',
                    message: 'SQL Error',
             });
         }

         client.end();
         return res.status(200).send({
                message: 'Data modified successfully'
         });
    });
});


app.get('/moodTracker',function(req,res){
console.log("moodTracker");
console.log(req.query.userName)
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
        client.end();
        return res.status(500).send({
                   errorType: 'InternalError',
                   message: 'SQL',
                   });
     }


    if(!sqlRes.rows[0]){
       client.end();
       return res.status(404).send({
           errorType: 'RequestFormatError',
           message: 'Cannot find these emotions for this person; this person has no emotions.',
           });

     }
     client.end();
     return res.status(200).send({
              message: 'Reached the moodTracker',
              data: sqlRes.rows[0],
            });

  });

});


app.get('/',function(req,res){
     return res.status(200).send({
       message: 'Reached the main page'
     });
});
app.listen(process.env.PORT || 5000);
