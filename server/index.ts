import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import swaggerUi from 'swagger-ui-express';
import { MENU_ITEMS, orders } from './data';
import { Order, OrderItem } from './types';

const app = express();
app.use(cors());
app.use(express.json());

const swaggerDoc = YAML.parse(fs.readFileSync(path.join(__dirname, 'openapi.yaml'), 'utf8'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// GET /menu — list all menu items
app.get('/menu', (req, res) => {
  res.json(MENU_ITEMS);
});

// GET /menu/:itemId — single item detail
app.get('/menu/:itemId', (req, res) => {
  const item = MENU_ITEMS.find(i => i.id === req.params.itemId);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

// POST /orders — place a new order
app.post('/orders', (req, res) => {
  const { items, pickupTime } = req.body as {
    items: { itemId: string; quantity: number; customizations: string[] }[];
    pickupTime: string;
  };

  if (!items?.length) {
    return res.status(400).json({ error: 'Order must contain at least one item' });
  }

  const orderItems: OrderItem[] = [];
  let total = 0;

  for (const line of items) {
    const menuItem = MENU_ITEMS.find(i => i.id === line.itemId);
    if (!menuItem) return res.status(404).json({ error: `Item ${line.itemId} not found` });

    const lineTotal = menuItem.price * line.quantity;
    total += lineTotal;
    orderItems.push({
      id: `${Date.now()}-${line.itemId}`,
      menuItemName: menuItem.name,
      quantity: line.quantity,
      price: menuItem.price,
      customizations: line.customizations ?? [],
      emoji: menuItem.emoji
    });
  }

  const order: Order = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true }),
    items: orderItems,
    total: parseFloat(total.toFixed(2)),
    status: 'Confirmed',
    estimatedTime: pickupTime ?? '15 mins'
  };

  orders.unshift(order);
  res.status(201).json(order);
});

// GET /orders/history — past orders
app.get('/orders/history', (req, res) => {
  res.json(orders);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Canteen API running at http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/docs`);
});
