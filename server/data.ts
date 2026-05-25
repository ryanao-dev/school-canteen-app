import { MenuItem, Order } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Grilled Chicken Rice',
    description: 'Tender grilled chicken breast served with fragrant jasmine rice and steamed veggies.',
    price: 8.5,
    category: 'Mains',
    emoji: '🍗',
    customizations: ['Extra spicy', 'No onions', 'Extra sauce', 'Less rice']
  },
  {
    id: 'm2',
    name: 'Veggie Wrap',
    description: 'Crispy falafel, fresh greens, and hummus wrapped in a warm tortilla.',
    price: 7.0,
    category: 'Mains',
    emoji: '🌯',
    customizations: ['No onions', 'Extra hummus', 'Spicy mayo', 'Gluten-free wrap']
  },
  {
    id: 'm3',
    name: 'Pasta Bolognese',
    description: 'Classic Italian pasta with rich, slow-cooked beef and tomato ragu.',
    price: 9.0,
    category: 'Mains',
    emoji: '🍝',
    customizations: ['Extra cheese', 'Chili flakes', 'Gluten-free pasta']
  },
  {
    id: 'm4',
    name: 'Fish & Chips',
    description: 'Crispy battered cod served with thick-cut fries and tartar sauce.',
    price: 10.5,
    category: 'Mains',
    emoji: '🐟',
    customizations: ['Extra tartar sauce', 'Malt vinegar', 'No salt on fries']
  },
  {
    id: 's1',
    name: 'Samosa',
    description: 'Crispy pastry filled with spiced potatoes and peas. Served with mint chutney.',
    price: 2.5,
    category: 'Snacks',
    emoji: '🥟',
    customizations: ['Extra chutney', 'Extra spicy']
  },
  {
    id: 's2',
    name: 'Spring Rolls',
    description: 'Vegetable-filled crispy rolls served with sweet chili dipping sauce.',
    price: 3.0,
    category: 'Snacks',
    emoji: '🍱',
    customizations: ['Extra sweet chili sauce']
  },
  {
    id: 's3',
    name: 'Classic Fries',
    description: 'Golden, crispy potato fries seasoned with sea salt.',
    price: 3.5,
    category: 'Snacks',
    emoji: '🍟',
    customizations: ['No salt', 'Spicy seasoning', 'Side of mayo', 'Side of ketchup']
  },
  {
    id: 'b1',
    name: 'Iced Latte',
    description: 'Smooth espresso poured over cold milk and ice.',
    price: 4.0,
    category: 'Beverages',
    emoji: '☕',
    customizations: ['Oat milk', 'Almond milk', 'Less ice', 'Extra shot', 'Vanilla syrup']
  },
  {
    id: 'b2',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed sweet oranges.',
    price: 3.5,
    category: 'Beverages',
    emoji: '🧃',
    customizations: ['No ice']
  },
  {
    id: 'b3',
    name: 'Masala Chai',
    description: 'Aromatic spiced tea brewed with milk.',
    price: 2.5,
    category: 'Beverages',
    emoji: '🍵',
    customizations: ['Less sugar', 'Extra strong']
  },
  {
    id: 'd1',
    name: 'Fudge Brownie',
    description: 'Rich, gooey chocolate brownie with chocolate chunks.',
    price: 3.0,
    category: 'Desserts',
    emoji: '🍫',
    customizations: ['Warm it up']
  },
  {
    id: 'd2',
    name: 'Fresh Fruit Bowl',
    description: 'Seasonal mixed fruits including berries, melon, and grapes.',
    price: 4.5,
    category: 'Desserts',
    emoji: '🍓',
    customizations: ['No melon', 'Add honey drizzle']
  }
];

export const orders: Order[] = [
  {
    id: 'ORD-8492',
    date: 'Today, 10:30 AM',
    items: [
      { id: '1', menuItemName: 'Iced Latte', quantity: 1, price: 4.0, customizations: ['Oat milk'], emoji: '☕' },
      { id: '2', menuItemName: 'Fudge Brownie', quantity: 1, price: 3.0, customizations: [], emoji: '🍫' }
    ],
    total: 7.0,
    status: 'Picked Up',
    estimatedTime: '10:45 AM'
  },
  {
    id: 'ORD-8421',
    date: 'Yesterday, 12:15 PM',
    items: [
      { id: '3', menuItemName: 'Grilled Chicken Rice', quantity: 1, price: 8.5, customizations: ['Extra spicy'], emoji: '🍗' },
      { id: '4', menuItemName: 'Fresh Orange Juice', quantity: 1, price: 3.5, customizations: [], emoji: '🧃' }
    ],
    total: 12.0,
    status: 'Picked Up',
    estimatedTime: '12:30 PM'
  }
];
