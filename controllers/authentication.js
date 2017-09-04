const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user) });
  res.set('authorization',tokenForUser(req.user));
}

exports.signup = function(req, res, next) {
  // see if a user with the given email exists
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password) {
    res.status(422).send( { error: 'email and password are required!'});
  }

  // if user exist, return Error
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    if(existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }
  // if not, create a user
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) { return next(err); }

      // respond to request
      res.send({ token: tokenForUser(user) });
    });
  });
}