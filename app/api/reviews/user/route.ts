import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    try {
        const reviews = await (prisma as any).review.findMany({
            where: { userId: parseInt(userId) },
            include: {
                product: { select: { name: true, image: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch user reviews' }, { status: 500 });
    }
}
