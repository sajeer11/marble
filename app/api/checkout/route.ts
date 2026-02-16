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

        // Generate a custom obfuscated Order ID
        const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
        const timestamp = Date.now().toString().slice(-4);
        const customOrderId = `MARBLE-${randomStr}-${timestamp}`;

        // Create order
        const parsedUserId = typeof userId === 'number' ? userId : parseInt(String(userId));
        const finalUserId = isNaN(parsedUserId) ? null : parsedUserId;

        const order = await prisma.order.create({
            data: {
                customId: customOrderId,
                customerName: customerInfo.name,
                email: customerInfo.email,
                phone: customerInfo.phone || null,
                totalAmount,
                status: 'pending',
                items: items, // Pass object directly for Json field
                userId: finalUserId,
            },
        });

        // Clear user's cart after successful order - ONLY if we have a real DB userId
        if (finalUserId) {
            await prisma.cartItem.deleteMany({
                where: {
                    cart: {
                        userId: finalUserId,
                    },
                },
            });
        }

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
