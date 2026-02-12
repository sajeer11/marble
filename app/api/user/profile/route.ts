import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET profile by userId
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }
    const key = `profile:user:${userId}`;
    const profile = await prisma.siteSettings.findUnique({ where: { key } });
    return NextResponse.json(profile?.value || null);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

// POST upsert profile
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, profile } = body;
    if (!userId || !profile) {
      return NextResponse.json({ error: 'userId and profile required' }, { status: 400 });
    }
    const key = `profile:user:${userId}`;
    const saved = await prisma.siteSettings.upsert({
      where: { key },
      update: { value: profile, category: 'profile' },
      create: { key, value: profile, category: 'profile' },
    });
    return NextResponse.json(saved.value);
  } catch (error) {
    console.error('Error saving profile:', error);
    return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 });
  }
}
