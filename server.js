const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const db = require('./config/db');
const twilio = require('twilio');
const jsPDF = require('jspdf');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

// Replace these with your Twilio credentials
const accountSid = 'ACa04b1269bd389c53acdf32aed1ff9848';
const authToken = '37aaf4e58b8f11a2b6c3d151a7e93fe9';
const twilioPhoneNumber = '+18304767823';

// Create a Twilio client 
const twilioClient = twilio(accountSid, authToken);

// Ensure the 'bills' folder exists
const billsFolder = './bills';
if (!fs.existsSync(billsFolder)) {
    fs.mkdirSync(billsFolder);
}

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));

app.set('view engine', 'ejs');

// Nodemailer Configuration
/*const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ashiagrawal133@gmail.com',
        pass: 'vzhd qblo xzqc vblw',
    },
}); */

// Generate a verification token
function generateToken() {
    return uuid.v4();
}

app.post('/signup', async (req, res) => {

    // const values = [
    const name = req.body.name;
    const number = req.body.number;
    const password = req.body.password;
    const department = req.body.department;
    const role = req.body.role;
    const email = 'ashi133@gmail.com'; // Fixed email
    const verificationToken = generateToken();
    // ]

    // // Check for duplicate phone number
    // const user = await getUserByNumber(number);
    // if (user) {
    //     return res.status(400).json({ error: 'Phone number already in use' });
    // }

    // Query to get the role_id based on the role
    const query = 'SELECT role_id FROM role WHERE role_name = ?';

    db.query(query, [role], (roleErr, roleResults) => {
        if (roleErr) {
            console.error('Error executing role query: ' + roleErr);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        if (roleResults.length === 0) {
            res.status(404).json({ error: 'Role not found' });
            return;
        }

        const roleId = roleResults[0].role_id;

        // insert the user data and role_id into the database
        const sql = 'INSERT INTO user (name, number, password, department, role_id, email, verification_token) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [name, number, password, department, roleId, email, verificationToken], (err, data) => {
            if (err) {
                console.error('Error executing user query: ' + err);
                res.status(500).json({ error: 'Database error' });
            }
            else {
                res.json({ message: 'User registered successfully' });
            }


            // let mailSubject = 'Mail Verification';
            // const randomToken = randomstring.generate();
            // let content = '<p>Hii ' + req.body.name + ', \
            //     Please <a href="http://localhost:3000/mail-verification?token='+ randomToken + '"> Verify</a> your mail';
            // sendMail('ashi@gmail.com', mailSubject, content);

            // db.query('UPDATE user set token=? where email=?', [randomToken, 'ashi@gmail.com'], function (error, result) {

            //     if (error) {

            //         return res.json("Error");
            //     }
            // });

            /*  // Send a verification email
              const mailOptions = {
                  from: 'ashiagrawal133@gmail.com',
                  to: email,
                  subject: 'Email Verification',
                  // text: `Click the following link to verify your email: http://localhost:3000/verify/${verificationToken}`,
                  text: `A new user want to login please verify: http://localhost:3000/`,
              };
  
              transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                      console.log('Error sending email:', error);
                      return res.status(500).json({ error: 'Internal Server Error' });
                  }
  
                  //  console.log('Email sent:', info.response);
                  return res.json(info);
              });*/

        });
    });
});

// Endpoint to update user verification status
app.put('/verify/:user_id', (req, res) => {
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

// API endpoint for email verification
// app.get('/verify/:token', (req, res) => {
//     const token = req.params.token;
//     // Verify the token and update the login status in the database
//     const sql = 'UPDATE user SET verified = 1 WHERE verification_token = ?';
//     db.query(sql, [token], (err, result) => {
//         if (err) {
//             console.log('Error verifying email:', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//         res.status(200).json({ message: 'Email verified successfully' });
//     });
// });

// Email verification endpoint
// app.get('/verify/:token', async (req, res) => {
//     const token = req.query.token;

//     try {
//       // Verify the token and update the login status in the database
//       const connection = await pool.getConnection();
//       const [results, fields] = await connection.execute('UPDATE login SET verified = 1 WHERE verification_token = ?', [token]);
//       connection.release();

//       if (results.affectedRows > 0) {
//         res.redirect('http://your-frontend-url/success');
//       } else {
//         res.redirect('http://your-frontend-url/failure');
//       }
//     } catch (error) {
//       console.error(error);
//       res.redirect('http://your-frontend-url/failure');
//     }
//   });

//login success code here but not used
// app.post('/login', (req, res) => {
//     const sql = "SELECT * FROM user WHERE `number`= ? AND `password` = ?";
//     db.query(sql, [req.body.number, req.body.password], (err, data) => {
//         if (err) {
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//         // if (data.length === 0) {
//         if (data.length > 0) {
//             return res.json("Success");
//             // return res.status(401).json({ error: 'User not found' });
//         }

//         // const user = data[0];

//         // // Check if the email is verified
//         // if (!user.verified) {
//         //     // return res.status(401).json({ error: 'Email not verified' });
//         //     alert ({ error: 'Email not verified' });
//         // }

//         // // Check the password 
//         // if (user.password !== password) {
//         //     return res.status(401).json({ error: 'Incorrect password' });
//         // }

//         // // Successful login
//         // res.status(200).json({ message: 'Login successful' });

//         else {
//             return res.json("Failed");
//         }
//     });
// });

// Login endpoint (simplified)
app.post('/login', (req, res) => {

    const { number, password } = req.body;

    // Verify user credentials here and get the user ID
    // const userId = req.params.user_id;

    // Verify user credentials here
    db.query('SELECT * FROM user WHERE number = ? AND password = ?', [number, password], (err, results) => {
        if (err) {
            console.error('Error during login: ' + err);
            res.status(500).send('Error during login');
        } else if (results.length > 0) {
            // User exists and credentials match
            const userId = results[0].user_id;


            // Check the user's verification status
            db.query('SELECT verified FROM user WHERE user_id = ?', [userId], (err, results) => {
                if (err) {
                    console.error('Error checking user verification status: ' + err);
                    res.status(500).send('Error checking user verification status');
                } else if (results.length > 0 && results[0].verified === 1) {
                    res.status(200).send('Login successful');
                } else {
                    res.status(401).send('Please wait for verification');
                }
            });
        } else {
            // User not found or credentials don't match
            res.status(401).send('No record exists');
        }
    });


});

// Define an API endpoint to retrieve product data
app.get("/product", (req, res) => {
    const query = "SELECT prod_id, prod_name, rate FROM product";

    // Execute the query
    db.query(query, (err, results, fields) => {
        if (err) {
            console.error("Error executing the query: " + err.message);
            res.status(500).send("Error fetching product data");
            return;
        }

        // Send the product data as JSON
        res.json(results);
    });
});

// fetch user data from user table in amdin page
app.get('/users', (req, res) => {
    // const query = 'SELECT u.name, u.number, u.password, u.department, u.email, r.role_name FROM user u INNER JOIN role r ON u.role_id = r.role_id';

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

// API to edit a user
app.put('/users/:user_id', (req, res) => {
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

// API to delete a user
app.delete('/users/:user_id', (req, res) => {
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

app.listen(8001, () => {
    console.log("listening");
})

// old code 
// // future order form submit
// app.post('/create_order', (req, res) => {

//     // console.log(req.body);
//     const customer_details = req.body.customer;
//     const order_details = req.body.order;

//     // // Get the order ID from the request body
//     // const { order_id } = req.body;

//     // // Add your prefix to the order ID
//     // const prefixedOrderId = 'FUT_' + order_id;

//     // Check if the customer already exists 
//     db.query('SELECT cust_id FROM customer WHERE number = ? LIMIT 1', [customer_details.number], (err, results) => {

//         if (err) {
//             console.error('Error querying the customer: ' + err.message);
//             return res.status(500).json({ error: 'Internal server error' });
//         }

//         if (results.length === 0) {

//             // Customer doesn't exist, so insert them into the customers table 
//             db.query('INSERT INTO customer (name, number, address) VALUES (?, ?, ?)',
//                 [customer_details.name, customer_details.number, customer_details.address], (err, results) => {

//                     if (err) {
//                         console.error('Error inserting customer: ' + err.message);
//                         return res.status(500).json({ error: 'Internal server error' });
//                     }

//                     const cust_id = results.insertId;
//                     // const order_id = prefix + cust_id; // Add the prefix to the order_id

//                     // Insert order details with the cust_id and prefixed order_id
//                     db.query('INSERT INTO order_detail (cust_id, prod_id, date, invoice, shipping_charge, location, delivery_preference, payment_mode, amount, total_amount, grand_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?)',
//                         [
//                             // order_id, // This should be the first parameter
//                             // 'FUT_' + cust_id, // formatted_order_id,
//                             cust_id,
//                             order_details.prod_id,
//                             order_details.date,
//                             order_details.invoice,
//                             order_details.shipping_charge,
//                             order_details.location,
//                             order_details.delivery_preference,
//                             order_details.payment_mode,
//                             order_details.amount,
//                             order_details.total_amount,
//                             order_details.grand_total,
//                         ],
//                         (err, results) => {
//                             if (err) {
//                                 console.error('Error inserting order details: ' + err.message);
//                                 return res.status(500).json({ error: 'Internal server error' });
//                             }

//                             // Get the auto-generated order_id
//                             const autoGeneratedOrderId = results.insertId;

//                             // Construct the formatted_order_id
//                             const formattedOrderId = 'FUT_' + autoGeneratedOrderId;

//                             // Update the order_detail table with the formatted_order_id
//                             db.query('UPDATE order_detail SET formatted_order_id = ? WHERE order_id = ?',
//                                 [formattedOrderId, autoGeneratedOrderId],
//                                 (err) => {
//                                     if (err) {
//                                         console.error('Error updating formatted_order_id: ' + err.message);
//                                         return res.status(500).json({ error: 'Internal server error' });
//                                     }

//                                     res.json({ message: 'Order created successfully', order_id: autoGeneratedOrderId });
//                                 });
//                         });
//                 });
//         } else {

//             // Customer already exists, insert order details directly
//             const cust_id = results[0].cust_id;

//             db.query('INSERT INTO order_detail (cust_id, prod_id ,date, invoice, shipping_charge, location, delivery_preference, payment_mode, amount, total_amount, grand_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
//                 [
//                     // order_id, // This should be the first parameter
//                     // 'FUT_' + cust_id, // formatted_order_id
//                     cust_id,
//                     order_details.prod_id,
//                     order_details.date,
//                     order_details.invoice,
//                     order_details.shipping_charge,
//                     order_details.location,
//                     order_details.delivery_preference,
//                     order_details.payment_mode,
//                     order_details.amount,
//                     order_details.total_amount,
//                     order_details.grand_total,
//                 ],
//                 (err, results) => {
//                     if (err) {
//                         console.error('Error inserting order details: ' + err.message);
//                         return res.status(500).json({ error: 'Internal server error' });
//                     }

//                     // Get the auto-generated order_id
//                     const autoGeneratedOrderId = results.insertId;

//                     // Construct the formatted_order_id
//                     const formattedOrderId = 'FUT_' + autoGeneratedOrderId;

//                     // Update the order_detail table with the formatted_order_id
//                     db.query('UPDATE order_detail SET formatted_order_id = ? WHERE order_id = ?',
//                         [formattedOrderId, autoGeneratedOrderId],
//                         (err) => {
//                             if (err) {
//                                 console.error('Error updating formatted_order_id: ' + err.message);
//                                 return res.status(500).json({ error: 'Internal server error' });
//                             }

//                             res.json({ message: 'Order created successfully', order_id: autoGeneratedOrderId });
//                         });
//                 }
//             );
//         }
//     });
// });
//  immediate order form submit
// app.post('/create_order_immediate', (req, res) => {

//     // console.log(req.body);
//     const customer_details = req.body.customer;
//     const order_details = req.body.order;

//     // // Get the order ID from the request body
//     // const { order_id } = req.body;

//     // // Add your prefix to the order ID
//     // const prefixedOrderId = 'FUT_' + order_id;

//     // Check if the customer already exists 
//     db.query('SELECT cust_id FROM customer WHERE number = ? LIMIT 1', [customer_details.number], (err, results) => {

//         if (err) {
//             console.error('Error querying the customer: ' + err.message);
//             return res.status(500).json({ error: 'Internal server error' });
//         }

//         if (results.length === 0) {

//             // Customer doesn't exist, so insert them into the customers table 
//             db.query('INSERT INTO customer (name, number, address) VALUES (?, ?, ?)',
//                 [customer_details.name, customer_details.number, customer_details.address], (err, results) => {

//                     if (err) {
//                         console.error('Error inserting customer: ' + err.message);
//                         return res.status(500).json({ error: 'Internal server error' });
//                     }

//                     const cust_id = results.insertId;
//                     // const order_id = prefix + cust_id; // Add the prefix to the order_id

//                     // Insert order details with the cust_id and prefixed order_id
//                     db.query('INSERT INTO order_detail (cust_id, prod_id, date, invoice, shipping_charge, location, payment_mode, amount, total_amount, grand_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?)',
//                         [
//                             // order_id, // This should be the first parameter
//                             // 'FUT_' + cust_id, // formatted_order_id,
//                             cust_id,
//                             order_details.prod_id,
//                             order_details.date,
//                             order_details.invoice,
//                             order_details.shipping_charge,
//                             order_details.location,
//                             // order_details.delivery_preference,
//                             order_details.payment_mode,
//                             order_details.amount,
//                             order_details.total_amount,
//                             order_details.grand_total,
//                         ],
//                         (err, results) => {
//                             if (err) {
//                                 console.error('Error inserting order details: ' + err.message);
//                                 return res.status(500).json({ error: 'Internal server error' });
//                             }

//                             // Get the auto-generated order_id
//                             const autoGeneratedOrderId = results.insertId;

//                             // Construct the formatted_order_id
//                             const formattedOrderId = 'IMM_' + autoGeneratedOrderId;

//                             // Update the order_detail table with the formatted_order_id
//                             db.query('UPDATE order_detail SET formatted_order_id = ? WHERE order_id = ?',
//                                 [formattedOrderId, autoGeneratedOrderId],
//                                 (err) => {
//                                     if (err) {
//                                         console.error('Error updating formatted_order_id: ' + err.message);
//                                         return res.status(500).json({ error: 'Internal server error' });
//                                     }

//                                     res.json({ message: 'Order created successfully', order_id: autoGeneratedOrderId });
//                                 });
//                         });
//                 });
//         } else {

//             // Customer already exists, insert order details directly
//             const cust_id = results[0].cust_id;

//             db.query('INSERT INTO order_detail (cust_id, prod_id ,date, invoice, shipping_charge, location, payment_mode, amount, total_amount, grand_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//                 [
//                     // order_id, // This should be the first parameter
//                     // 'FUT_' + cust_id, // formatted_order_id
//                     cust_id,
//                     order_details.prod_id,
//                     order_details.date,
//                     order_details.invoice,
//                     order_details.shipping_charge,
//                     order_details.location,
//                     // order_details.delivery_preference,
//                     order_details.payment_mode,
//                     order_details.amount,
//                     order_details.total_amount,
//                     order_details.grand_total,
//                 ],
//                 (err, results) => {
//                     if (err) {
//                         console.error('Error inserting order details: ' + err.message);
//                         return res.status(500).json({ error: 'Internal server error' });
//                     }

//                     // Get the auto-generated order_id
//                     const autoGeneratedOrderId = results.insertId;

//                     // Construct the formatted_order_id
//                     const formattedOrderId = 'IMM_' + autoGeneratedOrderId;

//                     // Update the order_detail table with the formatted_order_id
//                     db.query('UPDATE order_detail SET formatted_order_id = ? WHERE order_id = ?',
//                         [formattedOrderId, autoGeneratedOrderId],
//                         (err) => {
//                             if (err) {
//                                 console.error('Error updating formatted_order_id: ' + err.message);
//                                 return res.status(500).json({ error: 'Internal server error' });
//                             }

//                             res.json({ message: 'Order created successfully', order_id: autoGeneratedOrderId });
//                         });
//                 }
//             );
//         }
//     });
// });


//new one
// future order form submit final

// future order form submission
app.post('/create_order', (req, res) => {

    const customer_details = req.body.customer;
    const order_details = req.body.order;

    // Check if the customer details are present and have a non-null number property
    if (!customer_details || typeof customer_details !== 'object' || !customer_details.number) {
        // console.error('Invalid customer details in the request payload:', req.body);
        return res.status(400).json({ error: 'Invalid customer details in the request payload' });
    }

    const customerNumber = customer_details.number; // Storing the number in another variable
    //console.log('Received customer details:', customer_details);

    // console.log('Request Body:', req.body);

    // Check if the customer already exists 
    db.query('SELECT cust_id FROM customer WHERE number = ? LIMIT 1', [customerNumber], (err, results) => {

        if (err) {
            console.error('Error querying the customer: ' + err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            // Customer doesn't exist, so insert them into the customers table 

            db.query('INSERT INTO customer (name, number, address) VALUES (?, ?, ?)',
                [customer_details.name, customerNumber, customer_details.address], (err, results) => {

                    if (err) {
                        console.error('Error inserting customer: ' + err.message);
                        return res.status(500).json({ error: 'Internal server error' });
                    }

                    const cust_id = results.insertId;

                    // Insert order details with the cust_id
                    insertFutureOrderDetails(res, cust_id, order_details);
                });
        } else {
            // Customer already exists, insert order details directly
            const cust_id = results[0].cust_id;
            insertFutureOrderDetails(res, cust_id, order_details);
        }
    });
});

// above future order form submission function
function insertFutureOrderDetails(res, cust_id, order_details) {

    let invoiceCounter = 1;
    let currentDate = new Date().toISOString().split('T')[0]; // Today's date

    const prod_id = order_details.prod_id;

    // Log the prod_id to check its value
    //console.log('Received prod_id:', prod_id);

    // Generate the invoice number based on the current date
    const today = new Date().toISOString().split('T')[0];
    if (today === currentDate) {
        // Same day, increment the counter
        invoiceCounter++;
    } else {
        // New day, reset the counter
        currentDate = today;
        invoiceCounter = 1;
    }

    const invoiceNumber = `${today}${invoiceCounter}`;

    db.query('INSERT INTO order_detail (cust_id, prod_id, date, invoice, shipping_charge, location, delivery_preference ,payment_mode, amount, total_amount, grand_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            cust_id,
            prod_id,
            order_details.date,
            invoiceNumber, // Use the generated invoice number here
            order_details.shipping_charge,
            order_details.location,
            order_details.delivery_preference,
            order_details.payment_mode,
            order_details.amount,
            order_details.total_amount,
            order_details.grand_total,
        ],
        (err, results) => {
            if (err) {
                console.error('Error inserting order details: ' + err.message);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const autoGeneratedOrderId = results.insertId;
            const formattedOrderId = 'FUT_' + autoGeneratedOrderId;

            // Update the order_detail table with the formatted_order_id
            db.query('UPDATE order_detail SET formatted_order_id = ? WHERE order_id = ?',
                [formattedOrderId, autoGeneratedOrderId],
                (err) => {
                    if (err) {
                        console.error('Error updating formatted_order_id: ' + err.message);
                        return res.status(500).json({ error: 'Internal server error' });
                    }

                    // Insert into order_summary table
                    const orderSummaryValues = [
                        autoGeneratedOrderId, // order_id
                        prod_id,
                        order_details.quantity || 1, // Use 1 as the default quantity if not provided
                        order_details.discount || 0, // Use 0 as the default discount if not provided
                    ];

                    db.query('INSERT INTO order_summary (order_id, prod_id, quantity, discount) VALUES (?, ?, ?, ?)',
                        orderSummaryValues,
                        (err) => {
                            if (err) {
                                console.error('Error inserting into order_summary: ' + err.message);
                                return res.status(500).json({ error: 'Internal server error' });
                            }

                            res.json({ message: 'Order created successfully', order_id: autoGeneratedOrderId });
                        });
                });
        }
    );
}

// immediate order form submit 
app.post('/create_order_immediate', (req, res) => {

    const customer_details = req.body.customer;
    const order_details = req.body.order;

    // Check if the customer already exists 
    db.query('SELECT cust_id FROM customer WHERE number = ? LIMIT 1', [customer_details.number], (err, results) => {

        if (err) {
            console.error('Error querying the customer: ' + err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            // Customer doesn't exist, so insert them into the customers table 
            db.query('INSERT INTO customer (name, number, address) VALUES (?, ?, ?)',
                [customer_details.name, customer_details.number, customer_details.address], (err, results) => {

                    if (err) {
                        console.error('Error inserting customer: ' + err.message);
                        return res.status(500).json({ error: 'Internal server error' });
                    }

                    const cust_id = results.insertId;

                    // Insert order details with the cust_id
                    insertImmediateOrderDetails(res, cust_id, order_details);
                });
        } else {
            // Customer already exists, insert order details directly
            const cust_id = results[0].cust_id;
            insertImmediateOrderDetails(res, cust_id, order_details);
        }
    });
});

// above immediate order form submission function
function insertImmediateOrderDetails(res, cust_id, order_details) {

    const prod_id = order_details.prod_id;

    db.query('INSERT INTO order_detail (cust_id, prod_id, date, invoice, shipping_charge, location, payment_mode, amount, total_amount, grand_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            cust_id,
            //order_details.prod_id,
            prod_id,
            order_details.date,
            order_details.invoice,
            order_details.shipping_charge,
            order_details.location,
            order_details.payment_mode,
            order_details.amount,
            order_details.total_amount,
            order_details.grand_total,
        ],
        (err, results) => {
            if (err) {
                console.error('Error inserting order details: ' + err.message);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const autoGeneratedOrderId = results.insertId;
            const formattedOrderId = 'IMM_' + autoGeneratedOrderId;

            // Update the order_detail table with the formatted_order_id
            db.query('UPDATE order_detail SET formatted_order_id = ? WHERE order_id = ?',
                [formattedOrderId, autoGeneratedOrderId],
                (err) => {
                    if (err) {
                        console.error('Error updating formatted_order_id: ' + err.message);
                        return res.status(500).json({ error: 'Internal server error' });
                    }

                    // Insert into order_summary table
                    const orderSummaryValues = [
                        autoGeneratedOrderId, // order_id
                        prod_id,
                        order_details.quantity || 1, // Use 1 as the default quantity if not provided
                        order_details.discount || 0, // Use 0 as the default discount if not provided
                    ];

                    db.query('INSERT INTO order_summary (order_id, prod_id, quantity, discount) VALUES (?, ?, ?, ?)',
                        orderSummaryValues,
                        (err) => {
                            if (err) {
                                console.error('Error inserting into order_summary: ' + err.message);
                                return res.status(500).json({ error: 'Internal server error' });
                            }

                            res.json({ message: 'Order created successfully', order_id: autoGeneratedOrderId });
                        });
                });
        }
    );
}

// based on role redirect the page
app.get('/checkPermission/:user_id', (req, res) => {
    const userId = req.params.user_id;

    // Use a SQL JOIN to retrieve the user role from the 'role' table
    const query = `
        SELECT u.*, r.role_name
        FROM user u
        LEFT JOIN role r ON u.role_id = r.role_id
        WHERE u.user_id = ?
    `;

    // Query the database to get the user's role
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Database error' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            const userRole = results[0].role_name
            res.json({ role: userRole });
        }
    });
});

// fetch future form data from order_detail table in pending order list
app.get('/pending_list/:prefix', (req, res) => {
    const prefix = req.params.prefix;

    // Fetch order details using the formatted_order_id prefix
    const query = `
            SELECT 
                customer.name AS name,
                customer.number AS number,
                customer.address AS address,
                order_detail.formatted_order_id,
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

    // console.log('Executing query:', query);
    // console.log('With parameters:', [`${prefix}%`]);

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
            },
            product: {
                prod_id: row.prod_id,
                prod_name: row.prod_name,
                rate: row.rate,
            },
            order_detail: {
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

// fetch immediate form data from order_detail table in delivery order list
app.get('/delivery_list/:prefix', (req, res) => {
    const prefix = req.params.prefix;

    // Fetch order details using the formatted_order_id prefix
    const query = `
            SELECT 
                customer.name AS name,
                customer.number AS number,
                customer.address AS address,
                order_detail.formatted_order_id,
                product.prod_id,
                product.prod_name,
                product.rate,
                order_detail.amount AS order_detail_amount,
                order_detail.date,
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
            },
            product: {
                prod_id: row.prod_id,
                prod_name: row.prod_name,
                rate: row.rate,
            },
            order_detail: {
                amount: row.order_detail_amount,
                total_amount: row.total,
                grand_total: row.grand_total,
                shipping_charge: row.shipping_charge,
                date: row.date,
                location: row.location,
                payment_mode: row.payment_mode,
            },

        }));

        res.json(ordersList);
    });
});

// delete api in pending list
app.delete('/pending_list/:formatted_order_id', (req, res) => {
    const formattedOrderId = req.params.formatted_order_id;

    // console.log(formattedOrderId);
    const query = 'DELETE FROM order_detail WHERE formatted_order_id = ?';
    db.query(query, [formattedOrderId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
            return;
        }
        if (results.affectedRows > 0) {
            res.status(200).json({ message: 'order deleted' });
        } else {
            res.status(404).json({ message: 'order not found' });
        }
    });
});

// API to mark an order as paid in MySQL
app.put('/markAsPaid/:order_detail_id', (req, res) => {

    const orderId = req.params.order_detail_id;
    // console.log('Received request:', req.body);
    // console.log(orderId);
    const { status } = req.body;
    // console.log('Received order_detail_id:', orderId);

    const sql = 'UPDATE order_summary SET status= ? WHERE order_detail_id = ?';
    db.query(sql, [status, orderId], (err, result) => {
        if (err) {
            console.error('Error updating MySQL record:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // console.log('Order marked as paid successfully:', orderId);
            res.json({ success: status });
        }
    });
});

// API to mark an order as delivered in MySQL
app.put('/markAsDelivered/:order_id', (req, res) => {
    const orderId = req.params.order_id;
    console.log('Order ID:', orderId);

    // Step 1: Update the status of the order in the order_detail table
    const updateQuery = 'UPDATE order_detail SET status = ? WHERE formatted_order_id = ?';
    const newFormattedOrderId = 'FUT_DEL_' + orderId.substring(8);

    db.query(updateQuery, ['delivered', newFormattedOrderId], (err, result) => {
        if (err) {
            console.error('Error updating MySQL record:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        // Check if the order was found and updated successfully
        if (updateResult.affectedRows === 0) {
            console.error('Order not found or not updated:', orderId);
            res.status(404).json({ error: 'Order not found or not updated' });
            return;
        }

        // Step 2: Retrieve the order details from the order_detail table
        const selectQuery = 'SELECT * FROM order_detail WHERE formatted_order_id = ? LIMIT 0, 25';

        db.query(selectQuery, [newFormattedOrderId], (err, selectResult) => {
            if (err) {
                console.error('Error fetching MySQL record:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            if (selectResult.length === 0) {
                console.error('Order not found:', orderId);
                res.status(404).json({ error: 'Order not found' });
                return;
            }

            const orderDetail = selectResult[0];

            res.json({ success: true, orderDetail });
        });
    });
});


// Update customer detail in pending order list
app.put('/update/pending_list/customer_detail/:formatted_order_id', (req, res) => {
    const formatted_order_id = req.params.formatted_order_id;
    const { name, number, address } = req.body;

    // foreign key relationship between orders and customers
    const query = 'UPDATE customer SET name = ?, number = ?, address = ? WHERE cust_id IN (SELECT cust_id FROM order_detail WHERE formatted_order_id = ?)';

    db.query(query, [name, number, address, formatted_order_id], (err, results) => {
        if (err) {
            console.error('Error updating customer: ' + err);
            res.status(500).json({ error: 'Could not update customer' });
            return;
        }
        res.status(200).json({ message: 'Customer updated successfully' });
    });
});

// Update order detail in pending order list
app.put('/update/pending_list/order_detail/:formatted_order_id', (req, res) => {
    const formatted_order_id = req.params.formatted_order_id;
    const { amount, total_amount, quantity, discount, shipping_charge } = req.body;
    // ...

    const query = 'UPDATE order_detail SET amount = ?, total_amount = ?, quantity = ?, discount = ?, shipping_charge = ? WHERE formatted_order_id = ?';

    db.query(query, [amount, total_amount, quantity, discount, shipping_charge, formatted_order_id], (err, results) => {
        if (err) {
            console.error('Error updating order: ' + err);
            res.status(500).json({ error: 'Could not update order' });
            return;
        }
        res.status(200).json({ message: 'Order updated successfully' });
    });
});

// under edit button in order summary
app.put('/update/pending_list/order_summary/:formatted_order_id', (req, res) => {
    const formatted_order_id = req.params.formatted_order_id;
    const { prod_name, rate, amount, total_amount, grand_total, shipping_charge, date, location, payment_mode, delivery_preference } = req.body;

    // Update product data
    const updateProductQuery = 'UPDATE product SET prod_name = ?, rate = ? WHERE prod_id IN (SELECT prod_id FROM order_detail WHERE formatted_order_id = ?)';

    db.query(updateProductQuery, [prod_name, rate, formatted_order_id], (productErr, productResults) => {
        if (productErr) {
            console.error('Error updating product: ' + productErr);
            res.status(500).json({ error: 'Could not update product' });
            return;
        }

        // Update order_detail data
        const updateOrderDetailQuery = 'UPDATE order_detail SET amount = ?, total_amount = ?, grand_total = ?, shipping_charge = ?, date = ?, location = ?, payment_mode = ?, delivery_preference = ? WHERE formatted_order_id = ?';

        db.query(updateOrderDetailQuery, [amount, total_amount, grand_total, shipping_charge, date, location, payment_mode, delivery_preference, formatted_order_id], (orderDetailErr, orderDetailResults) => {
            if (orderDetailErr) {
                console.error('Error updating order_detail: ' + orderDetailErr);
                res.status(500).json({ error: 'Could not update order_detail' });
                return;
            }

            res.status(200).json({ message: 'Product and order_detail updated successfully' });
        });
    });
});

// // get customer details based on phone number
app.get('/get_customer_details', (req, res) => {
    const { number } = req.query;

    // Query MySQL database for customer details
    const query = `SELECT * FROM customer WHERE number = ?`;

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

/*app.get('/get_customer_details', (req, res) => {
    const { number, newName } = req.query;
 
    // Check if a new name is provided
    if (!newName) {
        res.status(400).json({ error: 'New name is required for update' });
        return;
    }
 
    // Query MySQL database to check if the customer exists
    const checkQuery = 'SELECT * FROM customer WHERE number = ?';
 
    db.query(checkQuery, [number], (checkErr, checkResults) => {
        if (checkErr) {
            console.error('Error querying MySQL:', checkErr);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (checkResults.length > 0) {
                // Customer found, update the name
                const updateQuery = 'UPDATE customer SET name = ? WHERE number = ?';
 
                db.query(updateQuery, [newName, number], (updateErr, updateResults) => {
                    if (updateErr) {
                        console.error('Error updating customer:', updateErr);
                        res.status(500).json({ error: 'Internal server error' });
                    } else {
                        res.status(200).json({ message: 'Customer updated successfully' });
                    }
                });
            } else {
                // Customer not found
                res.status(404).json({ error: 'Customer not found' });
            }
        }
    });
});*/

// Endpoint to handle order dispatch
app.post('/dispatch/:formattedOrderId', async (req, res) => {
    try {
        const { formattedOrderId } = req.params;
        const { number } = req.body;
        const yourServerBaseUrl = 'http://localhost:8001';

        /* // Generate PDF bill
         const pdfPath = `./bills/bill_${number}.pdf`;
         const pdfDoc = new PDFDocument();
         pdfDoc.pipe(fs.createWriteStream(pdfPath));
         pdfDoc.text('Your Bill Content Here'); // Replace this with your actual bill content
         pdfDoc.end(); */

        const pdfLink = `${yourServerBaseUrl}/bills/fut_cust_${number}.pdf`;

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

/*app.post('/savePdf', (req, res) => {
    try{
 
       const { pdfContent, fileName } = req.body;
 
    // Create a new jsPDF instance
    const pdf = new jsPDF();
 
    // Add the content to the PDF
    pdf.text(pdfContent, 20, 20);
 
    // Specify the folder path where you want to save the PDF
    const folderPath = './bill';
 
    // Ensure the folder exists
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
 
    // Specify the file path
    const filePath = path.join(folderPath, fileName);
 
    console.log(filePath);
 
    // Save the PDF
    pdf.save(filePath);
 
    res.json({ message: 'PDF saved successfully!' });
    } catch (error) {
        console.error('Error saving PDF:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});*/

// immediate and future form save pdf in bills folder
app.post('/savePdf', (req, res) => {
    try {
        const { pdfContent, fileName, folderName } = req.body;

        const folderPath = path.join('./bills');
        const filePath = path.join(folderPath, fileName);

        // Create the folder if it doesn't exist
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        // Save the PDF content to a file
        fs.writeFileSync(filePath, pdfContent, 'binary');

        res.setHeader('Content-Type', 'application/pdf');
        res.json({ success: true, message: 'PDF saved successfully' });
    } catch (error) {
        console.error('Error saving PDF:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }

});


