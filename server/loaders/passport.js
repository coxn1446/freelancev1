const passport = require('passport');
//var OpenIDConnectStrategy = require('passport-openidconnect');
const LocalStrategy = require('passport-local')
const db = require("../db/index")
const bcrypt = require('bcrypt')

module.exports = (app) => {
  app.use(passport.initialize());  
  app.use(passport.authenticate('session'));


  // Configure strategy to be use for local login
  passport.use(new LocalStrategy(function verify(username, password, cb) {
    const query = 'SELECT id, username, password FROM users WHERE username = $1';
    db.query(query, [username], function (err, result) {
      if (err) { return cb(err); }
      if (result.rows.length === 0) { return cb(null, false) }
      const user = result.rows[0];
      bcrypt.compare(password, user.password, function (err, isValid) {
        if (err || !isValid) return cb(null, false);
        return cb(null, {
          user_id: user.id,
          username: user.username
        });
      });
    });
  }));

  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username, name: user.displayName });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });
  

  
  return passport
}
