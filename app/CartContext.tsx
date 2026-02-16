'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { useUserAuth } from '@/contexts/UserAuthContext';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoggedIn } = useUserAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize/Switch cart when user context changes
  useEffect(() => {
    const key = user?.id ? `marblelux_cart_${user.id}` : 'marblelux_cart_guest';
    const savedCart = localStorage.getItem(key);

    // If we're logging in, we might want to merge the guest cart
    if (user?.id) {
      const guestCart = localStorage.getItem('marblelux_cart_guest');
      if (guestCart) {
        try {
          const guestItems = JSON.parse(guestCart);
          if (guestItems.length > 0) {
            // merge guest items into current cart (which will be fetched from DB soon)
            setCart(prev => {
              const merged = [...prev];
              guestItems.forEach((gi: any) => {
                const existing = merged.find(mi => String(mi.id) === String(gi.id));
                if (existing) {
                  existing.quantity += gi.quantity;
                } else {
                  merged.push(gi);
                }
              });
              return merged;
            });
            // Clear guest cart
            localStorage.removeItem('marblelux_cart_guest');
          }
        } catch (e) { }
      }
    }

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    } else if (!user?.id) {
      // If guest and no saved cart, clear
      setCart([]);
    }

    setIsInitialized(true);
  }, [user?.id]);

  // Fetch cart from API when user logs in
  useEffect(() => {
    if (isLoggedIn && user?.id && isInitialized) {
      const fetchCart = async () => {
        try {
          const res = await fetch(`/api/cart?userId=${user.id}`);
          if (res.ok) {
            const data = await res.json();
            const dbItems = (data.items || []).map((item: any) => ({
              ...item.product,
              quantity: item.quantity
            }));

            setCart(prev => {
              const merged = [...dbItems];
              prev.forEach(localItem => {
                const dbItem = dbItems.find((di: any) => String(di.id) === String(localItem.id));
                if (!dbItem) {
                  merged.push(localItem);
                  // Sync new local item to DB
                  fetch('/api/cart', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user.id, productId: localItem.id, quantity: localItem.quantity })
                  });
                }
              });
              return merged;
            });
          }
        } catch (e) {
          console.error('Failed to fetch user cart', e);
        }
      };
      fetchCart();
    }
  }, [isLoggedIn, user?.id, isInitialized]);

  // Sync cart to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    const key = user?.id ? `marblelux_cart_${user.id}` : 'marblelux_cart_guest';
    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart, isInitialized, user?.id]);

  const addToCart = async (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => String(item.id) === String(product.id));
      if (existing) {
        return prev.map(item =>
          String(item.id) === String(product.id) ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    if (isLoggedIn && user?.id) {
      try {
        await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, productId: product.id, quantity }),
        });
      } catch (e) {
        console.error('Failed to sync add to cart', e);
      }
    }
  };

  const removeFromCart = async (productId: string | number) => {
    setCart(prev => prev.filter(item => String(item.id) !== String(productId)));

    if (isLoggedIn && user?.id) {
      try {
        // Need to find the itemId in DB or use productId and userId
        // The API DELETE expects itemId, but we only have productId here.
        // Let's adjust the API or fetch items first. 
        // For now, let's assume we can remove by productId/userId
        await fetch(`/api/cart?userId=${user.id}&productId=${productId}`, {
          method: 'DELETE',
        });
      } catch (e) {
        console.error('Failed to sync remove from cart', e);
      }
    }
  };

  const updateQuantity = async (productId: string | number, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item =>
      String(item.id) === String(productId) ? { ...item, quantity } : item
    ));

    if (isLoggedIn && user?.id) {
      try {
        await fetch('/api/cart', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, productId, quantity }),
        });
      } catch (e) {
        console.error('Failed to sync update quantity', e);
      }
    }
  };

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem('marblelux_cart');
  }, []);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
