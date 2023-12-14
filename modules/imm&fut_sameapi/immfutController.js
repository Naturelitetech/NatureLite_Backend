const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const fs = require('fs');
const path = require('path');

// get cust_id based on phone number in future and immediate form

router.get('/get_cust_id', (req, res) => {
    const { number } = req.query;

    // Query the database to get cust_id based on number
    db.query('SELECT cust_id FROM customer WHERE number = ?', [number], (err, results) => {
        if (err) {
            console.error('Error fetching cust_id: ' + err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (results.length > 0) {
                const cust_id = results[0].cust_id;
                res.json({ cust_id });
            } else {
                res.status(404).json({ error: 'Customer not found' });
            }
        }
    });
});

// immediate and future form save pdf in bills folder
router.post('/savePdf', (req, res) => {
    try {
        const { pdfContent, fileName } = req.body;

        const folderPath = path.join('./bills');
        const filePath = path.join(folderPath, fileName);

        // Create the folder if it doesn't exist
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        // Save the PDF content to a file
        fs.writeFileSync(filePath, pdfContent, 'binary');

        res.setHeader('Content-Type', 'routerlication/pdf');
        res.json({ success: true, message: 'PDF saved successfully' });
    } catch (error) {
        console.error('Error saving PDF:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }

});

// get customer details based on phone number
router.get('/get_customer_details', (req, res) => {

    const { number } = req.query;
    const query = `SELECT * FROM customer WHERE number = ? `;

    db.query(query, [number], (err, results) => {
        if (err) {
            console.error('Error querying MySQL:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (results.length > 0) {
                // Return customer details if found
                res.status(200).json(results[0]);
            } else {
                res.status(404).json({ error: 'Customer not found' });
            }
        }
    });
});

// retrieve product data
router.get("/product", (req, res) => {

    const query = "SELECT prod_id, prod_name, rate FROM product";
    db.query(query, (err, results, fields) => {
        if (err) {
            console.error("Error executing the query: " + err.message);
            res.status(500).send("Error fetching product data");
            return;
        }

        res.json(results);
    });
});

module.exports = router;