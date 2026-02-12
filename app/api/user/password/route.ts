import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

function sha256(input: string) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, currentPassword, newPassword } = body;
    if (!userId || !currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: { id: typeof userId === 'number' ? userId : parseInt(String(userId)) },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const currentHash = sha256(currentPassword);
    const stored = user.password || '';
    const isValid = stored === currentHash || stored === currentPassword;
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid current password' }, { status: 401 });
    }
    const newHash = sha256(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: newHash },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error changing password:', error);
    return NextResponse.json({ error: 'Failed to change password' }, { status: 500 });
  }
}
