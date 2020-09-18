require("dotenv").config();

const env = {
  port: process.env.PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  // password: process.env.DD_PASS
  database: process.env.DB_NAME,
  PRIVATEKEY: process.env.PRIVATEKEY,
  REFRESHTOKEN: process.env.REFRESHTOKEN,
  EMAIL: process.env.EMAIL,
  PASSWORD_EMAIL: process.env.PASSWORD_EMAIL

};

module.exports = env;
