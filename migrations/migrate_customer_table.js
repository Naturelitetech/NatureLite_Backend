const db = require('../config/db');

const createCustomerTableQuery = `
  CREATE TABLE IF NOT EXISTS customer (
    cust_id int(20) NOT NULL AUTO_INCREMENT,
    name varchar(20) NOT NULL,
    number varchar(10) NOT NULL UNIQUE,
    address text NOT NULL,
    created_at timestamp NULL DEFAULT current_timestamp(),
    updated_at timestamp NULL DEFAULT current_timestamp(),
    PRIMARY KEY (cust_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
`;

db.query(createCustomerTableQuery, (err, results, fields) => {
  if (err) {
    console.error('Error creating customer table:', err);
  } else {
    console.log('Customer table created');
  }
  db.end(); // Close the MySQL connection
});