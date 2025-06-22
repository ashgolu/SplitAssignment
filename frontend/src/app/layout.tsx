'use client';
import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apollo-client';
import { CartProvider } from '@/context/CartContext';
import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>
          <CartProvider>
            <header className="p-4 bg-gray-100 shadow flex justify-between items-center">
              <h1 className="text-xl font-bold">🛒 Inventory System</h1>
              <Link href="/cart">
                <span className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
                  View Cart
                </span>
              </Link>
            </header>

            {children}
          </CartProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
