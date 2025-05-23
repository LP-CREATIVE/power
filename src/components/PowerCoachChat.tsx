'use client';

import { useState } from 'react';

type Message = {
  sender: 'user' | 'coach';
  text: string;
};

export default function PowerCoachChat() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setError('');

    // Add user's message to chat
    setChatLog(prev => [...prev, { sender: 'user', text: message }]);

    try {
      const res = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (res.ok) {
        setChatLog(prev => [...prev, { sender: 'coach', text: data.result }]);
      } else {
        setError(data.error || 'An error occurred.');
      }
    } catch {
      setError('Failed to connect to AI Coach.');
    }

    setMessage('');
    setLoading(false);
  };

  const clearChat = () => {
    setChatLog([]);
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded-lg shadow bg-card text-card-foreground">
      <h2 className="text-xl font-semibold mb-4 text-primary">Chat with Coach P</h2>

      <div className="space-y-3 max-h-[400px] overflow-y-auto mb-4">
        {chatLog.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg text-sm ${
              msg.sender === 'user'
                ? 'bg-muted text-right ml-auto max-w-[80%]'
                : 'bg-primary text-primary-foreground mr-auto max-w-[80%]'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <textarea
        rows={3}
        className="w-full p-2 border border-border rounded mb-2 bg-background text-foreground"
        placeholder="Ask your AI Coach about training, drills, recovery..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="flex justify-between items-center">
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary-hover disabled:opacity-50"
        >
          {loading ? 'Thinking...' : 'Ask Coach'}
        </button>
        <button
          onClick={clearChat}
          className="text-sm text-muted-foreground hover:underline"
        >
          Delete Conversation
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

