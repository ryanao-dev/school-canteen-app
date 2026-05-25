import { MenuItem, Order } from './mockData';

const BASE_URL = 'http://localhost:3001';

export async function fetchMenu(): Promise<MenuItem[]> {
  const res = await fetch(`${BASE_URL}/menu`);
  if (!res.ok) throw new Error('Failed to fetch menu');
  return res.json();
}

export async function fetchMenuItem(itemId: string): Promise<MenuItem> {
  const res = await fetch(`${BASE_URL}/menu/${itemId}`);
  if (!res.ok) throw new Error('Item not found');
  return res.json();
}

export async function placeOrder(
  items: { itemId: string; quantity: number; customizations: string[] }[],
  pickupTime: string
): Promise<Order> {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items, pickupTime })
  });
  if (!res.ok) throw new Error('Failed to place order');
  return res.json();
}

export async function fetchOrderHistory(): Promise<Order[]> {
  const res = await fetch(`${BASE_URL}/orders/history`);
  if (!res.ok) throw new Error('Failed to fetch order history');
  return res.json();
}
