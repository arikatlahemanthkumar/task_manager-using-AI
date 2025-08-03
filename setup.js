#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 TaskMaster Pro Setup Script');
console.log('==============================\n');

const backendEnvPath = path.join(__dirname, 'backend', '.env');
const backendEnvExamplePath = path.join(__dirname, 'backend', 'env.example');

if (!fs.existsSync(backendEnvPath)) {
  console.log('📝 Creating .env file in backend directory...');
  
  if (fs.existsSync(backendEnvExamplePath)) {
    fs.copyFileSync(backendEnvExamplePath, backendEnvPath);
    console.log('✅ .env file created from template');
  } else {
    const envContent = `# Database Configuration
MONGODB_URI=mongodb://localhost:27017/todo-app

# JWT Secret (generate a strong secret)
JWT_SECRET=your-super-secret-jwt-key-here

# OpenAI API Key (optional - for AI features)
OPENAI_API_KEY=your-openai-api-key-here

# Server Port
PORT=5000
`;
    fs.writeFileSync(backendEnvPath, envContent);
    console.log('✅ .env file created with default values');
  }
  
  console.log('\n⚠️  IMPORTANT: Please edit backend/.env with your actual configuration:');
  console.log('   - Set a strong JWT_SECRET');
  console.log('   - Configure your MongoDB connection string');
  console.log('   - Add your OpenAI API key (optional)');
} else {
  console.log('✅ .env file already exists in backend directory');
}

console.log('\n📦 Installing dependencies...');

console.log('\n🔧 Installing backend dependencies...');
const { execSync } = require('child_process');

try {
  execSync('npm install', { cwd: path.join(__dirname, 'backend'), stdio: 'inherit' });
  console.log('✅ Backend dependencies installed');
} catch (error) {
  console.log('❌ Failed to install backend dependencies');
  console.log('   Please run: cd backend && npm install');
}

console.log('\n🎨 Installing frontend dependencies...');
try {
  execSync('npm install', { cwd: path.join(__dirname, 'frontend'), stdio: 'inherit' });
  console.log('✅ Frontend dependencies installed');
} catch (error) {
  console.log('❌ Failed to install frontend dependencies');
  console.log('   Please run: cd frontend && npm install');
}

console.log('\n🎉 Setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Make sure MongoDB is running');
console.log('2. Edit backend/.env with your configuration');
console.log('3. Start the backend: cd backend && npm run dev');
console.log('4. Start the frontend: cd frontend && npm start');
console.log('5. Open http://localhost:3000 in your browser');
console.log('\n📚 For more information, see README.md'); 