import mysql from 'mysql'

const mongoURI = 'mongodb+srv://magnus1298:Muskoka1960!@cluster0.jzend.mongodb.net/Cluster0?retryWrites=true&w=majority'

const sqlConn = mysql.createConnection({
    host: "localhost:3306",
    user: "root",
    password: "12345678"
});

export { mongoURI, sqlConn }