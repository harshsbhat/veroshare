import { NextResponse } from 'next/server';
import crypto from 'crypto';

interface RequestBody {
  secret: string;
}

const ipRequestCounts: Record<string, number[]> = {};
const RATE_LIMIT = 3;
const TIME_WINDOW = 10000;

function checkRateLimit(ip: string): boolean {
  const currentTime = Date.now();
  if (!ipRequestCounts[ip]) {
    ipRequestCounts[ip] = [];
  }
  ipRequestCounts[ip] = ipRequestCounts[ip].filter((timestamp) => currentTime - timestamp < TIME_WINDOW);
  if (ipRequestCounts[ip].length >= RATE_LIMIT) {
    return false;
  }
  ipRequestCounts[ip].push(currentTime);
  return true;
}

function normalizePassword(password: string): Buffer {
  let key = Buffer.from(password, 'utf8');
  if (key.length < 32) {
    const padding = Buffer.alloc(32 - key.length, 0);
    key = Buffer.concat([key, padding]);
  } else if (key.length > 32) {
    key = key.slice(0, 32);
  }
  return key;
}

function decryptMessage(password: string, encryptedMessage: string): string {
  const key = normalizePassword(password);
  const decipher = crypto.createDecipheriv('aes-256-ctr', key, Buffer.alloc(16, 0));
  return decipher.update(encryptedMessage, 'hex', 'utf8') + decipher.final('utf8');
}

function getClientIp(request: Request): string | undefined {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || request.headers.get('cf-connecting-ip');
  return ip || undefined;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const ip = getClientIp(request);

    if (!ip) {
      return NextResponse.json({ error: 'Could not determine client IP' }, { status: 400 });
    }

    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 });
    }

    const { secret }: RequestBody = await request.json();

    if (!secret) {
      return NextResponse.json({ error: 'Secret is required for decryption' }, { status: 400 });
    }

    const response = await fetch('http://localhost:5000/get/' + secret, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch encrypted message' }, { status: 500 });
    }

    const data = await response.json();
    const encryptedMessage = data.value;

    if (encryptedMessage) {
      const decryptedMessage = decryptMessage(secret, encryptedMessage);
      return NextResponse.json({ message: decryptedMessage });
    }

    return NextResponse.json({ error: 'Encrypted data not found' }, { status: 404 });
  } catch (error) {
    console.error('Decryption API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
