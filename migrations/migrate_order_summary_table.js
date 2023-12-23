const db = require('../config/db');

const createOrderSummaryTableQuery = `
  CREATE TABLE IF NOT EXISTS order_summary (
    order_detail_id int(20) NOT NULL AUTO_INCREMENT,
    order_id int(20) NOT NULL,
    prod_id int(20) NOT NULL,
    quantity int(11) NOT NULL,
    discount int(11) NOT NULL,
    status varchar(50) DEFAULT NULL,
    created_at timestamp NULL DEFAULT current_timestamp(),
    updated_at timestamp NULL DEFAULT current_timestamp(),
    PRIMARY KEY (order_detail_id),
    KEY order_id (order_id),
    KEY order_summary_ibfk_1 (prod_id),
    CONSTRAINT order_summary_ibfk_1 FOREIGN KEY (order_id) REFERENCES order_detail (order_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT order_summary_ibfk_2 FOREIGN KEY (prod_id) REFERENCES product (prod_id) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
`;

db.query(createOrderSummaryTableQuery, (err, results, fields) => {
  if (err) {
    console.error('Error creating customer table:', err);
  } else {
    console.log('Customer table created');
  }
  db.end(); // Close the MySQL connection
});