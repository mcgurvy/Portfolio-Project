require('dotenv').config(); // Add this line at the very top
console.log("Server is starting...");
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000; // or any other available port


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World! This is your backend server.');
});

// Example route to handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Configure the email transport using Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Use your email service
        auth: {
            user: 'mbuggua.jn@gmail.com', // Your email
            pass: 'yjfmejyetfctduhl' // Your email password
        }
    });

    // Setup email data
    const mailOptions = {
        from: email,
        to: 'mbuggua.jn@gmail.com', // Your email to receive the message
        subject: `New message from ${name}`,
        text: message,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});