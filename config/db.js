const mysql2 = require('mysql2');

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "Akku1212@95",
    database: "naturelite_db"
})

db.connect((err) => {
    if (err) {
        console.error('Database connection failed');
        console.error(err);
        return;
    }
    console.log('Connected to the database');
});

module.exports = db;