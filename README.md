# ToolShare SMTP Server - React Email Templates

✅ **Fully Functional** - Email templates built with React 18, Tailwind CSS, and Lucide Icons

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file:
```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
PORT=3001
```

### 3. Start Server
```bash
npm start
```
Server runs on `http://localhost:3001`

## 📧 Send Test Email

```bash
curl -X POST http://localhost:3001/send-borrow-receipt \
  -H "Content-Type: application/json" \
  -d '{
  "recipient": "borrower@example.com",
  "borrowerName": "Juan Dela Cruz",
  "borrowerId": "2021-00123",
  "requestId": "REQ-001234",
  "requestDate": "2025-11-15T08:30:00.000Z",
  "expectedReturnDate": "2025-11-22T17:00:00.000Z",
  "purpose": "For Computer Programming Laboratory Exercise",
  "authorizedStudents": [
    {
      "name": "Maria Santos",
      "student_id": "2021-00456"
    }
  ],
  "requestedItems": [
    {
      "name": "Laptop Dell Latitude 5420",
      "category": "Electronics",
      "quantity": 3,
      "unitOfMeasure": "units"
    }
  ],
  "assignedItems": [
    {
      "name": "Laptop Dell Latitude 5420",
      "propertyNo": "PROP-2024-001",
      "condition": "EXCELLENT"
    }
  ],
  "adminNotes": "Please handle equipment with care."
}'
```

## 🎨 Preview Email Template

Generate HTML preview without sending:
```bash
npm run preview
```
Opens `preview/borrow-receipt-preview.html` in your file system.

## 🏗️ Architecture

### Technology Stack
| Technology | Purpose |
|-----------|---------|
| **React 18** | Component-based email templates |
| **@react-email/render** | Server-side rendering |
| **@react-email/components** | Email-safe React components |
| **Vite + vite-node** | JSX transformation |
| **Express** | API server |
| **Nodemailer** | SMTP email delivery |
| **Tailwind-style CSS** | Inline styling |
| **Lucide Icons** | SVG icon components |

### How It Works

1. **Request arrives** at `/send-borrow-receipt` endpoint
2. **Props are written** to temporary JSON file
3. **vite-node executes** a render script with the React component
4. **HTML is generated** and saved to temporary file
5. **Email is sent** via Nodemailer with the HTML
6. **Temporary files cleaned up**

## 📁 Project Structure

```
toolshare-smtp-server/
├── emails/
│   ├── components/
│   │   ├── Icons.jsx          # Lucide icons (FileText, Package, etc.)
│   │   └── Card.jsx           # Reusable card components
│   └── BorrowReceiptEmail.jsx # Main email template
├── preview/
│   └── borrow-receipt-preview.html
├── server.js                   # Express SMTP server
├── generate-preview.js         # Preview generator
├── render-email.js             # Email render helper
├── vite.config.js              # Vite configuration
├── sample-payload.json         # Test data
├── .env.example                # Environment template
└── package.json
```

## 📧 API Documentation

### POST `/send-borrow-receipt`

**Required Fields:**
- `recipient` - Email address
- `borrowerName` - Borrower's name
- `requestId` - Request identifier

**Optional Fields:**
- `borrowerId` - Student/User ID
- `requestDate` - ISO 8601 date
- `expectedReturnDate` - ISO 8601 date
- `purpose` - Request purpose
- `authorizedStudents` - Array of `{name, student_id}`
- `requestedItems` - Array of `{name, category, quantity, unitOfMeasure}`
- `assignedItems` - Array of `{name, propertyNo, condition}`
- `adminNotes` - Admin remarks

**Response:**
- `200` - "Email sent successfully!"
- `400` - "Recipient, borrower name, and request ID are required."
- `500` - "Error: Could not send email." or "Error: Could not render email template."

## 🎨 Email Template Features

### Header
- 🎨 Blue gradient header
- ToolShare System branding

### Request Information Card
- 📄 FileText icon - Header
- Request ID, borrower details
- 📅 Calendar icons - Dates
- 🎯 Target icon - Purpose
- 🛡️ Shield icon - Authorized students
- 💬 MessageSquare icon - Admin notes

### Requested Items Card
- 📦 Package icon - Header
- Item details with quantities
- Clean, organized layout

### Assigned Items Card
- ✅ CheckCircle icon - Success indicator
- Green-themed design
- Property numbers and condition badges

### Footer
- Professional closing
- ToolShare Team branding

## 🔧 Customization

### Change Colors
Edit `emails/BorrowReceiptEmail.jsx`:
```jsx
style={{ color: '#3b82f6' }} // Your brand color
```

### Add Icons
Edit `emails/components/Icons.jsx`:
```jsx
export const YourIcon = ({ size = 20, color = '#000' }) => (
  <svg width={size} height={size}>
    {/* Your SVG path */}
  </svg>
);
```

### Modify Layout
Edit component structure in `emails/BorrowReceiptEmail.jsx`

## ✅ Testing Checklist

- [x] Server starts successfully
- [x] Email preview generates
- [x] React components render
- [x] Icons display correctly
- [x] Email sends via Gmail SMTP
- [x] All sections render (Request Info, Items, Assigned Items)
- [x] Responsive design works
- [x] Plain text fallback included

## 🌐 Email Client Compatibility

Tested with:
- ✅ Gmail
- ✅ Outlook
- ✅ Apple Mail
- ✅ Yahoo Mail
- ✅ Mobile clients

## 🔗 Integration with ToolShare

Call the endpoint when:
- Request is approved
- Items are assigned
- Receipt needs to be sent

### Example Integration (Node.js/Express):
```javascript
const axios = require('axios');

async function sendBorrowReceipt(requestData) {
  try {
    const response = await axios.post('http://localhost:3001/send-borrow-receipt', {
      recipient: requestData.user.email,
      borrowerName: requestData.user.name,
      borrowerId: requestData.user.user_id,
      requestId: requestData.request_id,
      requestDate: requestData.request_date,
      expectedReturnDate: requestData.expected_return_date,
      purpose: requestData.purpose,
      authorizedStudents: requestData.authorized_students,
      requestedItems: requestData.requested_items.map(item => ({
        name: item.item.name,
        category: item.item.category.category_name,
        quantity: item.quantity,
        unitOfMeasure: item.item.unit_of_measure
      })),
      assignedItems: requestData.assigned_items.map(item => ({
        name: item.unit.item.name,
        propertyNo: item.unit.property_no,
        condition: item.item_condition_out
      })),
      adminNotes: requestData.remarks
    });
    
    console.log('Receipt sent:', response.data);
  } catch (error) {
    console.error('Failed to send receipt:', error.message);
  }
}
```

## 🐛 Troubleshooting

### Email not sending
- Check `.env` file configuration
- Verify Gmail App Password
- Check Gmail less secure apps setting

### Template not rendering
- Ensure `vite-node` is installed
- Check temporary files are writable
- Verify React components have no syntax errors

### Preview not generating
- Run `npm run preview`
- Check `preview/` directory permissions

## 📝 Scripts

- `npm start` - Start SMTP server
- `npm run preview` - Generate email preview
- `npm run build` - Build with Vite (optional)

---

**Built with ❤️ for ToolShare System**

React 18 + Tailwind CSS + Lucide Icons + Vite
