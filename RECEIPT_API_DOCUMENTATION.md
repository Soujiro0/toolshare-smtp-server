# Borrow Request Receipt Email API

## 🎨 Built with React 18 + Tailwind-style CSS + Lucide Icon SVG Paths

This email template is built using modern React 18 components with Tailwind-style inline CSS and **Lucide icon SVG paths** rendered as inline SVG for maximum email client compatibility.

## 📦 Technologies

- **React 18** - Component-based email template
- **@react-email/render** - Email rendering framework
- **Tailwind CSS** (inline styles) - Modern, responsive styling
- **Lucide Icons** (SVG paths) - Inline SVG for email compatibility
- **Express** - API server
- **Nodemailer** - Email sending
- **Vite + vite-node** - JSX transformation and execution

## ✉️ Email Client Compatibility

Icons are rendered as **inline SVG** (not React components) to ensure compatibility with all email clients:
- ✅ Gmail (Desktop & Mobile)
- ✅ Outlook (All versions)
- ✅ Apple Mail
- ✅ Yahoo Mail  
- ✅ Thunderbird
- ✅ All major email clients

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Start Server
```bash
npm start
```

### Generate Preview
Preview the email template without sending:
```bash
npm run preview
```
This will generate an HTML file in `preview/borrow-receipt-preview.html` that you can open in your browser.

## 📡 Endpoint
```
POST /send-borrow-receipt
```

## Description
Sends a beautifully designed receipt email to the borrower with complete request details including request information, requested items, and assigned items (if applicable).

## Required Fields
- `recipient` (string) - Email address of the recipient
- `borrowerName` (string) - Name of the borrower
- `requestId` (string) - Unique request identifier

## Optional Fields
- `borrowerId` (string) - Borrower's user/student ID
- `requestDate` (string) - ISO 8601 date string of when request was made
- `expectedReturnDate` (string) - ISO 8601 date string of expected return date
- `purpose` (string) - Purpose of the borrow request
- `authorizedStudents` (array) - List of authorized students
  - `name` (string) - Student's full name
  - `student_id` (string) - Student's ID number
- `requestedItems` (array) - List of requested items
  - `name` (string) - Item name
  - `category` (string) - Item category
  - `quantity` (number) - Quantity requested
  - `unitOfMeasure` (string) - Unit of measure (e.g., "units", "pcs", "set")
- `assignedItems` (array) - List of assigned items (if approved and assigned)
  - `name` (string) - Item name
  - `propertyNo` (string) - Property/inventory number
  - `condition` (string) - Item condition (e.g., "EXCELLENT", "GOOD", "FAIR")
- `adminNotes` (string) - Admin notes or remarks

## Request Example

### Using cURL
```bash
curl -X POST http://localhost:3001/send-borrow-receipt \
  -H "Content-Type: application/json" \
  -d @sample-payload.json
```

### Using JavaScript/Fetch
```javascript
const response = await fetch('http://localhost:3001/send-borrow-receipt', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    recipient: "borrower@example.com",
    borrowerName: "Juan Dela Cruz",
    borrowerId: "2021-00123",
    requestId: "REQ-001234",
    requestDate: "2025-11-15T08:30:00.000Z",
    expectedReturnDate: "2025-11-22T17:00:00.000Z",
    purpose: "For Computer Programming Laboratory Exercise",
    authorizedStudents: [
      {
        name: "Maria Santos",
        student_id: "2021-00456"
      }
    ],
    requestedItems: [
      {
        name: "Laptop Dell Latitude 5420",
        category: "Electronics",
        quantity: 3,
        unitOfMeasure: "units"
      }
    ],
    assignedItems: [
      {
        name: "Laptop Dell Latitude 5420",
        propertyNo: "PROP-2024-001",
        condition: "EXCELLENT"
      }
    ],
    adminNotes: "Please handle equipment with care."
  })
});

const result = await response.text();
console.log(result);
```

### Using Axios
```javascript
const axios = require('axios');

try {
  const response = await axios.post('http://localhost:3001/send-borrow-receipt', {
    recipient: "borrower@example.com",
    borrowerName: "Juan Dela Cruz",
    borrowerId: "2021-00123",
    requestId: "REQ-001234",
    requestDate: "2025-11-15T08:30:00.000Z",
    expectedReturnDate: "2025-11-22T17:00:00.000Z",
    purpose: "For Computer Programming Laboratory Exercise",
    authorizedStudents: [
      {
        name: "Maria Santos",
        student_id: "2021-00456"
      }
    ],
    requestedItems: [
      {
        name: "Laptop Dell Latitude 5420",
        category: "Electronics",
        quantity: 3,
        unitOfMeasure: "units"
      }
    ],
    assignedItems: [
      {
        name: "Laptop Dell Latitude 5420",
        propertyNo: "PROP-2024-001",
        condition: "EXCELLENT"
      }
    ],
    adminNotes: "Please handle equipment with care."
  });
  
  console.log(response.data);
} catch (error) {
  console.error('Error:', error.response?.data || error.message);
}
```

## Response

### Success (200)
```
Email sent successfully!
```

### Error (400)
```
Recipient, borrower name, and request ID are required.
```

### Error (500)
```
Error: Could not send email.
```
or
```
Error: Could not render email template.
```

## 🎨 Email Template Features

### Header
- Beautiful blue gradient header with "Borrow Request Receipt" title
- ToolShare System branding
- Responsive design

### Request Information Section
- Request ID and status
- Borrower name and ID with User icon
- Request date with Calendar icon
- Expected return date with Calendar icon
- Purpose with Target icon
- Authorized students list with Shield icon
- Admin notes with MessageSquare icon

### Requested Items Section
- Item name and category with Package icon
- Quantity with unit of measure
- Clean card-based layout
- Orange-themed for requested items

### Assigned Items Section (if applicable)
- Item name with CheckCircle icon
- Property number
- Item condition badges
- Green-themed to indicate assigned/approved status

### Footer
- ToolShare branding
- Contact information prompt
- Professional closing

### Icons Used (Lucide)
- 📄 FileText - Request information
- 📦 Package - Items
- ✅ CheckCircle - Assigned items
- 👤 User - Borrower info
- 📅 Calendar - Dates
- 🎯 Target - Purpose
- 🛡️ Shield - Authorized students
- 💬 MessageSquare - Admin notes

## 📁 Project Structure

```
toolshare-smtp-server/
├── emails/
│   ├── components/
│   │   ├── Icons.jsx          # Lucide icon components
│   │   └── Card.jsx           # Reusable card components
│   └── BorrowReceiptEmail.jsx # Main email template
├── preview/
│   └── borrow-receipt-preview.html  # Generated preview
├── assets/
├── server.js                  # Express server
├── generate-preview.js        # Preview generator
├── sample-payload.json        # Test data
├── package.json
└── README.md
```

## 🔧 Development

### Testing the Email Template

1. **Generate Preview**:
   ```bash
   npm run preview
   ```
   Opens `preview/borrow-receipt-preview.html` in your browser

2. **Test with Sample Data**:
   ```bash
   curl -X POST http://localhost:3001/send-borrow-receipt \
     -H "Content-Type: application/json" \
     -d @sample-payload.json
   ```

### Customizing the Template

The email template is built with React components for easy customization:

- **Colors**: Edit inline styles in `emails/BorrowReceiptEmail.jsx`
- **Icons**: Modify SVG paths in `emails/components/Icons.jsx`
- **Layout**: Update component structure in `emails/BorrowReceiptEmail.jsx`
- **Card styles**: Customize in `emails/components/Card.jsx`

## 📝 Notes

1. All dates should be in ISO 8601 format (e.g., "2025-11-15T08:30:00.000Z")
2. The email includes both HTML and plain text versions for better compatibility
3. Date formatting in the email is automatically handled (e.g., "November 15, 2025")
4. All optional fields can be omitted if not applicable
5. Arrays can be empty or omitted if no data is available
6. Icons are SVG-based for consistent rendering across email clients
7. Inline CSS ensures compatibility with email clients

## 🌐 Browser Support

The generated HTML email is tested and works with:
- Gmail
- Outlook
- Apple Mail
- Yahoo Mail
- Mobile email clients

## 🤝 Integration with ToolShare

This SMTP server is designed to integrate seamlessly with the ToolShare system. Simply call the `/send-borrow-receipt` endpoint from your ToolShare backend when:
- A borrow request is approved
- Items are assigned to a request
- You need to send a receipt to the borrower

## Testing

A complete sample payload is available in `sample-payload.json` for testing purposes.

To test:
```bash
# Make sure the server is running
npm start

# In another terminal, send the test request
curl -X POST http://localhost:3001/send-borrow-receipt \
  -H "Content-Type: application/json" \
  -d @sample-payload.json
```

