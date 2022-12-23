const Pool = require('pg').Pool

  const pool = (() => {
    if (process.env.REACT_APP_NODE_ENV === 'development') {
        return new Pool({
          user: process.env.REACT_APP_DB_user,
          host: process.env.REACT_APP_DB_host,
          database: process.env.REACT_APP_DB_database,
          password: process.env.REACT_APP_DB_password,
          port: process.env.REACT_APP_DB_port, 
        });
    } else {
        return new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: {
            rejectUnauthorized: false
          }
        })
    } })();

  module.exports = pool;