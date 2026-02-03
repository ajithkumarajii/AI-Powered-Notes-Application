# AI Powered Notes Application - Backend

A secure, production-ready backend API with JWT authentication and user-specific note management.

## Features

✅ **JWT Authentication** - Secure token-based authentication
✅ **User Registration & Login** - Complete auth flow with bcrypt password hashing
✅ **User-Specific Notes** - Notes are private to each user
✅ **CRUD Operations** - Full Create, Read, Update, Delete functionality
✅ **Ownership Validation** - Users can only access their own notes
✅ **Error Handling** - Comprehensive error handling with meaningful messages
✅ **MongoDB Integration** - Persistent data storage with Mongoose ODM
✅ **CORS Enabled** - Ready for frontend integration

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   └── noteController.js     # Notes CRUD logic
├── models/
│   ├── User.js              # User schema
│   └── Note.js              # Note schema
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   └── noteRoutes.js        # Notes endpoints
├── middleware/
│   └── authMiddleware.js    # JWT verification
├── utils/
│   └── errorHandler.js      # Centralized error handling
├── .env                      # Environment variables
├── server.js                # Main server file
└── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm

### Installation

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ai-notes-app
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:5000`

## API Endpoints

### Health Check

```
GET /health
```

Response:
```json
{
  "message": "Server is running"
}
```

### Authentication

#### Sign Up
```
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

Response (201):
```json
{
  "message": "User registered successfully",
  "userId": "60d5ec49c1234567890abc01"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

Response (200):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "60d5ec49c1234567890abc01"
}
```

### Notes (Protected - Requires JWT Token)

All note endpoints require the Authorization header with JWT token:
```
Authorization: Bearer <your_jwt_token>
```

#### Get All Notes
```
GET /api/notes
```

Response (200):
```json
{
  "message": "Notes retrieved successfully",
  "notes": [
    {
      "_id": "60d5ec49c1234567890abc02",
      "userId": "60d5ec49c1234567890abc01",
      "title": "My First Note",
      "content": "This is the content of my first note",
      "summary": "First note summary",
      "createdAt": "2024-02-03T12:00:00Z",
      "updatedAt": "2024-02-03T12:00:00Z"
    }
  ]
}
```

#### Create Note
```
POST /api/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Note",
  "content": "This is the content of my first note",
  "summary": "First note summary"  // Optional
}
```

Response (201):
```json
{
  "message": "Note created successfully",
  "note": {
    "_id": "60d5ec49c1234567890abc02",
    "userId": "60d5ec49c1234567890abc01",
    "title": "My First Note",
    "content": "This is the content of my first note",
    "summary": "First note summary",
    "createdAt": "2024-02-03T12:00:00Z",
    "updatedAt": "2024-02-03T12:00:00Z"
  }
}
```

#### Get Single Note
```
GET /api/notes/:id
Authorization: Bearer <token>
```

Response (200):
```json
{
  "message": "Note retrieved successfully",
  "note": { /* note object */ }
}
```

#### Update Note
```
PUT /api/notes/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",  // Optional
  "content": "Updated content",  // Optional
  "summary": "Updated summary"  // Optional
}
```

Response (200):
```json
{
  "message": "Note updated successfully",
  "note": { /* updated note object */ }
}
```

#### Delete Note
```
DELETE /api/notes/:id
Authorization: Bearer <token>
```

Response (200):
```json
{
  "message": "Note deleted successfully"
}
```

## Error Responses

### 400 - Bad Request
```json
{
  "error": "Title and content are required"
}
```

### 401 - Unauthorized
```json
{
  "error": "Invalid token"
}
```

### 403 - Forbidden
```json
{
  "error": "You can only update your own notes"
}
```

### 404 - Not Found
```json
{
  "error": "Note not found"
}
```

### 409 - Conflict
```json
{
  "error": "Email already registered"
}
```

### 500 - Server Error
```json
{
  "error": "Internal server error"
}
```

## Security Features

- ✅ **Password Hashing** - bcrypt with salt rounds
- ✅ **JWT Tokens** - Secure token-based authentication
- ✅ **Ownership Validation** - Users can only access their own notes
- ✅ **Input Validation** - All inputs are validated before processing
- ✅ **Error Handling** - No sensitive information leaked in error messages
- ✅ **CORS Protection** - Configurable CORS headers

## Testing with Postman

1. **Sign Up**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/signup`
   - Body: `{"name": "Test User", "email": "test@example.com", "password": "test123"}`

2. **Login**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/login`
   - Body: `{"email": "test@example.com", "password": "test123"}`
   - Save the returned `token`

3. **Create Note** (with token from login)
   - Method: POST
   - URL: `http://localhost:5000/api/notes`
   - Headers: `Authorization: Bearer <token>`
   - Body: `{"title": "Test Note", "content": "This is a test"}`

4. **Get All Notes**
   - Method: GET
   - URL: `http://localhost:5000/api/notes`
   - Headers: `Authorization: Bearer <token>`

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017/ai-notes-app |
| JWT_SECRET | Secret key for JWT signing | your_secret_key |
| NODE_ENV | Environment mode | development/production |

## Scripts

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - CORS middleware
- **dotenv** - Environment variables
- **nodemon** - Development auto-reload (dev only)

## Future Enhancements

- [ ] Email verification for signup
- [ ] Password reset functionality
- [ ] Rate limiting for API requests
- [ ] Note categories/tags
- [ ] Sharing notes with other users
- [ ] Note search functionality
- [ ] Audit logging
- [ ] API rate limiting and throttling

## Interview Notes

This backend demonstrates:
- ✅ Clean, scalable code architecture
- ✅ Proper separation of concerns (models, controllers, routes)
- ✅ Authentication and authorization
- ✅ Error handling and validation
- ✅ RESTful API design
- ✅ Database relationships and indexing
- ✅ Security best practices

---

Built with ❤️ for the AI Powered Notes Application
