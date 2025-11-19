// server.js

// 1. Import necessary packages
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
const { execSync } = require("child_process");
const fs = require("fs");
require("dotenv").config(); // This loads the .env file

// 2. Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3001; // Use port from .env or default to 3001

// 3. Set up middleware
app.use(cors()); // Allows your React app to make requests to this server
app.use(express.json({ limit: '50mb' })); // Allows the server to understand JSON in request bodies (increased limit for images)
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 4. Set up the Gmail Transporter
// This is the configuration for sending email
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587");
const SMTP_SECURE = process.env.SMTP_SECURE === "true"; // true for port 465, false for 587

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: {
    user: process.env.GMAIL_USER, // Your email from .env
    pass: process.env.GMAIL_APP_PASSWORD, // Your App Password from .env
  },
  connectionTimeout: 60000, // 60 seconds
  greetingTimeout: 30000, // 30 seconds
  socketTimeout: 60000, // 60 seconds
  logger: process.env.NODE_ENV !== 'production',
  debug: process.env.NODE_ENV !== 'production',
});

// Verify transporter configuration on startup
transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ SMTP Transporter verification failed:", error);
    console.error("Please check your environment variables:");
    console.error(`  SMTP_HOST: ${SMTP_HOST}`);
    console.error(`  SMTP_PORT: ${SMTP_PORT}`);
    console.error(`  SMTP_SECURE: ${SMTP_SECURE}`);
    console.error(`  GMAIL_USER: ${process.env.GMAIL_USER ? '✓ Set' : '✗ Not set'}`);
    console.error(`  GMAIL_APP_PASSWORD: ${process.env.GMAIL_APP_PASSWORD ? '✓ Set' : '✗ Not set'}`);
  } else {
    console.log("✅ SMTP Server is ready to send emails");
    console.log(`   Host: ${SMTP_HOST}:${SMTP_PORT} (Secure: ${SMTP_SECURE})`);
  }
});

// 5. Create a simple "test" route
app.get("/", (req, res) => {
  res.send("Server is running and ready to send emails!");
});

// Test SMTP connection endpoint
app.get("/test-smtp", async (req, res) => {
  try {
    await transporter.verify();
    res.json({
      success: true,
      message: "SMTP connection successful!",
      config: {
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE,
        user: process.env.GMAIL_USER
      }
    });
  } catch (error) {
    console.error("SMTP connection failed:", error);
    res.status(500).json({
      success: false,
      message: "SMTP connection failed",
      error: error.message,
      config: {
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE,
        user: process.env.GMAIL_USER
      }
    });
  }
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

// 7. Create the API endpoint for sending borrow receipt email using React components
app.post("/send-borrow-receipt", async (req, res) => {
  const { 
    recipient, 
    borrowerName, 
    borrowerId,
    requestId, 
    requestDate, 
    expectedReturnDate,
    purpose,
    authorizedStudents,
    requestedItems,
    assignedItems,
    adminNotes
  } = req.body;

  if (!recipient || !borrowerName || !requestId) {
    return res.status(400).send("Recipient, borrower name, and request ID are required.");
  }

  try {
    // Create a temporary JSON file with the props
    const tempPropsFile = path.join(__dirname, '.temp-email-props.json');
    const tempOutputFile = path.join(__dirname, '.temp-email-output.html');
    
    const props = {
      borrowerName,
      borrowerId,
      requestId,
      requestDate,
      expectedReturnDate,
      purpose,
      authorizedStudents,
      requestedItems,
      assignedItems,
      adminNotes,
    };
    
    fs.writeFileSync(tempPropsFile, JSON.stringify(props, null, 2));
    
    // Create a render script
    const renderScript = `
import { render } from "@react-email/render";
import React from "react";
import BorrowReceiptEmail from "./emails/BorrowReceiptEmail.jsx";
import fs from "fs";

const props = JSON.parse(fs.readFileSync("${tempPropsFile}", "utf-8"));
const emailHtml = await render(React.createElement(BorrowReceiptEmail, props));
fs.writeFileSync("${tempOutputFile}", emailHtml);
console.log("Email rendered successfully");
    `;
    
    const tempScriptFile = path.join(__dirname, '.temp-render-script.js');
    fs.writeFileSync(tempScriptFile, renderScript);
    
    // Execute the script using vite-node
    try {
      const output = execSync(`npx vite-node ${tempScriptFile}`, {
        cwd: __dirname,
        stdio: 'pipe',
        encoding: 'utf-8'
      });
      console.log("Render output:", output);
    } catch (execError) {
      console.error("Execution error:", execError.stdout?.toString(), execError.stderr?.toString());
      throw new Error(`Failed to render email: ${execError.message}`);
    }
    
    // Read the rendered HTML
    const emailHtml = fs.readFileSync(tempOutputFile, 'utf-8');
    
    // Clean up temporary files
    fs.unlinkSync(tempPropsFile);
    fs.unlinkSync(tempScriptFile);
    fs.unlinkSync(tempOutputFile);

    // Plain text version
    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    };

    const emailText = `
BORROW REQUEST RECEIPT - ToolShare System

REQUEST INFORMATION
-------------------
Request #: ${requestId}
Borrower: ${borrowerName}${borrowerId ? ` (${borrowerId})` : ''}
Request Date: ${formatDate(requestDate)}
${expectedReturnDate ? `Expected Return Date: ${formatDate(expectedReturnDate)}` : ''}

${purpose ? `Purpose: ${purpose}` : ''}

${authorizedStudents && authorizedStudents.length > 0 ? `
AUTHORIZED STUDENTS
-------------------
${authorizedStudents.map(s => `- ${s.name} (${s.student_id})`).join('\n')}
` : ''}

REQUESTED ITEMS (${requestedItems?.length || 0})
-------------------
${requestedItems && requestedItems.length > 0 
  ? requestedItems.map(item => `- ${item.name} (${item.category || 'N/A'}): ${item.quantity} ${item.unitOfMeasure || 'units'}`).join('\n')
  : 'No items requested'}

${assignedItems && assignedItems.length > 0 ? `
ASSIGNED ITEMS (${assignedItems.length})
-------------------
${assignedItems.map(item => `- ${item.name} - Property #: ${item.propertyNo || 'N/A'} (${item.condition || 'N/A'})`).join('\n')}
` : ''}

${adminNotes ? `Admin Notes: ${adminNotes}` : ''}

---
Thank you for using ToolShare!
For assistance, please contact the administrator.
`;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: recipient,
      subject: `Borrow Request Receipt - Request #${requestId}`,
      html: emailHtml,
      text: emailText,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error: Could not send email.");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send("Email sent successfully!");
      }
    });
  } catch (error) {
    console.error("Error rendering email:", error);
    res.status(500).send("Error: Could not render email template.");
  }
});

// 8. Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
