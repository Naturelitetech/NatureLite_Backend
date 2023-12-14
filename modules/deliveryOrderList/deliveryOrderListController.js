const express = require('express');
const router = express.Router();
const db = require('../../config/db');

// fetch immediate form data from order_detail table in delivery order list
router.get('/delivery_list/:prefix', (req, res) => {
    const prefix = req.params.prefix;

    // Fetch order details using the formatted_order_id prefix
    const query = `
            SELECT 
                customer.name AS name,
                customer.number AS number,
                customer.address AS address,
                order_detail.formatted_order_id,
                order_summary.order_detail_id,  -- Include order_detail_id in the selection
                order_summary.status,  -- Include status in the selection
                order_summary.quantity,  -- Include quantity in the selection
                order_summary.discount,  -- Include discount in the selection
                product.prod_id,
                product.prod_name,
                product.rate,
                order_detail.amount AS order_detail_amount,
                order_detail.delivered_date,
                order_detail.total_amount,
                order_detail.grand_total,
                order_detail.shipping_charge,
                order_detail.location,
                order_detail.payment_mode
            FROM customer
            INNER JOIN order_detail ON customer.cust_id = order_detail.cust_id
            INNER JOIN order_summary ON order_detail.order_id = order_summary.order_id
            INNER JOIN product ON order_detail.prod_id = product.prod_id
            WHERE order_detail.formatted_order_id LIKE ?
        `;

    db.query(query, [`${prefix}%`], (err, results) => {
        if (err) {
            console.error('Error fetching order details: ' + err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'No orders found with the specified prefix' });
        }

        const ordersList = results.map((row) => ({
            customer: {
                name: row.name,
                number: row.number,
                address: row.address,
            },
            order_summary: {
                formatted_order_id: row.formatted_order_id,
                order_detail_id: row.order_detail_id,
                status: row.status,
                quantity: row.quantity,
                discount: row.discount,
            },
            product: {
                prod_id: row.prod_id,
                prod_name: row.prod_name,
                rate: row.rate,
            },
            order_detail: {
                order_detail_id: row.order_detail_id,  // Include order_detail_id in the response
                amount: row.order_detail_amount,
                total_amount: row.total,
                grand_total: row.grand_total,
                shipping_charge: row.shipping_charge,
                delivered_date: row.delivered_date,
                location: row.location,
                payment_mode: row.payment_mode,
            },

        }));

        res.json(ordersList);
    });
});

// API to mark an order as paid in MySQL
router.put('/markAsPaid/:order_detail_id', (req, res) => {

    const orderDetailId = req.params.order_detail_id;
    // console.log('Received request:', req.body);
    //console.log(orderDetailId);
    const { status } = req.body;
    // console.log('Received order_detail_id:', orderDetailId);

    const sql = 'UPDATE order_summary SET status= ? WHERE order_detail_id = ?';
    db.query(sql, [status, orderDetailId], (err, result) => {
        if (err) {
            console.error('Error updating MySQL record:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // console.log('Order marked as paid successfully:', orderDetailId);
            res.json({ success: status });
        }
    });
});

module.exports = router;
