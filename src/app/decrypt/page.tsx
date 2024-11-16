
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input'; 
import { Button } from '@/components/ui/button';

export default function Decrypt() {
  const [secret, setSecret] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleDecrypt = async () => {
    if (!secret) {
      alert('Secret is required!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/decrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(data.message);
      } else {
        setResponseMessage('Failed to decrypt message: ' + data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Decryption error:', error);
      setResponseMessage('Failed to decrypt message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-6 rounded-lg shadow-lg max-w-sm w-full border">
        <h1 className="text-2xl font-bold mb-4 text-center">Decrypt Message</h1>
        
        <div className="mb-4">
          <label htmlFor="secret" className="block text-sm font-medium">Secret</label>
          <Input
            id="secret"
            type="text"
            placeholder="Enter secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="mt-2"
          />
        </div>
        
        <Button
          onClick={handleDecrypt}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Decrypting...' : 'Decrypt'}
        </Button>

        {responseMessage && (
          <div className="mt-4 text-center text-sm">
            <strong>{responseMessage}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
