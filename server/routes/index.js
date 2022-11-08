const linkedinRouter = require('./linkedin');
const twitterRouter = require('./twitter');
const registerRouter = require('./register');
const loginRouter = require('./login');


module.exports = (app, passport) => {
  linkedinRouter(app);
  twitterRouter(app);
  registerRouter(app, passport);
  loginRouter(app, passport);
}