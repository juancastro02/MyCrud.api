const mysql = require('mysql')
require('dotenv').config({ path: "./.env" })

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
  });


  module.exports = {
    db
  }  