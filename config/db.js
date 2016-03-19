'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection(process.env.JAWSDB_URL ||{
  host:'localhost',
  user:'root',
  password:'test',
  database:'travel'
});

connection.connect(function(err){
if(err){
  console.log('Error:', err);
}
else{
  console.log('Connection success!');
}
});

module.exports = connection;
