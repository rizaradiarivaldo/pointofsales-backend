const mysql = require("mysql2");
const env = require("../helpers/env");

const connection = mysql.createConnection({
  host: env.host,
  user: env.user,
  database: env.database,
  dateStrings: "date",
});

module.exports = connection;
