import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

function verify(token: string | undefined) {
  if (!token) return null;
  const secret = process.env.SESSION_SECRET || 'dev-session-secret-change-me';
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [data, sig] = parts;
  const expected = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString());
    return payload;
  } catch {
    return null;
  }
}

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('session')?.value;
  const payload = verify(token);
  if (!payload) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({
    authenticated: true,
    user: {
      id: payload.id,
      name: payload.name || null,
      email: payload.email,
      role: payload.role,
    },
  });
}
