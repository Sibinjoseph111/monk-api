const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());



app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD');
    res.setHeader('Access-Control-Allow-Headers', 'x-auth,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Expose-Headers','x-auth, content-type');

    next();
});

// User signup
app.post('/user/signup', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
  
    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
      // console.log(header);
    }).catch((e) => {
      res.status(400).send(e);
    })
  });

//Update user
app.patch('/user/update', (req,res) =>{
    var token = req.body.token;
    var body = _.pick(req.body,['username','charity','phone']);
    
    User.findByToken(token).then((user) => {
       var _id = new ObjectID(user._id);
      //  console.log(_id);
        User.updateUser(_id,body).then((user) =>{
            res.send({user});
        },(err) =>{
          res.status(404).send('User not found');
        });        
    }).catch((e) => {
      res.status(404).send('User not found');
    });
});

//Login User

app.post('/user/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    
    if(user.tokens[0]){
      // console.log("old token"+user.tokens[0].token);
      return res.header('x-auth', user.tokens[0].token).send(user);
    }

    return user.generateAuthToken().then((token) => {
      // console.log('new token'+token);
      res.header('x-auth', token).send(user);
      });

  }).catch((e) => {
    // console.log('error');
    res.status(400).send();
  });
});

//User details

app.post('/user/details', authenticate, (req, res) => {
  res.send(req.user);
});

//Logout user

app.delete('/user/logout', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

  app.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });
  
//   module.exports = {app};
  