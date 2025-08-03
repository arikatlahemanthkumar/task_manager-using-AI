# TaskMaster Setup Instructions

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

## Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env` file in the backend directory with the following content:
   ```
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/taskmaster
   
   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
   
   # OpenAI API Key (optional - for AI features)
   # OPENAI_API_KEY=your-openai-api-key-here
   
   # Server Port
   PORT=5000
   ```

4. **Start the backend server:**
   ```bash
   npm start
   # or for development with auto-restart:
   npm run dev
   ```

   The backend will start on `http://localhost:5000`

## Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm start
   ```

   The frontend will start on `http://localhost:3000`

## Database Setup

1. **Local MongoDB:**
   - Install MongoDB locally
   - Start MongoDB service
   - The application will automatically create the database

2. **MongoDB Atlas (Cloud):**
   - Create a MongoDB Atlas account
   - Create a new cluster
   - Get your connection string
   - Replace `MONGODB_URI` in the `.env` file with your Atlas connection string

## Features Fixed

### Frontend Issues Resolved:
1. **Tailwind CSS Configuration:** Added proper Tailwind CSS setup with configuration files
2. **Error Handling:** Added comprehensive error handling for all API calls
3. **Authentication Flow:** Fixed authentication token handling and session management
4. **UI Components:** Improved styling and user feedback for all components
5. **Form Validation:** Added proper form validation and user feedback

### Backend Issues Resolved:
1. **Input Validation:** Added proper validation middleware using express-validator
2. **Error Handling:** Improved error responses and handling
3. **User Model:** Enhanced User model with proper validation and constraints
4. **API Responses:** Standardized API response format
5. **Authentication:** Fixed JWT token handling and user authentication

## Available Features

### Authentication:
- User registration
- User login
- Password reset (forgot password)
- Protected routes

### Task Management:
- Create new tasks
- View all tasks
- Mark tasks as complete/incomplete
- Delete tasks
- Set task priorities (low, medium, high)
- Task statistics

### AI Assistant:
- Ask questions to AI
- Conversation history
- Fallback responses when OpenAI API is not configured

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Error:**
   - Ensure MongoDB is running
   - Check your connection string in `.env`
   - Verify network connectivity

2. **Port Already in Use:**
   - Change the PORT in `.env` file
   - Kill processes using the port

3. **CORS Errors:**
   - Backend has CORS enabled for development
   - Ensure frontend is running on the correct port

4. **Authentication Issues:**
   - Clear browser localStorage
   - Check JWT_SECRET in backend `.env`
   - Verify token expiration

5. **Tailwind CSS Not Working:**
   - Ensure all dependencies are installed
   - Check that `tailwind.config.js` and `postcss.config.js` exist
   - Verify `@tailwind` directives are in `index.css`

## API Endpoints

### Authentication:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password

### Tasks:
- `GET /api/todos` - Get all tasks (requires auth)
- `POST /api/todos` - Create new task (requires auth)
- `PATCH /api/todos/:id/toggle` - Toggle task completion (requires auth)
- `DELETE /api/todos/:id` - Delete task (requires auth)

### AI:
- `POST /api/ai/ask` - Ask AI question (requires auth)

## Security Notes

1. **JWT Secret:** Change the JWT_SECRET in production
2. **Environment Variables:** Never commit `.env` files to version control
3. **Database:** Use strong passwords for database connections
4. **HTTPS:** Use HTTPS in production environments

## Development Notes

- The application uses React 18 with functional components and hooks
- Backend uses Express.js with MongoDB and Mongoose
- Tailwind CSS is used for styling
- JWT is used for authentication
- All API calls include proper error handling and loading states 