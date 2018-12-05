const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('create table Register(Username varchar(32),Password varchar(32),EmailId varchar(32),primary key(Username));', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
});

client.query('create table MoodTracker(Emotion varchar(32),counter integer,primary key(Emotion));', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
});

client.query('create table Links(Emotion varchar(32),urls varchar(32));', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
});

client.query("insert into Register values('Test', 'testpass', 'tzalani@purdue.edu');", (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
});

client.query("insert into MoodTracker values('Anger', 0);", (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
});

client.query("insert into MoodTracker values('Sadness', 0);", (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
});

client.query("insert into MoodTracker values('Fear', 0);", (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
});

client.query("insert into MoodTracker values('Happiness', 0);", (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
});

client.query("insert into MoodTracker values('Surprise', 0);", (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
});

client.query("insert into MoodTracker values('Disgust', 0);", (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
});


client.end();
