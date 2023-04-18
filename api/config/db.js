const Pool = require("pg").Pool;

// var database_url = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`;
var database_url = `postgres://dnznfzkm:ETeunswcjN1LlifqzIBbyG35eM52bbUe@tiny.db.elephantsql.com/dnznfzkm`;
const pool = new Pool({
  connectionString: database_url,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
