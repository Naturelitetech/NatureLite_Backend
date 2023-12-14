const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const twilio = require('twilio');

// Replace these with your Twilio credentials
const accountSid = 'ACa04b1269bd389c53acdf32aed1ff9848';
const authToken = '37aaf4e58b8f11a2b6c3d151a7e93fe9';
const twilioPhoneNumber = '+18304767823';

// Create a Twilio client 
const twilioClient = twilio(accountSid, authToken);

// fetch future form data from order_detail table in pending order list
router.get('/pending_list/:prefix', (req, res) => {
    const prefix = req.params.prefix;

    // Fetch order details using the formatted_order_id prefix
    const query = `
            SELECT 
                customer.name AS name,
                customer.number AS number,
                customer.address AS address,
                order_detail.formatted_order_id,
                order_detail.order_id,  -- Include order_id in the selection
                order_summary.order_detail_id,  -- Include order_detail_id in the selection
                order_summary.status,  -- Include status in the selection
                order_summary.quantity,  -- Include quantity in the selection
                order_summary.discount,  -- Include discount in the selection
                order_summary.order_id,  -- Include order_id in the selection
                product.prod_id,
                product.prod_name,
                product.rate,
                order_detail.amount AS order_detail_amount,
                order_detail.date,
                order_detail.total_amount,
                order_detail.grand_total,
                order_detail.shipping_charge,
                order_detail.location,
                order_detail.payment_mode,
                order_detail.delivery_preference
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
                order_id: row.order_id,
            },
            product: {
                prod_id: row.prod_id,
                prod_name: row.prod_name,
                rate: row.rate,
            },
            order_detail: {
                order_id: row.order_id,
                formatted_order_id: row.formatted_order_id,
                amount: row.order_detail_amount,
                total_amount: row.total,
                grand_total: row.grand_total,
                shipping_charge: row.shipping_charge,
                date: row.date,
                location: row.location,
                payment_mode: row.payment_mode,
                delivery_preference: row.delivery_preference,
            },

        }));

        res.json(ordersList);
    });
});

// delete api in pending list
router.delete('/pending_list/:order_id', (req, res) => {
    const orderId = req.params.order_id;

    // First, delete records from the child table (order_detail)
    const deleteOrderDetailQuery = 'DELETE FROM order_detail WHERE order_id = ?';
    db.query(deleteOrderDetailQuery, [orderId], (err, orderDetailResults) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
            return;
        }

        // Check if any rows were deleted from order_detail
        if (orderDetailResults.affectedRows > 0) {
            // If records were deleted from order_detail, proceed to delete from the parent table (order_summary)
            const deleteOrderSummaryQuery = 'DELETE FROM order_summary WHERE order_id = ?';
            db.query(deleteOrderSummaryQuery, [orderId], (err, orderSummaryResults) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Server error');
                    return;
                }

                // Check if any rows were deleted from order_summary
                if (orderSummaryResults.affectedRows > 0) {
                    // If records were deleted from both tables, send success response
                    res.status(200).json({ message: 'Order and related details deleted successfully' });
                } else {
                    // If no rows were deleted from order_summary, send a 404 response
                    res.status(404).json({ message: 'Order not found in order_summary' });
                }
            });
        } else {
            // If no rows were deleted from order_detail, send a 404 response
            res.status(404).json({ message: 'Order not found in order_detail' });
        }
    });
});

// API to mark an order as delivered in MySQL
router.put('/markAsDelivered/:order_id', (req, res) => {
    const orderId = req.params.order_id;

    // Step 1: Update the status of the order in the order_summary table
    const updateQuery = 'UPDATE order_summary SET status = ? WHERE order_id = ?';
    // const newFormattedOrderId = 'FUT_DEL_' + orderId.substring(8);

    db.query(updateQuery, ['delivered', orderId], (err, result) => {
        if (err) {
            console.error('Error updating MySQL record:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        // Check if the order_summary was found and updated successfully
        if (result.affectedRows === 0) {
            console.error('Order_summary not found or not updated:', orderId);
            res.status(404).json({ error: 'Order_summary not found or not updated' });
            return;
        }

        // Step 2: Update the formatted_order_id in the order_detail table
        const updateDetailQuery = 'UPDATE order_detail SET formatted_order_id = ?, delivered_date = ? WHERE order_id = ?';
        const newFormattedOrderId = 'IMM_DEL_' + orderId;
        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        db.query(updateDetailQuery, [newFormattedOrderId, currentDate, orderId], (err, detailResult) => {
            if (err) {
                console.error('Error updating order_detail:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            // Check if the order_detail was found and updated successfully
            if (detailResult.affectedRows === 0) {
                console.error('Order_detail not found or not updated:', orderId);
                res.status(404).json({ error: 'Order_detail not found or not updated' });
                return;
            }

            res.json({ success: true, message: 'Order marked as delivered successfully' });
        });
    });
});

// Update customer detail in pending order list
router.put('/update/customer_detail/:formatted_order_id', (req, res) => {
    const formatted_order_id = req.params.formatted_order_id;
    const { name, number, address } = req.body.customer;
    // console.log('Update request body:', req.body);

    // foreign key relationship between orders and customers
    const query = 'UPDATE customer SET name = ?, number = ?, address = ? WHERE cust_id IN (SELECT cust_id FROM order_detail WHERE formatted_order_id = ?)';

    // console.log('Update query:', query);
    db.query(query, [name, number, address, formatted_order_id], (err, results) => {
        if (err) {
            console.error('Error updating customer: ' + err);
            res.status(500).json({ error: 'Could not update customer' });
            return;
        }
        res.status(200).json({ message: 'Customer updated successfully' });
        // console.log('Update query parameters:', [name, number, address, formatted_order_id]);
    });
});

// update under edit button in order summary
router.put('/update/order_summary/:order_id', (req, res) => {
    const order_id = req.params.order_id;
    const { prod_name, rate } = req.body.product;
    const { amount, total_amount, grand_total, shipping_charge, date, location, payment_mode, delivery_preference } = req.body.order_detail;
    const { quantity, discount } = req.body.order_summary;
    // const { prod_name, rate, amount, total_amount, grand_total, shipping_charge, date, quantity, discount, location, payment_mode, delivery_preference } = req.body;

    // Update product data
    const updateProductQuery = 'UPDATE product SET prod_name = ?, rate = ? WHERE prod_id IN (SELECT prod_id FROM order_detail WHERE order_id = ?)';

    db.query(updateProductQuery, [prod_name, rate, order_id], (productErr, productResults) => {
        if (productErr) {
            console.error('Error updating product: ' + productErr);
            res.status(500).json({ error: 'Could not update product' });
            return;
        }

        // Update order_detail data
        const updateOrderDetailQuery = 'UPDATE order_detail SET amount = ?, total_amount = ?, grand_total = ?, shipping_charge = ?, date = ?, location = ?, payment_mode = ?, delivery_preference = ? WHERE order_id = ?';

        db.query(updateOrderDetailQuery, [amount, total_amount, grand_total, shipping_charge, date, location, payment_mode, delivery_preference, order_id], (orderDetailErr, orderDetailResults) => {
            if (orderDetailErr) {
                console.error('Error updating order_detail: ' + orderDetailErr);
                res.status(500).json({ error: 'Could not update order_detail' });
                return;
            }

            // Update order_summary data
            const updateOrderSummaryQuery = 'UPDATE order_summary SET quantity = ?, discount = ? WHERE order_id = ?';

            db.query(updateOrderSummaryQuery, [quantity, discount, order_id], (orderSummaryErr, orderSummaryResults) => {
                if (orderSummaryErr) {
                    console.error('Error updating order_summary: ' + orderSummaryErr);
                    res.status(500).json({ error: 'Could not update order_summary' });
                    return;
                }

                // Fetch the updated list after saving
                // fetchUpdatedOrderList(res); // Assuming you have a function like this
                res.status(200).json({ message: 'Product and order_detail updated successfully' });
            });
        });
    });
});

// Endpoint to handle order dispatch
router.post('/dispatch/:formattedOrderId', async (req, res) => {
    try {
        const { formattedOrderId } = req.params;
        const { number } = req.body;
        const yourServerBaseUrl = 'http://localhost:8001';

        const pdfLink = `${yourServerBaseUrl} /bills/fut_cust_${number}.pdf`;
        // Send an SMS using Twilio
        const message = await twilioClient.messages.create({
            body: `Send from naturelite - Dear customer, Your order has been dispatched! Download your bill: <a href="${pdfLink}">here</a>`,
            from: twilioPhoneNumber,
            to: '+91' + number,
        })

        console.log('SMS sent:', message.sid);

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error dispatching order:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

module.exports = router;

