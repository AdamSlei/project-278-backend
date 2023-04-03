const Pool = require("pg").Pool;

var database_url = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: database_url,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;