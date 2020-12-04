const mysql = require("mysql");
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path: path.join(__dirname + '/../.env')});

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
});

console.log(process.env.DB_HOST);
console.log("hello world");
db.connect(function(error) {
  if (!!error) {
    console.log(error);
  }else {
    console.log('Database Connected');
  }
})

module.exports = db;
