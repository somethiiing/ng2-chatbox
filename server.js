const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const server = app.listen(3000);
const io = require('socket.io').listen(server);

// app setup
app.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(express.static(path.join(__dirname, 'dist')))
  .use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

let database = {
  'hello@wilsonyu.io': {
    username: 'hello@wilsonyu.io',
    password: 'lolpassword',
  }
}

let findUser = (db, user) => {
  return Object.keys(db).find(elem => elem === user);
}

passport.use(new LocalStrategy(
  (username, password, cb) => {
    let user = Object.keys(database).find( elem => elem === username);
    if (!user) { return cb(null, false) };
    if (database[user].password !== password) { return cb(null, false) };
    return cb(null, database[user])
  }
));

app.post('/signup', (req, res) => {
  const username = req.body.user;
  const password = req.body.password;
  const searchRes = findUser(database, username);
  let result;
  if (searchRes) { result = {data: username, token: null, status: 'USEREXISTS' } }
  else {
    database[username] = {
      username: username,
      password: password,
      notes: []
    }
    // create jwt token stuff
    let token = jwt.sign({username:username}, 'secret');
    result = { token: token, data: username, status: 'SUCCESS' };
  }
  res.json(result);
});

app.post('/signin', (req, res) => {
  const username = req.body.user;
  const password = req.body.password;
  const searchRes = findUser(database, username);
  let result;
  if (!searchRes) { result = {data: username, token: null, status: 'USERDOESNOTEXIST' } }
  else if (database[searchRes].password !== password) { result = {data: username, token: null, status: 'INCORRECTPASSWORD'} }
  else {
    let token = jwt.sign({ username: username }, 'secret');
    result = {
      token: token,
      data: {
        username: username,
        notes: database[username].notes
      },
      status: 'SUCCESS'
    };
  }
  res.json(result);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

io.on('connection', socket => {
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('message', message => {
    console.log('message:', message)
  })
});

// const port = process.env.PORT || '3000';
// app.set('port', port);

// app.listen(port, () => {
//   console.log(`Listening on port: ${port}`);
// });

console.log('listening on port 3000')