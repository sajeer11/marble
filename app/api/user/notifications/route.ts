import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });
    const key = `notifications:user:${userId}`;
    const data = await prisma.siteSettings.findUnique({ where: { key } });
    return NextResponse.json(data?.value || null);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, notifications } = body;
    if (!userId || !notifications) {
      return NextResponse.json({ error: 'userId and notifications required' }, { status: 400 });
    }
    const key = `notifications:user:${userId}`;
    const saved = await prisma.siteSettings.upsert({
      where: { key },
      update: { value: notifications, category: 'notifications' },
      create: { key, value: notifications, category: 'notifications' },
    });
    return NextResponse.json(saved.value);
  } catch (error) {
    console.error('Error saving notifications:', error);
    return NextResponse.json({ error: 'Failed to save notifications' }, { status: 500 });
  }
}
