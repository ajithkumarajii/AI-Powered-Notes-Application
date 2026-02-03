# API Testing Guide

## Quick Start Testing Flow

### 1. Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

Response:
```json
{
  "message": "User registered successfully",
  "userId": "507f1f77bcf86cd799439011"
}
```

---

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "507f1f77bcf86cd799439011"
}
```

**Save the token for the next requests!**

---

### 3. Create a Note
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "title": "My First Note",
    "content": "This is the content of my first note",
    "summary": "First note"
  }'
```

Response:
```json
{
  "message": "Note created successfully",
  "note": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "title": "My First Note",
    "content": "This is the content of my first note",
    "summary": "First note",
    "createdAt": "2024-02-03T12:00:00.000Z",
    "updatedAt": "2024-02-03T12:00:00.000Z"
  }
}
```

---

### 4. Get All Notes
```bash
curl -X GET http://localhost:5000/api/notes \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

Response:
```json
{
  "message": "Notes retrieved successfully",
  "notes": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "userId": "507f1f77bcf86cd799439011",
      "title": "My First Note",
      "content": "This is the content of my first note",
      "summary": "First note",
      "createdAt": "2024-02-03T12:00:00.000Z",
      "updatedAt": "2024-02-03T12:00:00.000Z"
    }
  ]
}
```

---

### 5. Get Single Note
```bash
curl -X GET http://localhost:5000/api/notes/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

Response:
```json
{
  "message": "Note retrieved successfully",
  "note": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "title": "My First Note",
    "content": "This is the content of my first note",
    "summary": "First note",
    "createdAt": "2024-02-03T12:00:00.000Z",
    "updatedAt": "2024-02-03T12:00:00.000Z"
  }
}
```

---

### 6. Update Note
```bash
curl -X PUT http://localhost:5000/api/notes/507f1f77bcf86cd799439012 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "title": "Updated Note Title",
    "content": "Updated content here"
  }'
```

Response:
```json
{
  "message": "Note updated successfully",
  "note": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Updated Note Title",
    "content": "Updated content here",
    "summary": "First note",
    "createdAt": "2024-02-03T12:00:00.000Z",
    "updatedAt": "2024-02-03T12:00:05.000Z"
  }
}
```

---

### 7. Delete Note
```bash
curl -X DELETE http://localhost:5000/api/notes/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

Response:
```json
{
  "message": "Note deleted successfully"
}
```

---

## Error Scenarios

### Missing Token
```bash
curl -X GET http://localhost:5000/api/notes
```

Response (401):
```json
{
  "error": "Authorization token required"
}
```

---

### Invalid Token
```bash
curl -X GET http://localhost:5000/api/notes \
  -H "Authorization: Bearer invalid_token"
```

Response (401):
```json
{
  "error": "Invalid token"
}
```

---

### Duplicate Email (Signup)
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

Response (409):
```json
{
  "error": "Email already registered"
}
```

---

### Invalid Credentials (Login)
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "WrongPassword"
  }'
```

Response (401):
```json
{
  "error": "Invalid email or password"
}
```

---

### Missing Required Fields
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{ "title": "Test" }'
```

Response (400):
```json
{
  "error": "Title and content are required"
}
```

---

### Accessing Another User's Note
**User A's Token → Trying to access User B's Note**

```bash
curl -X GET http://localhost:5000/api/notes/507f1f77bcf86cd799439999 \
  -H "Authorization: Bearer user_a_token"
```

Response (403):
```json
{
  "error": "You can only view your own notes"
}
```

---

### Note Not Found
```bash
curl -X GET http://localhost:5000/api/notes/507f1f77bcf86cd799999999 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

Response (404):
```json
{
  "error": "Note not found"
}
```

---

## Postman Collection

Import this collection into Postman for easier testing:

```json
{
  "info": {
    "name": "AI Notes API",
    "version": "1.0.0"
  },
  "item": [
    {
      "name": "Sign Up",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/api/auth/signup",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"name\": \"John Doe\", \"email\": \"john@example.com\", \"password\": \"SecurePass123\"}"
        }
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/api/auth/login",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"email\": \"john@example.com\", \"password\": \"SecurePass123\"}"
        }
      }
    }
  ]
}
```

---

## Tips

- Always save the JWT token from login/signup responses
- Include `Authorization: Bearer <token>` header for protected endpoints
- Token expires in 7 days
- Use different test users to verify ownership validation
- Check MongoDB directly to verify data persistence
