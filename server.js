const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.set('view engine', 'ejs');

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ashiagrawal133@gmail.com',
        pass: 'vzhd qblo xzqc vblw',
    },
});

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
    const role_id = req.body.role_id;
    const email = 'ashi133@gmail.com'; // Fixed email
    const verificationToken = generateToken();
    // ]

    // // Check for duplicate phone number
    // const user = await getUserByNumber(number);
    // if (user) {
    //     return res.status(400).json({ error: 'Phone number already in use' });
    // }

    const sql = 'INSERT INTO user (name, number, password, department, role_id, email, verification_token) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, number, password, department, role_id, email, verificationToken], (err, data) => {
        if (err) {
            return res.json("Error");
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

        // Send a verification email
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
        });
    });
});

// API endpoint for email verification
app.get('/verify/:token', (req, res) => {
    const token = req.params.token;
    // Verify the token and update the login status in the database
    const sql = 'UPDATE user SET verified = 1 WHERE verification_token = ?';
    db.query(sql, [token], (err, result) => {
        if (err) {
            console.log('Error verifying email:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json({ message: 'Email verified successfully' });
    });
});

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

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM user WHERE `number`= ? AND `password` = ?";
    db.query(sql, [req.body.number, req.body.password], (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // if (data.length === 0) {
        if (data.length > 0) {
            return res.json("Success");
            // return res.status(401).json({ error: 'User not found' });
        }

        // const user = data[0];

        // // Check if the email is verified
        // if (!user.verified) {
        //     // return res.status(401).json({ error: 'Email not verified' });
        //     alert ({ error: 'Email not verified' });
        // }

        // // Check the password 
        // if (user.password !== password) {
        //     return res.status(401).json({ error: 'Incorrect password' });
        // }

        // // Successful login
        // res.status(200).json({ message: 'Login successful' });

        else {
            return res.json("Failed");
        }
    });
});


// app.get('/api/users', (req, res) => {
//     const query = 'SELECT * FROM login';
//     db.query(query, (err, results) => {
//         if (err) {
//             console.log('Error:', err);
//             res.status(500).send('Error retrieving users');
//         } else {
//             res.status(200).json(results);
//             console.log(results);
//         }
//     });
// });


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

app.listen(8001, () => {
    console.log("listening");
})


app.post('/create_order', (req, res) => {

    console.log(req.body);
    const customer_details = req.body.customer;
    const order_details = req.body.order;
    // Check if the customer already exists 
    db.query('SELECT cust_id FROM customer WHERE number = ?', [customer_details.number], (err, results) => {

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
                    db.query('INSERT INTO order_detail (cust_id, prod_id, order_date, invoice, shipping_charge, location, delivery_preference, payment_mode, amount, total_amount, grand_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?)',
                        [
                            cust_id,
                            order_details.prod_id,
                            order_details.order_date,
                            order_details.invoice,
                            order_details.shipping_charge,
                            order_details.location,
                            order_details.delivery_preference,
                            order_details.payment_mode,
                            order_details.amount,
                            order_details.total_amount,
                            order_details.grand_total,
                        ],
                        (err) => {
                            if (err) {

                                console.error('Error inserting order details: ' + err.message);
                                return res.status(500).json({ error: 'Internal server error' });
                            }
                            res.json({ message: 'Order created successfully' });
                        });

                });

        } else {

            // Customer already exists, insert order details directly
            const cust_id = results[0].cust_id;
            db.query('INSERT INTO order_detail (cust_id, prod_id ,order_date, invoice, shipping_charge, location, delivery_preference, payment_mode, amount, total_amount, grand_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
                [
                    cust_id,
                    order_details.prod_id,
                    order_details.order_date,
                    order_details.invoice,
                    order_details.shipping_charge,
                    order_details.location,
                    order_details.delivery_preference,
                    order_details.payment_mode,
                    order_details.amount,
                    order_details.total_amount,
                    order_details.grand_total,
                ],
                (err) => {
                    if (err) {
                        console.error('Error inserting order details: ' + err.message);

                        return res.status(500).json({ error: 'Internal server error' });
                    }
                    res.json({ message: 'Order created successfully' });
                }
            );
        }
    }
    );
});