const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// POST route to handle form submission
app.post('/contact', (req, res) => {
  console.log('Form submission received.'); // Debugging message

  const { name, email, phone, subject, message } = req.body;

  // Create transporter for admin email
  let adminTransporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'itwclasses@gmail.com', // Your Gmail email address
      pass: 'mauodubtojmfphdy' // Your Gmail password
    }
  });

  // Email options for admin
  let adminMailOptions = {
    from: email,
    to: 'vishalnagar74405@gmail.com', // Your email address where you want to receive the form data
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <p><strong style="color: #333;">Name:</strong> ${name}</p>
        <p><strong style="color: #333;">Email:</strong> ${email}</p>
        <p><strong style="color: #333;">Phone:</strong> ${phone}</p>
        <p><strong style="color: #333;">Subject:</strong> ${subject}</p>
        <p><strong style="color: #333;">Message:</strong></p>
        <p style="color: #333;">${message}</p>
      </div>
    `
  };

  // Send email to admin
  adminTransporter.sendMail(adminMailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email to admin:', error); // Debugging message
    } else {
      console.log('Email sent to admin:', info.response); // Debugging message
    }
  });

  // Create transporter for user thank you email
  let userTransporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'itwclasses@gmail.com', // Your Gmail email address
      pass: 'mauodubtojmfphdy' // Your Gmail password
    }
  });

  // Email options for user
  let userMailOptions = {
    from: 'itwclasses@gmail.com', // Your Gmail email address
    to: email, // User's email address
    subject: 'Thank You for Contacting Us',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 5px; text-align: center;">
        <img src="https://vishal-nagar744.github.io/Indori-Trading-Wala/images/logo1.jpeg" alt="Indori Trading Wala" style="width: 100px; border-radius: 50%; margin-bottom: 20px;">
        <h2 style="color: #333;">Thank You for Contacting Us</h2>
        <p style="color: #333;">Dear ${name},</p>
        <p style="color: #333;">We have received your message and will get back to you as soon as possible.</p>
        <p style="color: #333;">Best regards,</p>
        <p style="color: #333; font-weight: bold;">Indori Trading Wala</p>
      </div>
    `
  };

  // Send email to user
  userTransporter.sendMail(userMailOptions, (error, info) => {
    if (error) {
      console.log('Error sending thank you email to user:', error); // Debugging message
    } else {
      console.log('Thank you email sent to user:', info.response); // Debugging message
    }
  });

  // Respond to the client
  res.status(200).send('Success: Your message has been sent.');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
