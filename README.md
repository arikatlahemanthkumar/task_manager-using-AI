# TaskMaster Pro - Todo Manager with AI Assistant

A full-stack web application featuring a todo manager with AI question capabilities. Built with React frontend and Node.js backend.

## Features

### 🎯 Todo Management
- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Set priority levels (Low, Medium, High)
- Add descriptions to todos
- Clean, modern UI with real-time updates

### 🤖 AI Assistant
- Ask questions to an AI assistant
- Conversation history
- Integration with OpenAI API (with fallback)
- Real-time responses

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Secure password hashing

## Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **OpenAI API** - AI question answering

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

## Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd task
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create environment variables:
```bash
# Copy the example file
cp env.example .env

# Edit .env with your configuration
```

Configure your `.env` file:
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/todo-app

# JWT Secret (generate a strong secret)
JWT_SECRET=your-super-secret-jwt-key-here

# OpenAI API Key (optional - for AI features)
OPENAI_API_KEY=your-openai-api-key-here

# Server Port
PORT=5000
```

### 3. Frontend Setup

Navigate to the frontend directory:
```bash
cd ../frontend
```

Install dependencies:
```bash
npm install
```

## Running the Application

### 1. Start the Backend Server

From the backend directory:
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The backend server will start on `http://localhost:5000`

### 2. Start the Frontend Development Server

From the frontend directory:
```bash
npm start
```

The React app will start on `http://localhost:3000`

### 3. Access the Application

Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login

### Todos (Protected Routes)
- `GET /api/todos` - Get all todos for user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion

### AI Assistant (Protected Routes)
- `POST /api/ai/ask` - Ask a question to AI

## Project Structure

```
task/
├── backend/
│   ├── controllers/
│   │   ├── usercontroller.js
│   │   ├── todoController.js
│   │   └── aiController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Todo.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── todos.js
│   │   └── ai.js
│   ├── middleware/
│   │   └── auth.js
│   ├── db/
│   │   └── db.js
│   ├── app.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── TodoList.js
│   │   │   └── AIQuestion.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── ForgotPassword.js
│   │   │   └── ResetPassword.js
│   │   ├── api/
│   │   │   └── auth.js
│   │   └── App.js
│   └── package.json
└── README.md
```

## Features in Detail

### Todo Management
- **Create Todos**: Add new todos with title, description, and priority
- **Priority Levels**: Set todos as Low, Medium, or High priority
- **Mark Complete**: Toggle todo completion status
- **Delete Todos**: Remove todos from the list
- **Real-time Updates**: Changes reflect immediately in the UI

### AI Assistant
- **Question Interface**: Clean text area for asking questions
- **Conversation History**: View all previous questions and answers
- **API Integration**: Connects to OpenAI API for intelligent responses
- **Fallback System**: Graceful handling when API is unavailable

### User Experience
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with Tailwind CSS
- **Protected Routes**: Secure access to authenticated features
- **Error Handling**: User-friendly error messages

## Environment Variables

### Required
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing

### Optional
- `OPENAI_API_KEY`: OpenAI API key for AI features
- `PORT`: Server port (default: 5000)

## Deployment

### Backend Deployment
1. Set up a MongoDB database (MongoDB Atlas recommended)
2. Configure environment variables
3. Deploy to platforms like Heroku, Railway, or Vercel

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the GitHub repository.

---

**Note**: This application is designed as a demonstration project. For production use, consider implementing additional security measures, error handling, and performance optimizations. 