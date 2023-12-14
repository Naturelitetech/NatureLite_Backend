const express = require('express');
const router = express.Router();
const db = require('../../config/db');

//User
// code for fetching users
router.get('/users', (req, res) => {

    const query = `
        SELECT user.user_id, user.name, user.number, user.password, user.email, user.department, user.verified, role.role_name
        FROM user
        JOIN role ON user.role_id = role.role_id
      `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(500).send('Server error');
            return;
        }

        res.json(results);
    });
});

// code for edit a user
router.put('/users/:user_id', (req, res) => {

    const userId = req.params.user_id;
    const { name, number, password, department, email } = req.body;

    const query = 'UPDATE user SET name = ?, number = ?, password = ?, department = ?, email = ? WHERE user_id = ?';
    db.query(query, [name, number, password, department, email, userId], (err, results) => {

        if (err) {
            console.error('Error updating user: ' + err);
            res.status(500).json({ error: 'Could not update user' });
            return;
        }
        res.status(200).json({ message: 'User updated successfully' });
    });
});

// code for deleting a user
router.delete('/users/:user_id', (req, res) => {

    const userId = req.params.user_id;
    const query = 'DELETE FROM user WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
            return;
        }
        res.json({ message: 'User deleted' });
    });
});

// Products
// code for fetching products
router.get('/products', (req, res) => {

    const sql = 'SELECT * FROM product';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching product:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(result);
    });
});

// code for updating a product
router.put('/products/:prod_id', (req, res) => {

    const prodID = req.params.prod_id;
    const { prod_name, rate } = req.body;

    const query = 'UPDATE product SET prod_name = ?, rate = ? WHERE prod_id = ?';
    db.query(query, [prod_name, rate, prodID], (err, results) => {

        if (err) {
            console.error('Error updating product: ' + err);
            res.status(500).json({ error: 'Could not update product' });
            return;
        }
        res.status(200).json({ message: 'product updated successfully' });
    });
});

// code for deleting a product
router.delete('/products/:prod_id', (req, res) => {
    const prodID = req.params.prod_id;

    const query = 'DELETE FROM product WHERE prod_id = ?';
    db.query(query, [prodID], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
            return;
        }
        res.json({ message: 'product deleted' });
    });
});

// Customers
// code for fetching customers
router.get('/customers', (req, res) => {

    const sql = 'SELECT * FROM customer';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching customer:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(result);
    });
});

// code for updating a customer
router.put('/customers/:cust_id', (req, res) => {

    const custID = req.params.cust_id;
    const { name, number, address } = req.body;

    const query = 'UPDATE customer SET name = ?, number = ?, address = ? WHERE cust_id = ?';
    db.query(query, [name, number, address, custID], (err, results) => {

        if (err) {
            console.error('Error updating customer: ' + err);
            res.status(500).json({ error: 'Could not update customer' });
            return;
        }
        res.status(200).json({ message: 'customer updated successfully' });
    });
});

// code for deleting a customer
router.delete('/customers/:cust_id', (req, res) => {

    const custID = req.params.cust_id;
    const query = 'DELETE FROM customer WHERE cust_id = ?';
    db.query(query, [custID], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
            return;
        }
        res.json({ message: 'customer deleted' });
    });
});

// update user verification status
router.put('/verify/:user_id', (req, res) => {

    const userId = req.params.user_id;
    db.query('UPDATE user SET verified = 1 WHERE user_id = ?', [userId], (err, result) => {
        if (err) {
            console.error('Error verifying user: ' + err);
            res.status(500).send('Error verifying user');
        } else {
            res.send('User verified');
        }
    });
});

module.exports = router;
