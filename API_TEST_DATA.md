# API Test Data & Examples

Use this data to test your API endpoints using Postman, Insomnia, or cURL.

## 1. Authentication

### Customer Login
**Endpoint:** `POST /api/auth/login`
**Request Body:**
```json
{
  "email": "customer@example.com",
  "password": "password123",
  "role": "customer"
}
```
**Response:**
Save the `token` from the response for subsequent requests.
```json
{
  "token": "eyJhbGciOiJIUz...",
  "userId": "65a...",
  "role": "customer",
  "name": "John Doe",
  "email": "customer@example.com"
}
```

### Business Owner Login
**Endpoint:** `POST /api/auth/login`
**Request Body:**
```json
{
  "email": "owner@example.com",
  "password": "password123",
  "role": "business_owner"
}
```

---

## 2. Businesses

### Create a Business (As Business Owner)
**Endpoint:** `POST /api/businesses`
**Header:** `Authorization: Bearer <BUSINESS_OWNER_TOKEN>`
**Request Body:**
```json
{
  "name": "Elite Spa & Salon",
  "category": "65b...", // Replace with valid Category ID
  "description": "Premium spa services in Mumbai",
  "address": "123 Palm Beach Rd, Mumbai",
  "phone": "9876543210",
  "email": "contact@elitespa.com",
  "website": "https://elitespa.com",
  "images": [
    "https://example.com/spa-image-1.jpg",
    "https://example.com/spa-image-2.jpg"
  ],
  "location": {
    "type": "Point",
    "coordinates": [72.8777, 19.0760] // [Longitude, Latitude]
  },
  "aadharNumber": "123456789012",
  "aadharFrontImage": "url_to_front",
  "aadharBackImage": "url_to_back"
}
```

### Get All Businesses (Search)
**Endpoint:** `GET /api/businesses`
**Header:** `Authorization: Bearer <TOKEN>`

---

## 3. Bookings

### Create a Booking (As Customer)
**Endpoint:** `POST /api/bookings`
**Header:** `Authorization: Bearer <CUSTOMER_TOKEN>`
**Request Body:**
```json
{
  "businessId": "65c...", // Replace with valid Business ID from step 2
  "date": "2026-01-10",
  "time": "14:30",
  "service": "Full Body Massage",
  "duration": "60 mins",
  "price": 1500,
  "notes": "Please use organic oils."
}
```

### Get Upcoming Bookings (Updated)
**Endpoint:** `GET /api/bookings?upcoming=true`
**Header:** `Authorization: Bearer <CUSTOMER_TOKEN>`
**Expected Response:**
Notice the fully populated `business` object containing contact details.
```json
[
  {
    "_id": "65d...",
    "customer": {
      "_id": "65a...",
      "name": "John Doe"
    },
    "business": {
      "_id": "65c...",
      "name": "Elite Spa & Salon",
      "address": "123 Palm Beach Rd, Mumbai",
      "phone": "9876543210",
      "email": "contact@elitespa.com",
      "images": [
        "https://example.com/spa-image-1.jpg"
      ],
      "category": "65b...",
      "location": { "type": "Point", "coordinates": [...] }
    },
    "date": "2026-01-10T14:30:00.000Z",
    "time": "14:30",
    "service": "Full Body Massage",
    "status": "pending"
  }
]
```

---

## 4. Quick Search (Recently Booked)

### Get Recent Activity
**Endpoint:** `GET /api/quick-search`
**Header:** `Authorization: Bearer <CUSTOMER_TOKEN>`
**Expected Response:**
Returns distinct businesses from your recent bookings.
```json
[
  {
    "_id": "65c...",
    "name": "Elite Spa & Salon",
    "category": "65b...",
    "image": "https://example.com/spa-image-1.jpg", 
    "lastBooked": "2026-01-10T... "
  }
]
```
