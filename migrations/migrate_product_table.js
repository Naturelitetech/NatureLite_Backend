const db = require('../config/db');

const createProductTableQuery = `
  CREATE TABLE IF NOT EXISTS product (
    prod_id int(20) NOT NULL AUTO_INCREMENT,
    prod_name varchar(50) NOT NULL,
    rate int(11) NOT NULL,
    created_at timestamp NULL DEFAULT current_timestamp(),
    updated_at timestamp NULL DEFAULT current_timestamp(),
    PRIMARY KEY (prod_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
`;

db.query(createProductTableQuery, (err, results, fields) => {
  if (err) {
    console.error('Error creating customer table:', err);
  } else {
    console.log('Customer table created');
  }
  db.end(); // Close the MySQL connection
});