import { NextResponse } from 'next/server';
import crypto from 'crypto';

function normalizePassword(password: string) {
  let key = Buffer.from(password, 'utf8');
  if (key.length < 32) {
    const padding = Buffer.alloc(32 - key.length, 0);
    key = Buffer.concat([key, padding]);
  } else if (key.length > 32) {
    key = key.slice(0, 32);
  }
  return key;
}

function encryptMessage(password: string, message: string) {
  const key = normalizePassword(password);
  const cipher = crypto.createCipheriv('aes-256-ctr', key, Buffer.alloc(16, 0));
  return cipher.update(message, 'utf8', 'hex') + cipher.final('hex');
}

export async function POST(request: Request) {
  try {
    const { message, password } = await request.json();

    if (!message || !password) {
      return NextResponse.json({ error: 'Message and password are required for encryption' }, { status: 400 });
    }

    const encryptedMessage = encryptMessage(password, message);

    const response = await fetch('http://localhost:5000/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key: password, 
        value: encryptedMessage,
      }),
    });
    console.log(response)

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to save encrypted message' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Encrypted message saved successfully' });
  } catch (error) {
    console.error('Encryption API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
