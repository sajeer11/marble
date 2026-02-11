import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from './CartContext';

export const metadata: Metadata = {
  title: 'MarbleLux | Premium Stone Surfaces',
  description: 'Premium marble and stone surfaces for your home',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Material Icons */}
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        
        {/* Tailwind Config */}
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              darkMode: "class",
              theme: {
                extend: {
                  colors: {
                    primary: "#B88E2F",
                    "primary-dark": "#9A7626",
                    "background-light": "#FCF8F3",
                    "background-dark": "#1F1F1F",
                    "surface-dark": "#2A2A2A",
                    "text-dark": "#E8E8E8",
                    "text-light": "#333333",
                  },
                  fontFamily: {
                    playfair: ["Playfair Display", "serif"],
                    poppins: ["Poppins", "sans-serif"],
                  },
                }
              }
            }
          `
        }} />
      </head>
      <body className="bg-white dark:bg-background-dark text-text-light dark:text-text-dark transition-colors">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
