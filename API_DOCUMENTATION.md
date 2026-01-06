# Backend API Documentation for UI Integration

## Base URL
All endpoints are relative to your backend base URL (e.g., `http://localhost:3000`).

## Authentication
All endpoints require a Bearer Token in the `Authorization` header.
`Authorization: Bearer <your_jwt_token>`

---

## 1. User Profile & Settings

### Get User Profile
- **Endpoint**: `GET /api/users/profile`
- **Response**: User object including `settings`.

### Update Settings
- **Endpoint**: `PUT /api/users/settings`
- **Body**:
```json
{
  "settings": {
    "notifications": {
      "email": true,
      "push": false,
      "sms": true
    },
    "privacy": {
      "profileVisibility": "private" 
    },
    "language": "es"
  }
}
```

---

## 2. Addresses

### Get All Addresses
- **Endpoint**: `GET /api/users/addresses`

### Add Address
- **Endpoint**: `POST /api/users/addresses`
- **Body**:
```json
{
  "label": "Home",
  "street": "123 Main St",
  "city": "Mumbai",
  "state": "MH",
  "zip": "400001",
  "country": "India",
  "isDefault": true
}
```

### Update Address
- **Endpoint**: `PUT /api/users/addresses/:id`
- **Body**: Any fields from above.

### Delete Address
- **Endpoint**: `DELETE /api/users/addresses/:id`

---

## 3. Payment Methods

### Get Payment Methods
- **Endpoint**: `GET /api/users/payment-methods`

### Add Payment Method
- **Endpoint**: `POST /api/users/payment-methods`
- **Body**:
```json
{
  "type": "card", // or "upi"
  "provider": "Visa",
  "last4": "4242",
  "expiry": "12/25",
  "isDefault": false
}
```
*Note: For UPI, send `type: "upi"` and `upiId`.*

### Remove Payment Method
- **Endpoint**: `DELETE /api/users/payment-methods/:id`

---

## 4. Notifications

### Get Notifications
- **Endpoint**: `GET /api/notifications`

---

## 5. Support

### Get My Tickets
- **Endpoint**: `GET /api/support/tickets`

### Create Ticket
- **Endpoint**: `POST /api/support/tickets`
- **Body**:
```json
{
  "subject": "Payment Issue",
  "message": "I was charged twice.",
  "priority": "High"
}
```
