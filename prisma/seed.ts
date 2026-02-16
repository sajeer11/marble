import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // Seed default categories
    const categories = [
        {
            name: 'Marble',
            slug: 'marble',
            description: 'Premium marble selection',
            enabled: true,
            image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Tiles',
            slug: 'tiles',
            description: 'Elegant tile collection',
            enabled: true,
            image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Natural Stone',
            slug: 'natural-stone',
            description: 'Authentic natural stone',
            enabled: true,
            image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Slabs',
            slug: 'slabs',
            description: 'Large format slabs',
            enabled: true,
            image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Exotic Quartzite',
            slug: 'exotic-quartzite',
            description: 'Rare and durable quartzite',
            enabled: true,
            image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Translucent Onyx',
            slug: 'translucent-onyx',
            description: 'Backlit luxury onyx',
            enabled: true,
            image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80'
        },
    ];

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { name: cat.name },
            update: {},
            create: cat,
        });
    }
    console.log('✅ Categories seeded');

    // Seed multiple products
    const products = [
        // Marble Products
        { name: 'Statuario Gold Marble', description: 'Luxurious white marble with gold veining', price: 299.99, category: 'Marble', tag: 'Featured', image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&w=600&q=80' },
        { name: 'Calacatta Marble', description: 'Classic Italian marble with dramatic veining', price: 349.99, category: 'Marble', tag: 'Premium', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=600&q=80' },
        { name: 'Carrara White Marble', description: 'Timeless white marble from Tuscany', price: 249.99, category: 'Marble', tag: 'Best Seller', image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=600&q=80' },
        { name: 'Emperador Dark Marble', description: 'Rich brown marble with white veins', price: 279.99, category: 'Marble', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80' },
        { name: 'Verde Guatemala Marble', description: 'Stunning green marble with unique patterns', price: 399.99, category: 'Marble', tag: 'Exclusive', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80' },

        // Tiles
        { name: 'Porcelain White Tiles', description: 'Modern porcelain tiles in crisp white', price: 89.99, category: 'Tiles', tag: 'Best Seller', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=600&q=80' },
        { name: 'Hexagon Mosaic Tiles', description: 'Trendy hexagonal pattern tiles', price: 129.99, category: 'Tiles', tag: 'Trending', image: 'https://images.unsplash.com/photo-1600607687644-c7aafd25c4cd?auto=format&fit=crop&w=600&q=80' },
        { name: 'Subway Metro Tiles', description: 'Classic subway tiles for timeless design', price: 69.99, category: 'Tiles', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80' },
        { name: 'Glossy Black Tiles', description: 'Sleek black tiles with high gloss finish', price: 99.99, category: 'Tiles', tag: 'Modern', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=600&q=80' },
        { name: 'Terracotta Floor Tiles', description: 'Warm terracotta tiles for rustic charm', price: 79.99, category: 'Tiles', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80' },

        // Natural Stone
        { name: 'Travertine Stone', description: 'Natural travertine with earthy tones', price: 189.99, category: 'Natural Stone', tag: 'Featured', image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=600&q=80' },
        { name: 'Limestone Beige', description: 'Soft beige limestone for elegant spaces', price: 159.99, category: 'Natural Stone', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80' },
        { name: 'Sandstone Yellow', description: 'Warm yellow sandstone for outdoor use', price: 139.99, category: 'Natural Stone', tag: 'Outdoor', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80' },
        { name: 'Slate Gray Stone', description: 'Textured gray slate for modern design', price: 169.99, category: 'Natural Stone', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=600&q=80' },
        { name: 'Granite Black Pearl', description: 'Premium black granite with sparkle', price: 219.99, category: 'Natural Stone', tag: 'Premium', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=600&q=80' },

        // Slabs
        { name: 'Quartzite Super White', description: 'Large format white quartzite slab', price: 499.99, category: 'Slabs', tag: 'Premium', image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&w=600&q=80' },
        { name: 'Onyx Honey Slab', description: 'Translucent honey onyx for feature walls', price: 599.99, category: 'Slabs', tag: 'Exclusive', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80' },
        { name: 'Quartz Calacatta', description: 'Engineered quartz with marble look', price: 449.99, category: 'Slabs', tag: 'Best Seller', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=600&q=80' },
        { name: 'Porcelain Large Format', description: 'Ultra-thin porcelain slab 3200x1600mm', price: 389.99, category: 'Slabs', tag: 'Modern', image: 'https://images.unsplash.com/photo-1600607687644-c7aafd25c4cd?auto=format&fit=crop&w=600&q=80' },
        { name: 'Granite Countertop Slab', description: 'Durable granite slab for kitchen counters', price: 429.99, category: 'Slabs', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80' },

        // Exotic Quartzite
        { name: 'Taj Mahal Quartzite', description: 'Soft cream and white with beige veining', price: 499.99, category: 'Exotic Quartzite', tag: 'Royal', image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=600&q=80' },
        { name: 'Fusion Blue Quartzite', description: 'Dynamic blue and gray tones with rust accents', price: 549.99, category: 'Exotic Quartzite', tag: 'Artistic', image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&w=600&q=80' },
        { name: 'Amazonite Green', description: 'Rare turquoise-green quartzite from Brazil', price: 899.99, category: 'Exotic Quartzite', tag: 'Ultra-Rare', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80' },

        // Translucent Onyx
        { name: 'Pink Cloud Onyx', description: 'Delicate pink translucent onyx slab', price: 649.99, category: 'Translucent Onyx', image: 'https://api.dicebear.com/7.x/initials/svg?seed=PinkOnyx' },
        { name: 'Tiger Onyx', description: 'Bold orange and black striped translucent onyx', price: 749.99, category: 'Translucent Onyx', tag: 'Dramatic', image: 'https://api.dicebear.com/7.x/initials/svg?seed=TigerOnyx' },
        { name: 'Pure White Onyx', description: 'Crystal clear white onyx for backlighting', price: 799.99, category: 'Translucent Onyx', tag: 'Pure', image: 'https://api.dicebear.com/7.x/initials/svg?seed=WhiteOnyx' },
    ];

    for (let i = 0; i < products.length; i++) {
        await prisma.product.upsert({
            where: { id: i + 1 },
            update: {},
            create: { id: i + 1, ...products[i] },
        });
    }
    console.log(`✅ ${products.length} products seeded`);

    // Seed default site settings
    const settings = [
        { key: 'siteName', value: 'MarbleLux', category: 'store' },
        { key: 'siteEmail', value: 'admin@marblelux.com', category: 'store' },
        { key: 'currency', value: 'USD', category: 'store' },
        { key: 'taxRate', value: 10, category: 'store' },
        { key: 'shippingCost', value: 50, category: 'shipping' },
        { key: 'freeShippingThreshold', value: 500, category: 'shipping' },
        { key: 'maintenanceMode', value: false, category: 'store' },
        { key: 'allowNewRegistrations', value: true, category: 'store' },
    ];

    for (const setting of settings) {
        await prisma.siteSettings.upsert({
            where: { key: setting.key },
            update: {},
            create: setting,
        });
    }
    console.log('✅ Site settings seeded');

    // Seed default page sections
    const pageSections = [
        {
            page: 'home',
            sectionId: 'hero',
            enabled: true,
            title: 'Premium Marble Selection',
            description: 'Transform your home with luxury finishes',
            coverImage: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&w=1400&h=400&q=80',
            settings: {},
        },
        {
            page: 'home',
            sectionId: 'categories',
            enabled: true,
            title: 'Shop by Category',
            settings: { columns: 4 },
        },
        {
            page: 'home',
            sectionId: 'featured',
            enabled: true,
            title: 'Featured Products',
            settings: { itemsPerRow: 4 },
        },
    ];

    for (const section of pageSections) {
        await prisma.pageSection.upsert({
            where: {
                page_sectionId: {
                    page: section.page,
                    sectionId: section.sectionId,
                },
            },
            update: {},
            create: section,
        });
    }
    console.log('✅ Page sections seeded');

    console.log('🎉 Seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
