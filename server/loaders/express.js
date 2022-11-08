const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const store = new session.MemoryStore();


module.exports = (app) => {

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

  // Transforms raw string of req.body into JSON
  app.use(bodyParser.json());

  // Parses urlencoded bodies
  app.use(bodyParser.urlencoded({ extended: true }));

 
  //app.set('trust proxy', 1);
  app.use(cookieParser())

  // Creates a session
  app.use(
    session({  
      secret: process.env.REACT_APP_SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store
    })
  );

  return app;
  
}
