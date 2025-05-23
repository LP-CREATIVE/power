'use client';

import { useState } from 'react';

export default function PowerCoachChat() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.result);
      } else {
        setError(data.error || 'An error occurred.');
      }
    } catch (err) {
      setError('Failed to connect to AI Coach.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded-lg shadow bg-white">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">🏋️ PowerCoach Chat</h2>
      <textarea
        rows={3}
        className="w-full p-2 border rounded mb-2 text-gray-800"
        placeholder="Ask your AI Coach about training, drills, recovery..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Thinking...' : 'Ask Coach'}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {response && (
        <div className="mt-4 p-3 bg-gray-100 border rounded text-gray-900">
          <strong>Coach:</strong>
          <p className="mt-1 whitespace-pre-line">{response}</p>
        </div>
      )}
    </div>
  );
}
