import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch user's cart
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'User ID required' }, { status: 400 });
        }

        let cart = await prisma.cart.findUnique({
            where: { userId: parseInt(userId) },
            include: {
                items: true,
            },
        });

        if (!cart) {
            // Create cart if doesn't exist
            cart = await prisma.cart.create({
                data: { userId: parseInt(userId) },
                include: { items: true },
            });
        }

        // Get product details for each cart item
        const itemsWithProducts = await Promise.all(
            cart.items.map(async (item) => {
                const product = await prisma.product.findUnique({
                    where: { id: item.productId },
                });
                return {
                    ...item,
                    product,
                };
            })
        );

        return NextResponse.json({
            ...cart,
            items: itemsWithProducts,
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
    }
}

// POST - Add item to cart
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, productId, quantity = 1 } = body;

        if (!userId || !productId) {
            return NextResponse.json(
                { error: 'User ID and Product ID required' },
                { status: 400 }
            );
        }

        // Get or create cart
        let cart = await prisma.cart.findUnique({
            where: { userId },
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId },
            });
        }

        // Check if item already in cart
        const existingItem = await prisma.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId,
                },
            },
        });

        if (existingItem) {
            // Update quantity
            const updatedItem = await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            });
            return NextResponse.json(updatedItem);
        } else {
            // Add new item
            const newItem = await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity,
                },
            });
            return NextResponse.json(newItem);
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
    }
}

// PUT - Update cart item quantity
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { itemId, quantity } = body;

        if (!itemId || quantity === undefined) {
            return NextResponse.json(
                { error: 'Item ID and quantity required' },
                { status: 400 }
            );
        }

        if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            await prisma.cartItem.delete({
                where: { id: itemId },
            });
            return NextResponse.json({ message: 'Item removed' });
        }

        const updatedItem = await prisma.cartItem.update({
            where: { id: itemId },
            data: { quantity },
        });

        return NextResponse.json(updatedItem);
    } catch (error) {
        console.error('Error updating cart:', error);
        return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
    }
}

// DELETE - Remove item from cart
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const itemId = searchParams.get('itemId');

        if (!itemId) {
            return NextResponse.json({ error: 'Item ID required' }, { status: 400 });
        }

        await prisma.cartItem.delete({
            where: { id: parseInt(itemId) },
        });

        return NextResponse.json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error('Error removing from cart:', error);
        return NextResponse.json({ error: 'Failed to remove from cart' }, { status: 500 });
    }
}
