import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const links = await prisma.navLink.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(links);
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return NextResponse.json({ error: 'Failed to fetch navigation' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { label, path, icon, active = true, order } = body;
    if (!label || !path) {
      return NextResponse.json({ error: 'Label and path required' }, { status: 400 });
    }
    const count = await prisma.navLink.count();
    const link = await prisma.navLink.create({
      data: {
        label,
        path,
        icon: icon || null,
        active,
        order: typeof order === 'number' ? order : count,
      },
    });
    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    console.error('Error creating navigation link:', error);
    return NextResponse.json({ error: 'Failed to create navigation link' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, label, path, icon, active, order } = body;
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    const link = await prisma.navLink.update({
      where: { id: Number(id) },
      data: {
        label,
        path,
        icon,
        active,
        order,
      },
    });
    return NextResponse.json(link);
  } catch (error) {
    console.error('Error updating navigation link:', error);
    return NextResponse.json({ error: 'Failed to update navigation link' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    await prisma.navLink.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting navigation link:', error);
    return NextResponse.json({ error: 'Failed to delete navigation link' }, { status: 500 });
  }
}

