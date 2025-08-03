import React, { useState } from 'react';
import axios from 'axios';

const AIQuestion = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [error, setError] = useState('');

  const API_BASE_URL = 'http://localhost:5000/api';

  const askQuestion = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please login again.');
        return;
      }
      
      const response = await axios.post(`${API_BASE_URL}/ai/ask`, { question }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const newConversation = {
        question: response.data.question,
        answer: response.data.answer,
        timestamp: response.data.timestamp,
        note: response.data.note,
        source: response.data.source
      };

      setConversation([newConversation, ...conversation]);
      setAnswer(response.data.answer);
      setQuestion('');
    } catch (error) {
      console.error('Error asking question:', error);
      if (error.response?.status === 401) {
        setError('Session expired. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else {
        setError('Sorry, I encountered an error. Please try again.');
        setAnswer('Sorry, I encountered an error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">AI Assistant</h2>
          <span className="text-sm text-gray-500">{conversation.length} conversation{conversation.length !== 1 ? 's' : ''}</span>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={askQuestion} className="space-y-4 mb-8">
          <div>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask me anything... I'm here to help with any topic!"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              rows="4"
              disabled={loading}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-medium"
            >
              {loading ? 'Thinking...' : 'Ask Question'}
            </button>
          </div>
        </form>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Conversation History</h3>
          <div className="space-y-4">
            {conversation.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">Q</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-medium text-gray-900">{item.question}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">A</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{item.answer}</p>
                      {item.note && (
                        <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                          <p className="text-sm text-orange-700 italic">{item.note}</p>
                        </div>
                      )}
                      {item.source && (
                        <div className="mt-2 text-xs text-gray-500">
                          Powered by: {item.source}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {conversation.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to help!</h3>
                <p className="text-gray-500">Ask me anything - from general knowledge to task management tips!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIQuestion; 