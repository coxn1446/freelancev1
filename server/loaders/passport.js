const passport = require('passport');
const LocalStrategy = require('passport-local')
const db = require("../db/index")
const bcrypt = require('bcrypt')

module.exports = (app) => {
  //initializes passport
  app.use(passport.initialize());  
  app.use(passport.authenticate('session'));

  //serializes a user into a unique ID within the session cookie
  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.user_id, username: user.username });
    });
  });
  
  //deserializes a user from the session cookie
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });


  // Configure strategy to be used for local login
  passport.use(new LocalStrategy(function verify(username, password, cb) {
    //searches for the username input in the database
    const query = 'SELECT id, username, password FROM users WHERE username = $1';
    db.query(query, [username], function (err, result) {
      if (err) { return cb(err); }
      //if query returns nothing, user does not exist
      if (result.rows.length === 0) { return cb(null, false, { message : 'No user with that username' }) }
      const user = result.rows[0];
      //if a user is returned by the query, we must compare the password input to what is in the database
      bcrypt.compare(password, user.password, function (err, isValid) {
        //if password incorrect, error message is shown
        if (err || !isValid) return cb(null, false, { message : 'Password invalid' });
        //if password is correct, function returns success message
        return cb(null, {
          user_id: user.id,
          username: user.username
        });
      });
    });
  }));
  
  return passport
}
