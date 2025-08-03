import React, { useState } from 'react';
import TodoList from './TodoList';
import AIQuestion from './AIQuestion';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('todos');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-bold text-gray-900">TaskMaster</h1>
            </div>
            
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-indigo-600 font-medium">Home</a>
              <button
                onClick={() => setActiveTab('todos')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium"
              >
                Manage Tasks
              </button>
              <button
                onClick={handleLogout}
                className="bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 font-medium"
              >
                Sign Out
              </button>
            </nav>
          </div>
        </div>
      </header>

      <section className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Manage Your Tasks, Boost Your Productivity
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            "Organize Smart, Connect with AI, Beat The Deadlines!"
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab('todos')}
              className="bg-white text-indigo-600 border border-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 font-medium"
            >
              Manage Tasks
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 font-medium"
            >
              AI Assistant
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-gray-900 text-center mb-12">
            How TaskMaster Works
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 text-center">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Create Tasks</h4>
              <p className="text-gray-600">Add your tasks with descriptions, priorities, and due dates to stay organized.</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 text-center">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Track Progress</h4>
              <p className="text-gray-600">Monitor your task completion and productivity with real-time statistics.</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 text-center">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">AI Assistance</h4>
              <p className="text-gray-600">Get help from our AI assistant for questions, tips, and productivity advice.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'todos' ? <TodoList /> : <AIQuestion />}
        </div>
      </section>
    </div>
  );
};

export default Dashboard; 