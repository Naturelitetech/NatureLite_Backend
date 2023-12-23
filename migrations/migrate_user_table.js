const db = require('../config/db');

const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS user (
    user_id int(20) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    number varchar(10) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    department varchar(255) NOT NULL,
    role_id int(20) NOT NULL,
    email varchar(255) NOT NULL,
    verification_token varchar(50) NOT NULL,
    verified tinyint(1) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    updated_at timestamp NULL DEFAULT current_timestamp(),
    PRIMARY KEY (user_id),
    KEY role_id (role_id),
    CONSTRAINT user_ibfk_1 FOREIGN KEY (role_id) REFERENCES role (role_id) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
`;

db.query(createUserTableQuery, (err, results, fields) => {
  if (err) {
    console.error('Error creating customer table:', err);
  } else {
    console.log('Customer table created');
  }
  db.end(); // Close the MySQL connection
});