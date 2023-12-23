const db = require('../config/db');

const createOrderDetailTableQuery = `
  CREATE TABLE IF NOT EXISTS order_detail (
    order_id int(20) NOT NULL AUTO_INCREMENT,
    cust_id int(20) NOT NULL,
    prod_id int(20) NOT NULL,
    date date NOT NULL,
    delivered_date date DEFAULT NULL,
    invoice varchar(100) NOT NULL,
    shipping_charge varchar(20) DEFAULT NULL,
    location varchar(20) NOT NULL,
    delivery_preference varchar(30) DEFAULT NULL,
    payment_mode varchar(30) NOT NULL,
    created_at timestamp NULL DEFAULT current_timestamp(),
    updated_at timestamp NULL DEFAULT current_timestamp(),
    amount int(11) NOT NULL,
    total_amount int(11) NOT NULL,
    grand_total int(11) NOT NULL,
    formatted_order_id varchar(20) NOT NULL,
    PRIMARY KEY (order_id),
    UNIQUE KEY formatted_order_id (formatted_order_id),
    KEY order_detail_ibfk_1 (prod_id),
    KEY cust_id (cust_id),
    CONSTRAINT order_detail_ibfk_1 FOREIGN KEY (prod_id) REFERENCES product (prod_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT order_detail_ibfk_2 FOREIGN KEY (cust_id) REFERENCES customer (cust_id) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
`;

db.query(createOrderDetailTableQuery, (err, results, fields) => {
  if (err) {
    console.error('Error creating customer table:', err);
  } else {
    console.log('Customer table created');
  }
  db.end(); // Close the MySQL connection
});