const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const cookieParser = require('cookie-parser');
const db = require("../db/index")

module.exports = (app) => {

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors({
    origin: ['http://localhost:3000','http://localhost:80','https://freelancev1.herokuapp.com/','https://freelancev1.com'],
    credentials: true
  }));

  // Transforms raw string of req.body into JSON
  app.use(bodyParser.json());

  // Parses urlencoded bodies
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cookieParser())

  app.set('trust proxy', 1);

  // Creates a session
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
        pool : db, // Connection pool
        tableName : 'session'   // Use another table-name than the default "session" one
        // Insert connect-pg-simple options here
      }),
    })
  );

  return app;
  
}
