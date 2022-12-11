const linkedinRouter = require('./linkedin');
const twitterRouter = require('./twitter');
const facebookRouter = require('./facebook');
const authRouter = require('./auth');
const homeRouter = require('./home');
const blogRouter = require('./blog')
const commentRouter = require('./comment')
const usersRouter = require('./users')


module.exports = (app, passport) => {
  linkedinRouter(app);
  twitterRouter(app);
  facebookRouter(app)
  authRouter(app, passport);
  homeRouter(app);
  blogRouter(app);
  commentRouter(app)
  usersRouter(app)
}