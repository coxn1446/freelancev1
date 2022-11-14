const linkedinRouter = require('./linkedin');
const twitterRouter = require('./twitter');
const authRouter = require('./auth');
const homeRouter = require('./home');


module.exports = (app, passport) => {
  linkedinRouter(app);
  twitterRouter(app);
  authRouter(app, passport);
  homeRouter(app);
}