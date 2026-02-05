# AI Powered Notes Application

Welcome to the AI Powered Notes Application! This is a full-stack, modern web application that leverages artificial intelligence to help users create, manage, and summarize their notes efficiently. Built with a robust Node.js/Express backend and a sleek React frontend, this project demonstrates best practices in authentication, RESTful API design, Redux state management, and AI integration.

---

## 🚀 Features

- **User Authentication:** Secure signup, login, and protected routes using JWT.
- **AI Summarization:** Instantly generate concise summaries of your notes using AI.
- **CRUD Notes:** Create, read, update, and delete notes with a beautiful UI.
- **Responsive Design:** Fully responsive and mobile-friendly interface.
- **Redux State Management:** Efficient state handling for authentication and notes.
- **Error Handling:** Robust error management on both frontend and backend.
- **Modern UI/UX:** Clean, intuitive, and professional design.

---

## 🏗️ Tech Stack

**Frontend:**
- React (with Hooks)
- Redux Toolkit
- React Router
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- dotenv for environment management

**AI Integration:**
- Summarization utility (can be extended to use OpenAI or similar APIs)

---

## 📁 Project Structure

```
AI Powered Notes Application/
│
├── backend/
│   ├── controllers/      # Auth & Note logic
│   ├── middleware/       # Auth middleware
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API endpoints
│   ├── utils/            # Error handler, summarizer
│   ├── config/           # DB config
│   ├── .env.example      # Backend environment variables
│   └── server.js         # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/   # Reusable UI components
    │   ├── pages/        # Main app pages
    │   ├── redux/        # State management
    │   ├── services/     # API calls
    │   └── utils/        # Helpers
    ├── public/           # Static files
    ├── .env.example      # Frontend environment variables
    └── package.json      # Frontend dependencies
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or cloud)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-powered-notes-app.git
cd "AI Powered Notes Application"
```

### 2. Setup Backend

```bash
cd backend
cp .env.example .env   # Fill in your MongoDB URI and JWT secret
npm install
npm start
```

### 3. Setup Frontend

```bash
cd ../frontend
cp .env.example .env   # Set your backend API URL
npm install
npm start
```

### 4. Access the App

Open your browser and go to:  
```
http://localhost:3000
```

---

## 🧠 AI Summarization

The app features an AI-powered summarizer that condenses your notes into key points. The summarizer utility is modular and can be easily integrated with external AI APIs (like OpenAI GPT) for even more powerful summaries.

---

## 🔒 Security

- Passwords are hashed and never stored in plain text.
- JWT tokens are used for secure authentication.
- Protected routes ensure only authorized users can access their notes.

---



## 🤝 Contributing

Contributions are welcome! Please fork the repo and submit a pull request. For major changes, open an issue first to discuss what you would like to change.

---
