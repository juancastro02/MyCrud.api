const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '43693355',
    port: 3306,
    database: 'mycrud'
  });


  module.exports = {
    db
  }  