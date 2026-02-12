import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DEFAULT_SETTINGS = [
    { key: 'siteName', value: 'MarbleLux', category: 'store' },
    { key: 'siteEmail', value: 'admin@marblelux.com', category: 'store' },
    { key: 'currency', value: 'USD', category: 'store' },
    { key: 'taxRate', value: 10, category: 'store' },
    { key: 'shippingCost', value: 50, category: 'shipping' },
    { key: 'freeShippingThreshold', value: 500, category: 'shipping' },
    { key: 'maintenanceMode', value: false, category: 'store' },
    { key: 'allowNewRegistrations', value: true, category: 'store' },
    { key: 'smtpServer', value: 'mail.marblelux.com', category: 'email' },
    { key: 'smtpPort', value: '587', category: 'email' },
    { key: 'fromEmail', value: 'noreply@marblelux.com', category: 'email' },
    { key: 'fromName', value: 'MarbleLux Admin', category: 'email' },
];

export async function GET() {
    try {
        let settings = await prisma.siteSettings.findMany();

        // If no settings exist, create defaults
        if (settings.length === 0) {
            await prisma.siteSettings.createMany({
                data: DEFAULT_SETTINGS,
            });
            settings = await prisma.siteSettings.findMany();
        }

        // Convert to key-value object for frontend
        const settingsObj = settings.reduce((acc, setting) => {
            acc[setting.key] = setting.value; // value is already JSON
            return acc;
        }, {} as Record<string, any>);

        return NextResponse.json(settingsObj);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json(
            { error: 'Failed to fetch settings' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Update each setting
        for (const [key, value] of Object.entries(body)) {
            await prisma.siteSettings.upsert({
                where: { key },
                update: { value }, // store value directly as JSON
                create: {
                    key,
                    value,
                    category: 'store', // default category
                },
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json(
            { error: 'Failed to update settings' },
            { status: 500 }
        );
    }
}
