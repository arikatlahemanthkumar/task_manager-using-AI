import React, { useState } from 'react';
import { register } from '../api/auth';
import { Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    
    console.log('Submitting registration form:', form);
    const res = await register(form);
    console.log('Registration response:', res);
    
    if (res.user) {
      setMessage('Registration successful! Please login.');
      setForm({ name: '', email: '', password: '' });
    } else {
      setError(res.message || 'Registration failed');
    }
    setLoading(false);
  };

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
              <Link to="/login" className="bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 font-medium">
                Sign In
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Join TaskMaster Today
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            "Organize Smart, Connect with AI, Beat The Deadlines!"
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/login" className="bg-white text-indigo-600 border border-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 font-medium">
              Sign In
            </Link>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 font-medium">
              Sign Up
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h3>
              <p className="text-gray-600">Start your productivity journey with us</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Create a strong password"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 6 characters long
                </p>
              </div>

              {message && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-700">{message}</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-medium"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Why Choose TaskMaster?</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Smart Task Management</h4>
                  <p className="text-xs text-gray-600">Organize tasks with priority levels and descriptions</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">AI-Powered Assistant</h4>
                  <p className="text-xs text-gray-600">Get help and answers from our intelligent AI</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Secure & Private</h4>
                  <p className="text-xs text-gray-600">Your data is protected with industry-standard security</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register; 