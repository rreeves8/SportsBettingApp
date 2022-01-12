var mysql = require('mysql');

var conn = mysql.createConnection({
    host: "localhost:3306",
    user: "root",
    password: "12345678"
});

export default conn;
