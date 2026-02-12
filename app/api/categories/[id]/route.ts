import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Get single category
export async function GET(
  request: Request,
  { params }: any
) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

// PUT - Update category
export async function PUT(
  request: Request,
  { params }: any
) {
  try {
    const body = await request.json();
    const { name, slug, description, image, enabled } = body;

    const category = await prisma.category.update({
      where: { id: parseInt(params.id) },
      data: {
        name,
        slug,
        description,
        image,
        enabled,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE - Delete category
export async function DELETE(
  request: Request,
  { params }: any
) {
  try {
    await prisma.category.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
