import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { cookies } from 'next/headers';

function sha256(input: string) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

function sign(payload: object) {
  const secret = process.env.SESSION_SECRET || 'dev-session-secret-change-me';
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const hmac = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  return `${data}.${hmac}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const prisma = new PrismaClient();
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (user) {
        const isMatch = user.password === password || user.password === sha256(password);
        if (isMatch) {
          const authedUser = {
            id: String(user.id),
            name: user.name || null,
            email: user.email,
            role: (user as any).role || 'USER',
          } as { id: string; name: string | null; email: string; role: 'ADMIN' | 'USER' };
          const sessionToken = sign({
            id: authedUser.id,
            name: authedUser.name,
            email: authedUser.email,
            role: authedUser.role,
            iat: Date.now(),
          });
          const res = NextResponse.json({
            success: true,
            user: authedUser,
          });
          res.cookies.set('session', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
          });
          await prisma.$disconnect();
          return res;
        }
      }
    } catch {
    } finally {
      try { await prisma.$disconnect(); } catch {}
    }

    const adminEmail = process.env.ADMIN_EMAIL || '';
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || '';
    const adminPasswordPlain = process.env.ADMIN_PASSWORD || '';
    const userEmail = process.env.USER_EMAIL || '';
    const userPasswordHash = process.env.USER_PASSWORD_HASH || '';
    const userPasswordPlain = process.env.USER_PASSWORD || '';

    const providedHash = sha256(password);

    let authedUser: { id: string; name: string | null; email: string; role: 'ADMIN' | 'USER' } | null = null;

    if (
      email === adminEmail &&
      ((adminPasswordHash && providedHash === adminPasswordHash) ||
        (adminPasswordPlain && password === adminPasswordPlain))
    ) {
      authedUser = {
        id: 'admin-env',
        name: 'Admin',
        email: adminEmail,
        role: 'ADMIN',
      };
    } else if (
      email === userEmail &&
      ((userPasswordHash && providedHash === userPasswordHash) ||
        (userPasswordPlain && password === userPasswordPlain))
    ) {
      authedUser = {
        id: 'user-env',
        name: 'Test User',
        email: userEmail,
        role: 'USER',
      };
    }

    if (!authedUser) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const sessionToken = sign({
      id: authedUser.id,
      name: authedUser.name,
      email: authedUser.email,
      role: authedUser.role,
      iat: Date.now(),
    });
    const res = NextResponse.json({
      success: true,
      user: authedUser,
    });

    res.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
