const passport = require('passport');
const LocalStrategy = require('passport-local')
const db = require("../db/index")
const bcrypt = require('bcrypt')

module.exports = (app) => {
  app.use(passport.initialize());  
  app.use(passport.authenticate('session'));

  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.user_id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });


  // Configure strategy to be use for local login
  passport.use(new LocalStrategy(function verify(username, password, cb) {
    const query = 'SELECT id, username, password FROM users WHERE username = $1';
    db.query(query, [username], function (err, result) {
      if (err) { return cb(err); }
      if (result.rows.length === 0) { return cb(null, false, { message : 'No user with that username' }) }
      const user = result.rows[0];
      bcrypt.compare(password, user.password, function (err, isValid) {
        if (err || !isValid) return cb(null, false, { message : 'Password invalid' });
        return cb(null, {
          user_id: user.id,
          username: user.username
        });
      });
    });
  }));
  

  
  return passport
}
