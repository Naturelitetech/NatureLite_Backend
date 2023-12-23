const db = require('../config/db');

const createRoleTableQuery = `
  CREATE TABLE IF NOT EXISTS role (
    role_id int(20) NOT NULL AUTO_INCREMENT,
    role_name varchar(20) NOT NULL,
    PRIMARY KEY (role_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
`;

db.query(createRoleTableQuery, (err, results, fields) => {
  if (err) {
    console.error('Error creating customer table:', err);
  } else {
    console.log('Customer table created');
  }
  db.end(); // Close the MySQL connection
});