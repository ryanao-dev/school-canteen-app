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

export type UserRole = 'student' | 'staff' | 'parent' | 'principal';

export interface StaffOrder extends Order {
  studentName: string;
  pickupSlot: string;
  placedAt: string;
}

export interface StockItem {
  menuItemId: string;
  name: string;
  emoji: string;
  category: Category;
  dailyStock: number;
  remainingStock: number;
  isAvailable: boolean;
}

export interface ChildActivity {
  orderId: string;
  date: string;
  items: {name: string;emoji: string;price: number;category: Category;}[];
  total: number;
}

export interface SpendingSummary {
  period: string;
  totalSpent: number;
  orderCount: number;
  byCategory: {category: string;amount: number;percentage: number;}[];
}

export interface ParentalControl {
  dailyLimit: number;
  currentDailySpend: number;
  blockedCategories: Category[];
  notifyOnOrder: boolean;
}

export interface DailyReport {
  date: string;
  totalRevenue: number;
  totalOrders: number;
  uniqueStudents: number;
  avgOrderValue: number;
  avgWaitMinutes: number;
  topItems: {name: string;emoji: string;quantity: number;revenue: number;}[];
  categoryBreakdown: {category: string;orders: number;revenue: number;}[];
  hourlyOrders: {hour: string;count: number;}[];
}

export interface WellnessData {
  vegetarianPercentage: number;
  avgCaloriesPerOrder: number;
  categoryDistribution: {category: string;percentage: number;}[];
  topHealthyItems: {name: string;emoji: string;orderCount: number;}[];
  topIndulgentItems: {name: string;emoji: string;orderCount: number;}[];
}

export const CATEGORIES: Category[] = [
'All',
'Mains',
'Snacks',
'Beverages',
'Desserts'];


export const MENU_ITEMS: MenuItem[] = [
{
  id: 'm1',
  name: 'Grilled Chicken Rice',
  description:
  'Tender grilled chicken breast served with fragrant jasmine rice and steamed veggies.',
  price: 8.5,
  category: 'Mains',
  emoji: '🍗',
  customizations: ['Extra spicy', 'No onions', 'Extra sauce', 'Less rice']
},
{
  id: 'm2',
  name: 'Veggie Wrap',
  description:
  'Crispy falafel, fresh greens, and hummus wrapped in a warm tortilla.',
  price: 7.0,
  category: 'Mains',
  emoji: '🌯',
  customizations: [
  'No onions',
  'Extra hummus',
  'Spicy mayo',
  'Gluten-free wrap']

},
{
  id: 'm3',
  name: 'Pasta Bolognese',
  description:
  'Classic Italian pasta with rich, slow-cooked beef and tomato ragu.',
  price: 9.0,
  category: 'Mains',
  emoji: '🍝',
  customizations: ['Extra cheese', 'Chili flakes', 'Gluten-free pasta']
},
{
  id: 'm4',
  name: 'Fish & Chips',
  description:
  'Crispy battered cod served with thick-cut fries and tartar sauce.',
  price: 10.5,
  category: 'Mains',
  emoji: '🐟',
  customizations: ['Extra tartar sauce', 'Malt vinegar', 'No salt on fries']
},
{
  id: 's1',
  name: 'Samosa',
  description:
  'Crispy pastry filled with spiced potatoes and peas. Served with mint chutney.',
  price: 2.5,
  category: 'Snacks',
  emoji: '🥟',
  customizations: ['Extra chutney', 'Extra spicy']
},
{
  id: 's2',
  name: 'Spring Rolls',
  description:
  'Vegetable-filled crispy rolls served with sweet chili dipping sauce.',
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
  customizations: [
  'No salt',
  'Spicy seasoning',
  'Side of mayo',
  'Side of ketchup']

},
{
  id: 'b1',
  name: 'Iced Latte',
  description: 'Smooth espresso poured over cold milk and ice.',
  price: 4.0,
  category: 'Beverages',
  emoji: '☕',
  customizations: [
  'Oat milk',
  'Almond milk',
  'Less ice',
  'Extra shot',
  'Vanilla syrup']

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
}];


export const MOCK_PAST_ORDERS: Order[] = [
{
  id: 'ORD-8492',
  date: 'Today, 10:30 AM',
  items: [
  {
    id: '1',
    menuItemName: 'Iced Latte',
    quantity: 1,
    price: 4.0,
    customizations: ['Oat milk'],
    emoji: '☕'
  },
  {
    id: '2',
    menuItemName: 'Fudge Brownie',
    quantity: 1,
    price: 3.0,
    customizations: [],
    emoji: '🍫'
  }],

  total: 7.0,
  status: 'Picked Up',
  estimatedTime: '10:45 AM'
},
{
  id: 'ORD-8421',
  date: 'Yesterday, 12:15 PM',
  items: [
  {
    id: '3',
    menuItemName: 'Grilled Chicken Rice',
    quantity: 1,
    price: 8.5,
    customizations: ['Extra spicy'],
    emoji: '🍗'
  },
  {
    id: '4',
    menuItemName: 'Fresh Orange Juice',
    quantity: 1,
    price: 3.5,
    customizations: [],
    emoji: '🧃'
  }],

  total: 12.0,
  status: 'Picked Up',
  estimatedTime: '12:30 PM'
},
{
  id: 'ORD-8310',
  date: 'Mon, 1:00 PM',
  items: [
  {
    id: '5',
    menuItemName: 'Veggie Wrap',
    quantity: 2,
    price: 7.0,
    customizations: ['No onions'],
    emoji: '🌯'
  }],

  total: 14.0,
  status: 'Picked Up',
  estimatedTime: '1:15 PM'
}];


export const MOCK_STAFF_ORDERS: StaffOrder[] = [
{
  id: 'ORD-8501',
  studentName: 'Alex Johnson',
  date: 'Today',
  placedAt: '11:45 AM',
  pickupSlot: '12:00 PM',
  status: 'Confirmed',
  estimatedTime: '12:00 PM',
  total: 12.5,
  items: [
  {
    id: '1',
    menuItemName: 'Grilled Chicken Rice',
    quantity: 1,
    price: 8.5,
    customizations: ['Extra spicy'],
    emoji: '🍗'
  },
  {
    id: '2',
    menuItemName: 'Iced Latte',
    quantity: 1,
    price: 4.0,
    customizations: ['Oat milk'],
    emoji: '☕'
  }]

},
{
  id: 'ORD-8502',
  studentName: 'Sarah Smith',
  date: 'Today',
  placedAt: '11:48 AM',
  pickupSlot: '12:00 PM',
  status: 'Confirmed',
  estimatedTime: '12:00 PM',
  total: 7.0,
  items: [
  {
    id: '3',
    menuItemName: 'Veggie Wrap',
    quantity: 1,
    price: 7.0,
    customizations: ['No onions'],
    emoji: '🌯'
  }]

},
{
  id: 'ORD-8499',
  studentName: 'Mike Davis',
  date: 'Today',
  placedAt: '11:30 AM',
  pickupSlot: '11:45 AM',
  status: 'Preparing',
  estimatedTime: '11:45 AM',
  total: 9.0,
  items: [
  {
    id: '4',
    menuItemName: 'Pasta Bolognese',
    quantity: 1,
    price: 9.0,
    customizations: ['Extra cheese'],
    emoji: '🍝'
  }]

},
{
  id: 'ORD-8500',
  studentName: 'Emma Wilson',
  date: 'Today',
  placedAt: '11:32 AM',
  pickupSlot: '11:45 AM',
  status: 'Preparing',
  estimatedTime: '11:45 AM',
  total: 6.5,
  items: [
  {
    id: '5',
    menuItemName: 'Classic Fries',
    quantity: 1,
    price: 3.5,
    customizations: ['Side of mayo'],
    emoji: '🍟'
  },
  {
    id: '6',
    menuItemName: 'Fudge Brownie',
    quantity: 1,
    price: 3.0,
    customizations: [],
    emoji: '🍫'
  }]

},
{
  id: 'ORD-8497',
  studentName: 'James Brown',
  date: 'Today',
  placedAt: '11:15 AM',
  pickupSlot: '11:30 AM',
  status: 'Ready',
  estimatedTime: '11:30 AM',
  total: 10.5,
  items: [
  {
    id: '7',
    menuItemName: 'Fish & Chips',
    quantity: 1,
    price: 10.5,
    customizations: ['Malt vinegar'],
    emoji: '🐟'
  }]

},
{
  id: 'ORD-8498',
  studentName: 'Lily Taylor',
  date: 'Today',
  placedAt: '11:20 AM',
  pickupSlot: '11:30 AM',
  status: 'Ready',
  estimatedTime: '11:30 AM',
  total: 4.5,
  items: [
  {
    id: '8',
    menuItemName: 'Fresh Fruit Bowl',
    quantity: 1,
    price: 4.5,
    customizations: [],
    emoji: '🍓'
  }]

}];


export const MOCK_STOCK: StockItem[] = MENU_ITEMS.map((item, index) => ({
  menuItemId: item.id,
  name: item.name,
  emoji: item.emoji,
  category: item.category,
  dailyStock: 50,
  remainingStock: index === 3 ? 0 : index === 1 ? 4 : 50 - index * 3, // Fish & Chips sold out, Veggie Wrap low
  isAvailable: index !== 3
}));

export const MOCK_CHILD_ACTIVITY: ChildActivity[] = [
{
  orderId: 'ORD-8492',
  date: 'Today, 10:30 AM',
  total: 7.0,
  items: [
  { name: 'Iced Latte', emoji: '☕', price: 4.0, category: 'Beverages' },
  { name: 'Fudge Brownie', emoji: '🍫', price: 3.0, category: 'Desserts' }]

},
{
  orderId: 'ORD-8421',
  date: 'Yesterday, 12:15 PM',
  total: 12.0,
  items: [
  {
    name: 'Grilled Chicken Rice',
    emoji: '🍗',
    price: 8.5,
    category: 'Mains'
  },
  {
    name: 'Fresh Orange Juice',
    emoji: '🧃',
    price: 3.5,
    category: 'Beverages'
  }]

},
{
  orderId: 'ORD-8310',
  date: 'Mon, 1:00 PM',
  total: 14.0,
  items: [
  { name: 'Veggie Wrap', emoji: '🌯', price: 7.0, category: 'Mains' },
  { name: 'Veggie Wrap', emoji: '🌯', price: 7.0, category: 'Mains' }]

}];


export const MOCK_SPENDING: SpendingSummary = {
  period: 'This Week',
  totalSpent: 33.0,
  orderCount: 3,
  byCategory: [
  { category: 'Mains', amount: 22.5, percentage: 68 },
  { category: 'Beverages', amount: 7.5, percentage: 23 },
  { category: 'Desserts', amount: 3.0, percentage: 9 },
  { category: 'Snacks', amount: 0, percentage: 0 }]

};

export const MOCK_PARENTAL_CONTROLS: ParentalControl = {
  dailyLimit: 15.0,
  currentDailySpend: 7.0,
  blockedCategories: [],
  notifyOnOrder: true
};

export const MOCK_DAILY_REPORT: DailyReport = {
  date: 'Today',
  totalRevenue: 845.5,
  totalOrders: 112,
  uniqueStudents: 98,
  avgOrderValue: 7.55,
  avgWaitMinutes: 8.2,
  topItems: [
  { name: 'Grilled Chicken Rice', emoji: '🍗', quantity: 34, revenue: 289.0 },
  { name: 'Classic Fries', emoji: '🍟', quantity: 45, revenue: 157.5 },
  { name: 'Iced Latte', emoji: '☕', quantity: 28, revenue: 112.0 }],

  categoryBreakdown: [
  { category: 'Mains', orders: 65, revenue: 540.5 },
  { category: 'Snacks', orders: 82, revenue: 215.0 },
  { category: 'Beverages', orders: 45, revenue: 145.0 },
  { category: 'Desserts', orders: 22, revenue: 78.0 }],

  hourlyOrders: [
  { hour: '10:00', count: 12 },
  { hour: '11:00', count: 45 },
  { hour: '12:00', count: 85 },
  { hour: '13:00', count: 32 },
  { hour: '14:00', count: 15 }]

};

export const MOCK_WELLNESS: WellnessData = {
  vegetarianPercentage: 42,
  avgCaloriesPerOrder: 650,
  categoryDistribution: [
  { category: 'Mains', percentage: 45 },
  { category: 'Snacks', percentage: 25 },
  { category: 'Beverages', percentage: 20 },
  { category: 'Desserts', percentage: 10 }],

  topHealthyItems: [
  { name: 'Fresh Fruit Bowl', emoji: '🍓', orderCount: 45 },
  { name: 'Veggie Wrap', emoji: '🌯', orderCount: 38 }],

  topIndulgentItems: [
  { name: 'Classic Fries', emoji: '🍟', orderCount: 82 },
  { name: 'Fudge Brownie', emoji: '🍫', orderCount: 56 }]

};