import { useState, useMemo } from 'react';
import { MenuItem } from '../data/mockData';

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customizations: string[];
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (
  menuItem: MenuItem,
  quantity: number,
  customizations: string[]) =>
  {
    setCartItems((prev) => {
      // Check if identical item (same id and customizations) exists
      const existingIndex = prev.findIndex(
        (item) =>
        item.menuItem.id === menuItem.id &&
        JSON.stringify(item.customizations.sort()) ===
        JSON.stringify(customizations.sort())
      );

      if (existingIndex >= 0) {
        const newItems = [...prev];
        newItems[existingIndex].quantity += quantity;
        return newItems;
      }

      return [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        menuItem,
        quantity,
        customizations
      }];

    });
  };

  const removeItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
    prev.map((item) => {
      if (item.id === cartItemId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.menuItem.price * item.quantity,
      0
    );
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  return {
    cartItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount
  };
}

export type UseCartReturn = ReturnType<typeof useCart>;