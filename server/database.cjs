const { Pool } = require("pg");
require("dotenv").config();
const connectionString = "postgres://mfyzxymc:3t0A7UEwg0dYeRLJbCUYwTfPPyGfIoc_@kandula.db.elephantsql.com/mfyzxymc";
const pool = new Pool({
  connectionString,
  
});
console.log(connectionString)
module.exports = {
  query: (text, params) => pool.query(text, params),
};