const linkedinRouter = require('./linkedin');
const twitterRouter = require('./twitter');
const facebookRouter = require('./facebook');
const authRouter = require('./auth');
const socialRouter = require('./social');
const blogRouter = require('./blog')
const commentsRouter = require('./comments')
const usersRouter = require('./users')
const likesRouter = require('./likes')


module.exports = (app, passport) => {
  linkedinRouter(app);
  twitterRouter(app);
  facebookRouter(app)
  authRouter(app, passport);
  socialRouter(app);
  blogRouter(app);
  commentsRouter(app)
  usersRouter(app)
  likesRouter(app)
}