export type Category = 'All' | 'Mains' | 'Snacks' | 'Beverages' | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  emoji: string;
  customizations: string[];
}

export type OrderStatus = 'Confirmed' | 'Preparing' | 'Ready' | 'Picked Up';

export interface OrderItem {
  id: string;
  menuItemName: string;
  quantity: number;
  price: number;
  customizations: string[];
  emoji: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  estimatedTime: string;
}
