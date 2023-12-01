const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "naturelite_db"
})

db.connect((err) => {
    if (err) {
        console.error('Database connection failed');
        return;
    }
    console.log('Connected to the database');
});

module.exports = db;