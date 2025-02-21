Setup Instructions
Prerequisites
Node.js (v16 or higher)
MongoDB (running locally or via MongoDB Atlas)
Postman (optional, for testing)
Installation
Clone the Repository:
bash
Wrap
Copy
git clone https://github.com/your-username/mHealth-api.git
cd mHealth-api
Install Dependencies:
bash
Wrap
Copy
npm install
Set Up Environment Variables:
Create a .env file in the root directory with the following:
env
Wrap
Copy
PORT=5000
MONGO_URI=mongodb://localhost:27017/mental-health
JWT_SECRET=your_jwt_secret_here
Replace your_jwt_secret_here with a strong secret key.
Update MONGO_URI if using a cloud database like MongoDB Atlas.
Start MongoDB:
Ensure MongoDB is running locally (mongod) or configured with a remote URI.
Run the Application:
Development mode (with auto-reload):
bash
Wrap
Copy
npm run dev
Production mode:
bash
Wrap
Copy
npm start
The server will run on http://localhost:5000.
API Endpoints
Authentication
All authentication endpoints are under /api/auth. JWT is used for securing protected routes.

Register User
Description: Registers a new user with a unique username, email, and password. An OTP is generated and logged to the terminal for email verification.
Method: POST
URL: /api/auth/register
Body:
json
Wrap
Copy
{
  "username": "string",
  "email": "string",
  "password": "string"
}
Response:
201 Created: { "message": "User registered. Please verify your email." }
400 Bad Request: { "message": "User already exists" }
500 Internal Server Error: { "message": "Server error" }
Note: Check the terminal for the OTP (e.g., OTP for test@example.com: 123456).
Verify Email
Description: Verifies the user's email by matching the provided OTP with the one generated during registration.
Method: POST
URL: /api/auth/verify
Body:
json
Wrap
Copy
{
  "email": "string",
  "otp": "string"
}
Response:
200 OK: { "message": "Email verified successfully" }
400 Bad Request: { "message": "Invalid OTP" }
500 Internal Server Error: { "message": "Server error" }
Login
Description: Authenticates a user with their email and password, returning a JWT token if the email is verified.
Method: POST
URL: /api/auth/login
Body:
json
Wrap
Copy
{
  "email": "string",
  "password": "string"
}
Response:
200 OK: { "token": "your_jwt_token" }
400 Bad Request: { "message": "Invalid credentials" } or { "message": "Please verify your email" }
500 Internal Server Error: { "message": "Server error" }
Posts
All post-related endpoints are under /api/posts. Protected routes require a valid JWT token in the Authorization header.

Create Post
Description: Allows an authenticated user to create a new post with mental health-related content. The post is linked to the user's ID but displays only their username.
Method: POST
URL: /api/posts
Headers: Authorization: Bearer your_jwt_token
Body:
json
Wrap
Copy
{
  "content": "string"
}
Response:
201 Created:
json
Wrap
Copy
{
  "_id": "post_id",
  "content": "string",
  "author": "user_id",
  "replies": []
}
401 Unauthorized: { "message": "No token, authorization denied" }
500 Internal Server Error: { "message": "Server error" }
Get All Posts
Description: Retrieves a list of all posts, including the username of each author. This endpoint is publicly accessible.
Method: GET
URL: /api/posts
Response:
200 OK:
json
Wrap
Copy
[
  {
    "_id": "post_id",
    "content": "string",
    "author": {
      "username": "string"
    },
    "replies": []
  }
]
500 Internal Server Error: { "message": "Server error" }
Get Single Post
Description: Fetches a specific post by its ID, including its content, author's username, and any replies with their usernames.
Method: GET
URL: /api/posts/:id
Response:
200 OK:
json
Wrap
Copy
{
  "_id": "post_id",
  "content": "string",
  "author": {
    "username": "string"
  },
  "replies": [
    {
      "content": "string",
      "author": {
        "username": "string"
      }
    }
  ]
}
404 Not Found: { "message": "Post not found" }
500 Internal Server Error: { "message": "Server error" }
Reply to Post
Description: Allows an authenticated user to add a reply to an existing post. The reply is associated with the user's ID but shows only their username.
Method: POST
URL: /api/posts/:id/reply
Headers: Authorization: Bearer your_jwt_token
Body:
json
Wrap
Copy
{
  "content": "string"
}
Response:
201 Created: Updated post object with the new reply.
401 Unauthorized: { "message": "No token, authorization denied" }
404 Not Found: { "message": "Post not found" }
500 Internal Server Error: { "message": "Server error" }
Error Handling
The API uses standard HTTP status codes for responses:

200 OK: Request successful.
201 Created: Resource created successfully.
400 Bad Request: Invalid input or missing parameters.
401 Unauthorized: Missing or invalid JWT token.
404 Not Found: Resource not found.
500 Internal Server Error: Unexpected server error.
Error responses typically include a JSON object with a message field, e.g., { "message": "Invalid credentials" }.

Future Improvements
Email Integration: Implement email sending for OTP verification using services like Nodemailer or SendGrid.
Pagination: Add pagination for fetching posts to handle large datasets.
User Roles: Introduce roles (e.g., user, psychologist) for differentiated access.
Password Reset: Add functionality for users to reset their passwords.
Rate Limiting: Implement rate limiting to prevent abuse of API endpoints.
Testing: Add unit and integration tests using tools like Jest or Mocha.
License
This project is licensed under the MIT License. See the LICENSE file for details.