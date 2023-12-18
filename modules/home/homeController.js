const express = require('express');
const router = express.Router();
const db = require('../../config/db');

// based on role redirect the page
router.get('/checkPermission/:user_id', (req, res) => {

    const userId = req.params.user_id;
    // console.log(userId);
    // Use a SQL JOIN to retrieve the user role from the 'role' table
    const query = `
        SELECT u.*, r.role_name
        FROM user u
        LEFT JOIN role r ON u.role_id = r.role_id
        WHERE u.user_id = ?`;

    db.query(query, [userId], (err, results) => {
        if (err) {
            // console.error('Database error:', err);
            res.status(500).json({ error: 'Database error' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            const userRole = results[0].role_name
            res.json({ role: userRole });
        }
    });
});

module.exports = router;