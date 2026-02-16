import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
        return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }

    try {
        const reviews = await (prisma as any).review.findMany({
            where: { productId: parseInt(productId) },
            include: { user: { select: { name: true } } },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { productId, userId, orderId, rating, comment } = body;

        if (!productId || !userId || !orderId || !rating) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Verify Order (supports integer ID or custom string ID)
        const isNumeric = /^\d+$/.test(orderId);
        const order = await prisma.order.findFirst({
            where: {
                OR: [
                    isNumeric ? { id: parseInt(orderId) } : {},
                    { customId: orderId.toString() }
                ].filter(condition => Object.keys(condition).length > 0)
            }
        });

        if (!order) {
            return NextResponse.json({ error: 'Invalid Order ID. Only real customers can review.' }, { status: 403 });
        }

        // Create review
        const review = await (prisma as any).review.create({
            data: {
                productId: parseInt(productId),
                userId: parseInt(userId),
                orderId: order.id, // Use actual DB id
                rating: parseInt(rating),
                comment: comment || ''
            }
        });

        return NextResponse.json(review);
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'You have already reviewed this product' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to post review' }, { status: 500 });
    }
}
