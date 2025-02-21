# mHealth API

A Node.js and MongoDB-based API for mental health-related content sharing, user authentication, and post management.

## Prerequisites

Ensure you have the following installed before proceeding:

- **Node.js** (v16 or higher)
- **MongoDB** (running locally or via MongoDB Atlas)
- **Postman** (optional, for API testing)

## Installation

### Clone the Repository
```bash
git clone https://github.com/your-username/mHealth-api.git
cd mHealth-api
```

### Install Dependencies
```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory and add the following:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mental-health
JWT_SECRET=your_jwt_secret_here
```
Replace `your_jwt_secret_here` with a strong secret key.

If using MongoDB Atlas, update `MONGO_URI` accordingly.

### Start MongoDB
Ensure MongoDB is running locally using:
```bash
mongod
```
Or configure a remote MongoDB URI.

### Run the Application
#### Development Mode (Auto-reload):
```bash
npm run dev
```
#### Production Mode:
```bash
npm start
```
The server will run on [http://localhost:5000](http://localhost:5000).

---

## API Endpoints

### Authentication
All authentication endpoints are under `/api/auth`. JWT is used for securing protected routes.

#### Register User
- **Description:** Registers a new user and generates an OTP for email verification.
- **Method:** `POST`
- **URL:** `/api/auth/register`
- **Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Responses:**
  - `201 Created`: `{ "message": "User registered. Please verify your email." }`
  - `400 Bad Request`: `{ "message": "User already exists" }`
  - `500 Internal Server Error`: `{ "message": "Server error" }`

**Note:** The OTP is logged in the terminal (e.g., `OTP for test@example.com: 123456`).

#### Verify Email
- **Description:** Verifies a user's email using the OTP.
- **Method:** `POST`
- **URL:** `/api/auth/verify`
- **Body:**
  ```json
  {
    "email": "string",
    "otp": "string"
  }
  ```
- **Responses:**
  - `200 OK`: `{ "message": "Email verified successfully" }`
  - `400 Bad Request`: `{ "message": "Invalid OTP" }`
  - `500 Internal Server Error`: `{ "message": "Server error" }`

#### Login
- **Description:** Authenticates a user and returns a JWT token.
- **Method:** `POST`
- **URL:** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Responses:**
  - `200 OK`: `{ "token": "your_jwt_token" }`
  - `400 Bad Request`: `{ "message": "Invalid credentials" }` or `{ "message": "Please verify your email" }`
  - `500 Internal Server Error`: `{ "message": "Server error" }`

---

### Posts
All post-related endpoints are under `/api/posts`. Protected routes require a valid JWT token in the `Authorization` header.

#### Create Post
- **Description:** Allows an authenticated user to create a post.
- **Method:** `POST`
- **URL:** `/api/posts`
- **Headers:**
  ```
  Authorization: Bearer your_jwt_token
  ```
- **Body:**
  ```json
  {
    "content": "string"
  }
  ```
- **Responses:**
  - `201 Created`:
    ```json
    {
      "_id": "post_id",
      "content": "string",
      "author": "user_id",
      "replies": []
    }
    ```
  - `401 Unauthorized`: `{ "message": "No token, authorization denied" }`
  - `500 Internal Server Error`: `{ "message": "Server error" }`

#### Get All Posts
- **Description:** Retrieves all posts with author usernames.
- **Method:** `GET`
- **URL:** `/api/posts`
- **Responses:**
  - `200 OK`:
    ```json
    [
      {
        "_id": "post_id",
        "content": "string",
        "author": { "username": "string" },
        "replies": []
      }
    ]
    ```
  - `500 Internal Server Error`: `{ "message": "Server error" }`

#### Get Single Post
- **Description:** Retrieves a specific post by its ID.
- **Method:** `GET`
- **URL:** `/api/posts/:id`
- **Responses:**
  - `200 OK`:
    ```json
    {
      "_id": "post_id",
      "content": "string",
      "author": { "username": "string" },
      "replies": [
        {
          "content": "string",
          "author": { "username": "string" }
        }
      ]
    }
    ```
  - `404 Not Found`: `{ "message": "Post not found" }`
  - `500 Internal Server Error`: `{ "message": "Server error" }`

#### Reply to Post
- **Description:** Allows a user to reply to a post.
- **Method:** `POST`
- **URL:** `/api/posts/:id/reply`
- **Headers:**
  ```
  Authorization: Bearer your_jwt_token
  ```
- **Body:**
  ```json
  {
    "content": "string"
  }
  ```
- **Responses:**
  - `201 Created`: Updated post object with new reply.
  - `401 Unauthorized`: `{ "message": "No token, authorization denied" }`
  - `404 Not Found`: `{ "message": "Post not found" }`
  - `500 Internal Server Error`: `{ "message": "Server error" }`

---

## Error Handling
The API follows standard HTTP status codes:

- **200 OK:** Successful request.
- **201 Created:** Resource successfully created.
- **400 Bad Request:** Invalid input.
- **401 Unauthorized:** Missing/invalid JWT.
- **404 Not Found:** Resource not found.
- **500 Internal Server Error:** Unexpected server error.

---

## Future Improvements
- **Email Integration:** Implement Nodemailer/SendGrid for OTP verification.
- **Pagination:** Add pagination for posts.
- **User Roles:** Differentiate access (e.g., user, psychologist).
- **Password Reset:** Implement password reset functionality.
- **Rate Limiting:** Prevent API abuse.
- **Testing:** Add unit/integration tests using Jest/Mocha.

---

## License
This project is licensed under the **MIT License**. See the `LICENSE` file for details.
