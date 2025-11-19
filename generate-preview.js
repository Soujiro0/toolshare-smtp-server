import { render } from "@react-email/render";
import React from "react";
import BorrowReceiptEmail from "./emails/BorrowReceiptEmail.jsx";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sample data with images
const sampleData = {
  borrowerName: "Juan Dela Cruz",
  borrowerId: "2021-00123",
  requestId: "REQ-001234",
  requestDate: "2025-11-19T08:30:00.000Z",
  expectedReturnDate: "2025-11-22T17:00:00.000Z",
  purpose: "For Computer Programming Laboratory Exercise 3 - Database Integration Project. Students will use these tools to demonstrate CRUD operations and database connectivity.",
  authorizedStudents: [
    {
      name: "Maria Santos",
      student_id: "2021-00456"
    },
    {
      name: "Pedro Reyes",
      student_id: "2021-00789"
    }
  ],
  requestedItems: [
    {
      name: "Laptop Dell Latitude 5420",
      category: "Electronics",
      quantity: 3,
      unitOfMeasure: "units",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%23dbeafe' width='100' height='100'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='14' fill='%233b82f6' text-anchor='middle' dominant-baseline='middle'%3ELaptop%3C/text%3E%3C/svg%3E"
    },
    {
      name: "HDMI Cable",
      category: "Accessories",
      quantity: 2,
      unitOfMeasure: "pcs",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%23fef3c7' width='100' height='100'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='12' fill='%23f59e0b' text-anchor='middle' dominant-baseline='middle'%3EHDMI%3C/text%3E%3C/svg%3E"
    },
    {
      name: "Wireless Mouse",
      category: "Peripherals",
      quantity: 3,
      unitOfMeasure: "pcs",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%23e0e7ff' width='100' height='100'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='14' fill='%236366f1' text-anchor='middle' dominant-baseline='middle'%3EMouse%3C/text%3E%3C/svg%3E"
    }
  ],
  assignedItems: [
    {
      name: "Laptop Dell Latitude 5420",
      propertyNo: "PROP-2024-001",
      condition: "EXCELLENT"
    },
    {
      name: "Laptop Dell Latitude 5420",
      propertyNo: "PROP-2024-002",
      condition: "GOOD"
    },
    {
      name: "Laptop Dell Latitude 5420",
      propertyNo: "PROP-2024-003",
      condition: "GOOD"
    },
    {
      name: "HDMI Cable",
      propertyNo: "PROP-2024-104",
      condition: "EXCELLENT"
    },
    {
      name: "HDMI Cable",
      propertyNo: "PROP-2024-105",
      condition: "GOOD"
    },
    {
      name: "Wireless Mouse",
      propertyNo: "PROP-2024-201",
      condition: "EXCELLENT"
    },
    {
      name: "Wireless Mouse",
      propertyNo: "PROP-2024-202",
      condition: "GOOD"
    },
    {
      name: "Wireless Mouse",
      propertyNo: "PROP-2024-203",
      condition: "FAIR"
    }
  ],
  adminNotes: "Please handle all equipment with care. Laptops have been freshly formatted and configured. Return all items in the same condition. Contact the IT department if you encounter any technical issues."
};

async function generatePreview() {
  try {
    console.log("Generating email preview with images...");
    
    const emailHtml = await render(
      React.createElement(BorrowReceiptEmail, sampleData)
    );

    // Create preview directory if it doesn't exist
    const previewDir = path.join(__dirname, "preview");
    if (!fs.existsSync(previewDir)) {
      fs.mkdirSync(previewDir);
    }

    // Write HTML to file
    const outputPath = path.join(previewDir, "borrow-receipt-preview.html");
    fs.writeFileSync(outputPath, emailHtml);

    console.log(`✅ Email preview generated successfully!`);
    console.log(`📄 Preview file: ${outputPath}`);
    console.log(`🖼️  Includes item images`);
    console.log(`🌐 Open the file in your browser to view the email template`);
  } catch (error) {
    console.error("❌ Error generating preview:", error);
  }
}

generatePreview();
