// server.js

// 1. Import necessary packages
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // This loads the .env file

// 2. Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3001; // Use port from .env or default to 3001

// 3. Set up middleware
app.use(cors()); // Allows your React app to make requests to this server
app.use(express.json()); // Allows the server to understand JSON in request bodies

// 4. Set up the Gmail Transporter
// This is the configuration for sending email
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.GMAIL_USER, // Your email from .env
    pass: process.env.GMAIL_APP_PASSWORD, // Your App Password from .env
  },
});

// 5. Create a simple "test" route
app.get("/", (req, res) => {
  res.send("Server is running and ready to send emails!");
});

// 6. Create the API endpoint for sending email
app.post("/send-email", (req, res) => {
  const { name, message, recipient } = req.body;

  if (!name || !message) {
    return res.status(400).send("Name and message are required.");
  }

  const emailHtml = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 20px auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.05); background-color: #ffffff;">
    <div style="text-align: center; margin-bottom: 25px;">
      <img src="cid:acheron-image" alt="Acheron" style="max-width: 100%; height: auto; border-radius: 8px; margin-bottom: 20px;" />
      <h1 style="color: #6a0572; font-size: 28px; margin-bottom: 10px;">You're Invited (Basta Invited)!</h1>
      <p style="color: #888888; font-size: 14px; margin: 0;">A special occasion awaits... (Basta special)</p>
    </div>

    <div style="margin-bottom: 25px;">
      <p style="font-size: 16px; color: #333333;">Dear ${name},</p>
      <p style="font-size: 16px; color: #333333;">
        ${message}
      </p>
    </div>

    <div style="text-align: center; background-color: #f8f8f8; padding: 20px; border-radius: 5px; margin-top: 30px;">
      <p style="font-size: 14px; color: #555555; margin-bottom: 5px;">We look forward to celebrating with you!</p>
      <p style="font-size: 14px; color: #555555; margin: 0;">Best Regards,</p>
      <p style="font-size: 16px; color: #6a0572; font-weight: bold; margin-top: 5px;">[DEV]</p>
    </div>
  </div>
`;

  // A plain text fallback is still crucial!
  const emailText = `
You're Invited!

Dear ${name},

${message}

We look forward to celebrating with you!
Best Regards,
[Your Name/Organization]
`;

  // Define the email options
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: recipient, // Where you want to receive the email
    subject: `New message from ${name}`,
    html: emailHtml,
    text: emailText,
    attachments: [
      {
        filename: "Acheron.png",
        path: path.join(__dirname, "assets", "Acheron.png"),
        cid: "acheron-image", // This CID is referenced in the HTML as src="cid:acheron-image"
      },
    ],
  };

  // 7. Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error: Could not send email.");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully!");
    }
  });
});

// 8. Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
