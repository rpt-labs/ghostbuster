const { Pool } = require('pg');
const {
  PGUSER,
  PGHOST,
  PGDATABASE,
  PGPASSWORD,
  PGPORT
} = process.env;

const pool = new Pool({
  user: 'sa',
  host: PGHOST,
  database: PGDATABASE,
  password: 'sa',
  port: PGPORT,
});


module.exports = {
  query: (text, params) => pool.query(text, params)
};
