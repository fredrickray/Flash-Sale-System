# Flash Sale System

This project is a Flash Sale System that allows users to sign up, sign in, and participate in flash sales. The system includes features such as user authentication, product management, purchase transactions, and a leaderboard to track users' purchases.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#run-the-application)
- [API Endpoints](#api-endpoints)
- [Postman](#postman-documentation-url)

## Features

- User authentication (sign up, sign in)
- Product management
- Purchase transactions with MongoDB transactions
- Real-time stock updates using Socket.io
- Leaderboard to track users' purchases

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.x or later)
- npm (v6.x or later)
- MongoDB (v4.x or later)

## Installation

1. Clone the repository:

```sh
   git clone https://github.com/fredrickray/Flash-Sale-System
```
## Configuration
2. Create a .env file in the root directory of the project and add the environment variables from the env example file:

### Example: 
MONGODB_URI=mongodb://localhost:27017/flash-sale-system
JWT_ACCESS_TOKEN_SECRET=your_access_token_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret
JWT_ISSUER=your_issuer
JWT_AUDIENCE=your_audience
JWT_ALGORITHM=HS256


## Run the Application
3. Start the server in development mode:
```sh
   npm run dev
```
For production:
``` sh
   npm run serve
```


## API Endpoints
### Authentication
- Sign Up
``` POST /api/v1/auth/signup ```

Request Body:

```json
{
  "email": "user@example.com",
  "password": "password",
  "firstName": "John",
  "lastName": "Doe"
}
```

- Sign In
``` POST /api/v1/auth/signin ```

Request Body:
``` json
{
  "email": "user@example.com",
  "password": "password"
}
```


### Products
- Create Product
```POST /api/v1/flash-sale ```

Request Body:
``` json
{
  "name": "Product Name",
  "totalUnit": 100,
  "startTime": "2025-03-03T00:00:00Z",
  "isActive": true
}
```

- Get Products
``` GET /api/v1/flash-sale ```

### Purchases
- Create Purchase
``` POST /api/v1/purchase/:productId ```

Request Body:
``` json
{
  "quantity": 1
}
```

- Get Purchase by ID
``` GET /api/v1/purchase/:id ```

- Get Leaderboard
``` GET /api/v1/purchase/leaderboard ```



# POSTMAN DOCUMENTATION URL
[Postman Documentation](https://documenter.getpostman.com/view/21436608/2sAYdio9W8 )














