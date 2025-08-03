import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', priority: 'medium' });
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [error, setError] = useState('');

  const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pending = total - completed;
    setStats({ total, completed, pending });
  }, [todos]);

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please login again.');
        return;
      }
      
      const response = await axios.get(`${API_BASE_URL}/todos`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching todos:', error);
      if (error.response?.status === 401) {
        setError('Session expired. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else {
        setError('Failed to load todos. Please try again.');
      }
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please login again.');
        return;
      }
      
      const response = await axios.post(`${API_BASE_URL}/todos`, newTodo, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos([response.data, ...todos]);
      setNewTodo({ title: '', description: '', priority: 'medium' });
    } catch (error) {
      console.error('Error adding todo:', error);
      if (error.response?.status === 401) {
        setError('Session expired. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else {
        setError('Failed to add todo. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please login again.');
        return;
      }
      
      const response = await axios.patch(`${API_BASE_URL}/todos/${id}/toggle`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(todos.map(todo => todo._id === id ? response.data : todo));
      setError('');
    } catch (error) {
      console.error('Error toggling todo:', error);
      if (error.response?.status === 401) {
        setError('Session expired. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else {
        setError('Failed to update todo. Please try again.');
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please login again.');
        return;
      }
      
      await axios.delete(`${API_BASE_URL}/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(todos.filter(todo => todo._id !== id));
      setError('');
    } catch (error) {
      console.error('Error deleting todo:', error);
      if (error.response?.status === 401) {
        setError('Session expired. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else {
        setError('Failed to delete todo. Please try again.');
      }
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Task Management</h2>
          <div className="flex space-x-4 text-sm">
            <span className="text-gray-600">Total: <span className="font-semibold text-gray-900">{stats.total}</span></span>
            <span className="text-green-600">Completed: <span className="font-semibold">{stats.completed}</span></span>
            <span className="text-orange-600">Pending: <span className="font-semibold">{stats.pending}</span></span>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={addTodo} className="space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Enter task title..."
                value={newTodo.title}
                onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Description (optional)"
                value={newTodo.description}
                onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2">
              <select
                value={newTodo.priority}
                onChange={(e) => setNewTodo({...newTodo, priority: e.target.value})}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-medium"
              >
                {loading ? 'Adding...' : 'Add Task'}
              </button>
            </div>
          </div>
        </form>

        <div className="space-y-3">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className={`flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ${
                todo.completed ? 'opacity-75 bg-gray-50' : 'bg-white'
              }`}
            >
              <button
                onClick={() => toggleTodo(todo._id)}
                className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-colors ${
                  todo.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 hover:border-indigo-500'
                }`}
              >
                {todo.completed && (
                  <span className="text-xs font-bold">✓</span>
                )}
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className={`text-lg font-medium ${
                      todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}>
                      {todo.title}
                    </h4>
                    {todo.description && (
                      <p className={`text-sm mt-1 ${
                        todo.completed ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {todo.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 ml-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(todo.priority)}`}>
                      {todo.priority}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(todo.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="text-red-500 hover:text-red-700 px-3 py-1 hover:bg-red-50 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {todos.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
              <p className="text-gray-500">Get started by adding your first task above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList; 