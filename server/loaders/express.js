const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const cookieParser = require('cookie-parser');
const db = require("../db/index")

module.exports = (app) => {

  // provides a whitelist of acceptable origins
  app.use(cors({
    origin: ['http://localhost:3000','http://localhost:4000','https://www.freelancev1.com'],
    credentials: true
  }));

  // Transforms raw string of req.body into JSON
  app.use(bodyParser.json());

  // Parses urlencoded bodies
  app.use(bodyParser.urlencoded({ extended: true }));

  //Parse HTTP request cookies
  app.use(cookieParser())

  //If you have your node.js behind a proxy you need to set “trust proxy” in express:
  app.enable('trust proxy') // trust first proxy

  // Creates a session in production
  if(process.env.REACT_APP_NODE_ENV === "production") {
    app.use(
    session({  
      secret: process.env.REACT_APP_SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 30
      },
      store: new pgSession({
        pool : db,
        tableName : 'session'
      }),
    })
  );
  };

  // Creates a session in development
  if(process.env.REACT_APP_NODE_ENV === "development") {
    app.use(
    session({  
      secret: process.env.REACT_APP_SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 30
      },
      store: new pgSession({
        pool : db,
        tableName : 'session' 
      }),
    })
  );
  }

  return app;
  
}
