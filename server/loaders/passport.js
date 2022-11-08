const passport = require('passport');
var OpenIDConnectStrategy = require('passport-openidconnect');
const db = require("../db/index")

module.exports = (app) => {
  app.use(passport.initialize());  
  app.use(passport.authenticate('session'));


  // Configure strategy to be use for local login
  passport.use(new OpenIDConnectStrategy({
    issuer: process.env.REACT_APP_AUTH0_DOMAIN + '/',
    authorizationURL: process.env.REACT_APP_AUTH0_DOMAIN + '/authorize',
    tokenURL: process.env.REACT_APP_AUTH0_DOMAIN + '/oauth/token',
    userInfoURL: process.env.REACT_APP_AUTH0_DOMAIN + '/userinfo',
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    clientSecret: process.env.REACT_APP_AUTH0_CLIENT_SECRETT,
    callbackURL: 'http://localhost:4000/login/oauth2/redirect',
    scope: [ 'profile' ]
  }, function verify(issuer, profile, cb) {
    return cb(null, profile);
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