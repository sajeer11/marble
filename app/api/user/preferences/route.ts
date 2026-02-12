import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }
    const key = `preferences:user:${userId}`;
    const data = await prisma.siteSettings.findUnique({ where: { key } });
    return NextResponse.json(data?.value || null);
  } catch (error) {
    console.error('Error fetching preferences:', error);
    return NextResponse.json({ error: 'Failed to fetch preferences' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, preferences } = body;
    if (!userId || !preferences) {
      return NextResponse.json({ error: 'userId and preferences required' }, { status: 400 });
    }
    const key = `preferences:user:${userId}`;
    const saved = await prisma.siteSettings.upsert({
      where: { key },
      update: { value: preferences, category: 'preferences' },
      create: { key, value: preferences, category: 'preferences' },
    });
    return NextResponse.json(saved.value);
  } catch (error) {
    console.error('Error saving preferences:', error);
    return NextResponse.json({ error: 'Failed to save preferences' }, { status: 500 });
  }
}
