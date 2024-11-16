
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';    
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function Encrypt() {
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleEncrypt = async () => {
    if (!message || !password) {
      alert('Message and password are required!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/encrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(data.message);
      } else {
        setResponseMessage('Failed to encrypt message: ' + data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Encryption error:', error);
      setResponseMessage('Failed to encrypt message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-6 rounded-lg shadow-lg max-w-sm w-full border">
        <h1 className="text-2xl font-bold mb-4 text-center">Encrypt Message</h1>
        
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium">Message</label>
          <Textarea
            id="message"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-2"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2"
          />
        </div>
        
        <Button
          onClick={handleEncrypt}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Encrypting...' : 'Encrypt'}
        </Button>

        {responseMessage && (
          <div className="mt-4 text-center text-sm text-zinc-200">
            <strong>{responseMessage}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
