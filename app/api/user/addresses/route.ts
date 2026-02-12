import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });
    const key = `addresses:user:${userId}`;
    const data = await prisma.siteSettings.findUnique({ where: { key } });
    return NextResponse.json(Array.isArray(data?.value) ? data?.value : []);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return NextResponse.json({ error: 'Failed to fetch addresses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, addresses } = body;
    if (!userId || !Array.isArray(addresses)) {
      return NextResponse.json({ error: 'userId and addresses[] required' }, { status: 400 });
    }
    const key = `addresses:user:${userId}`;
    const saved = await prisma.siteSettings.upsert({
      where: { key },
      update: { value: addresses, category: 'addresses' },
      create: { key, value: addresses, category: 'addresses' },
    });
    return NextResponse.json(saved.value);
  } catch (error) {
    console.error('Error saving addresses:', error);
    return NextResponse.json({ error: 'Failed to save addresses' }, { status: 500 });
  }
}
