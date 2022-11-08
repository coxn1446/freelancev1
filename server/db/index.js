 const Pool = require('pg').Pool

 const pool = new Pool({
    user: process.env.REACT_APP_DB_user,
    host: process.env.REACT_APP_DB_host,
    database: process.env.REACT_APP_DB_database,
    password: process.env.REACT_APP_DB_password,
    port: process.env.REACT_APP_DB_port, 
  });

  module.exports = pool;