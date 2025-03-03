# Flash Sale System - Backend API

## Overview
The Flash Sale System is a backend API built with Node.js, Express, and MongoDB to manage flash sale events efficiently. It supports:

- **Real-time inventory updates**
- **Transactional integrity to prevent over-purchasing**
- **User authentication and security measures**
- **Leaderboard to track successful purchases**

## Features
- Start a flash sale with 200 units of stock
- Restrict purchases based on stock availability
- Prevent multiple purchases before the sale starts
- Ensure data consistency and prevent race conditions
- Provide a sorted leaderboard of successful purchases

## Technologies Used
- **Node.js & Express** - API framework
- **MongoDB & Mongoose** - Database & ORM
- **Dotenv** - Environment variable management
- **JWT Authentication** - Secure user access
- **WebSockets (Upcoming)** - Real-time stock updates

---
## Installation Guide

### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/flash-sale-backend.git
```

### 2. Navigate to the Project Directory
```sh
cd flash-sale-backend
```

### 3. Install Dependencies
```sh
npm install
```

### 4. Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 5. Run the Application
Start the server in development mode:
```sh
npm run dev
```

For production:
```sh
npm start
```

---
## API Endpoints

### 1. Start a Flash Sale
**POST** `/start-sale`
#### Request Body:
```json
{
  "productId": "123456",
  "startTime": "2025-03-03T12:00:00Z"
}
```
#### Response:
```json
{
  "_id": "sale_id",
  "productId": "123456",
  "stock": 200,
  "startTime": "2025-03-03T12:00:00Z",
  "isActive": true
}
```

### 2. Purchase a Product
**POST** `/purchase`
#### Request Body:
```json
{
  "userId": "user123",
  "productId": "123456",
  "quantity": 1
}
```
#### Response:
```json
{
  "_id": "purchase_id",
  "userId": "user123",
  "productId": "123456",
  "quantity": 1,
  "createdAt": "2025-03-03T12:05:00Z"
}
```

### 3. Get Leaderboard
**GET** `/leaderboard`
#### Response:
```json
[
  {
    "userId": "user123",
    "productId": "123456",
    "quantity": 1,
    "createdAt": "2025-03-03T12:05:00Z"
  }
]
```

---
## Security & Best Practices
- JWT Authentication for API security
- Transactions to ensure data integrity
- Validation middleware for request sanitization
- Rate limiting to prevent abuse

---
## Future Enhancements
- **WebSocket integration** for real-time inventory updates
- **Admin dashboard** for flash sale management
- **Optimized caching** for leaderboard queries

---
## Contributing
1. Fork the repository
2. Create a new branch (`feature-branch`)
3. Commit your changes
4. Push to your fork and submit a Pull Request

---
## License
This project is licensed under the MIT License.

