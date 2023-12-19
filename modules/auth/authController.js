// auth/authController.js
const db = require('../../config/db');
const { generateToken } = require('../../utils/helpers');
const bcrypt = require('bcrypt');

const authController = {

    signup: async (req, res) => {
        try {
            const name = req.body.name;
            const number = req.body.number;
            const password = String(req.body.password);
            const department = req.body.department;
            const role = req.body.role;
            const email = 'ashi133@gmail.com'; // Fixed email
            const verificationToken = generateToken();

            // Hash the password before storing it in the database
            const hashedPassword = await bcrypt.hash(password, 10);

            const query = 'SELECT role_id FROM role WHERE role_name = ?';
            db.query(query, [role], async (roleErr, roleResults) => {
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
                db.query(sql, [name, number, hashedPassword, department, roleId, email, verificationToken], (err, data) => {
                    if (err) {
                        console.error('Error executing user query: ' + err);
                        res.status(500).json({ error: 'Database error' });
                    }
                    else {
                        res.json({ message: 'User registered successfully' });
                    }
                });
            });
        } catch (error) {
            console.error('Error during signup:', error);
            res.status(500).json({ error: 'Server error during signup' });
        }
    },

    login: (req, res) => {

        const { number, password } = req.body;

        // Verify user credentials here
        db.query('SELECT * FROM user WHERE number = ?', [number], async (err, results) => {
            if (err) {
                console.error('Error during login: ' + err);
                res.status(500).send('Error during login');
            } else if (results.length > 0) {
                // User exists
                const hashedPasswordFromDatabase = results[0].password;

                // Hash the provided password for comparison
                //const hashedProvidedPassword = await bcrypt.hash(password, 10);

                // Compare the plaintext password with the hashed password from the database
                const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDatabase);

                if (passwordMatch) {
                    // User exists and credentials match
                    const userId = results[0].user_id;
                    const verified = results[0].verified;

                    // Check the user's verification status
                    db.query('SELECT verified FROM user WHERE user_id = ?', [userId], (err, results) => {
                        if (err) {
                            console.error('Error checking user verification status: ' + err);
                            res.status(500).send('Error checking user verification status');
                        } else if (results.length > 0 && results[0].verified === 1) {
                            // res.status(200).send('Login successful');
                            res.status(200).json({ userId }); // Include userId in the response
                        } else {
                            res.status(401).send('Please wait for verification');
                        }
                    });
                } else {
                    // Passwords don't match
                    console.log('Passwords do not match');
                    res.status(401).send('Incorrect credentials');
                }
            } else {
                // User not found or credentials don't match
                res.status(401).send('No record exists');
            }
        });

    },
}
module.exports = authController;
