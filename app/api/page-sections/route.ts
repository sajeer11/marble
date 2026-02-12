import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = searchParams.get('page') || 'home';

        const sections = await prisma.pageSection.findMany({
            where: { page },
            orderBy: { id: 'asc' },
        });

        return NextResponse.json(sections);
    } catch (error) {
        console.error('Error fetching page sections:', error);
        return NextResponse.json(
            { error: 'Failed to fetch page sections' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { page, sectionId, enabled, title, description, coverImage, settings } = body;

        const section = await prisma.pageSection.upsert({
            where: {
                page_sectionId: {
                    page,
                    sectionId,
                },
            },
            update: {
                enabled,
                title,
                description,
                coverImage,
                settings,
            },
            create: {
                page,
                sectionId,
                enabled,
                title,
                description,
                coverImage,
                settings,
            },
        });

        return NextResponse.json(section);
    } catch (error) {
        console.error('Error saving page section:', error);
        return NextResponse.json(
            { error: 'Failed to save page section' },
            { status: 500 }
        );
    }
}
