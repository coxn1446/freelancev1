const linkedinRouter = require('./linkedin');
const twitterRouter = require('./twitter');
const registerRouter = require('./register');


module.exports = (app, passport) => {
  linkedinRouter(app);
  twitterRouter(app);
  registerRouter(app, passport);
}