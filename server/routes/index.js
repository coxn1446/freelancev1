const linkedinRouter = require('./linkedin');
const twitterRouter = require('./twitter');
const facebookRouter = require('./facebook');
const authRouter = require('./auth');
const blogRouter = require('./blog')
const commentsRouter = require('./comments')
const usersRouter = require('./users')
const likesRouter = require('./likes')
const adsRouter = require('./ads')

//compiles all routes into a single export to be used in the server index file
module.exports = (app, passport) => {
  linkedinRouter(app);
  twitterRouter(app);
  facebookRouter(app)
  authRouter(app, passport);
  blogRouter(app);
  commentsRouter(app)
  usersRouter(app)
  likesRouter(app)
  adsRouter(app)
}