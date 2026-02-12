import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, items, totalAmount, customerInfo } = body;

        if (!userId || !items || items.length === 0) {
            return NextResponse.json(
                { error: 'User ID and items required' },
                { status: 400 }
            );
        }

        // Create order
        const order = await prisma.order.create({
            data: {
                customerName: customerInfo.name,
                email: customerInfo.email,
                phone: customerInfo.phone || null,
                totalAmount,
                status: 'pending',
                items: JSON.stringify(items), // Store items as JSON for simplicity
            },
        });

        // Clear user's cart after successful order
        await prisma.cartItem.deleteMany({
            where: {
                cart: {
                    userId,
                },
            },
        });

        return NextResponse.json({
            success: true,
            order,
            message: 'Order placed successfully',
        });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
        );
    }
}

// GET - Fetch user's orders
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'Email required' }, { status: 400 });
        }

        const orders = await prisma.order.findMany({
            where: { email },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json(
            { error: 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}
