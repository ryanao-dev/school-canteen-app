
# Canteen Ordering System — Data Model & API Requirements

> **Purpose:** This document describes all data entities, relationships, and API endpoints required to power the canteen ordering system across four user roles: Student, Staff, Parent, and Principal.
>
> **Audience:** Data / Backend Engineering
>
> **Status:** Draft — based on working frontend prototype

---

## Table of Contents

1. [User Roles & Authentication](#1-user-roles--authentication)
2. [Core Entities](#2-core-entities)
3. [Entity Relationship Diagram](#3-entity-relationship-diagram)
4. [Detailed Table Schemas](#4-detailed-table-schemas)
5. [Derived / Computed Data](#5-derived--computed-data)
6. [API Endpoints by Role](#6-api-endpoints-by-role)
7. [Real-Time Requirements](#7-real-time-requirements)
8. [Enums & Constants](#8-enums--constants)
9. [Notes & Open Questions](#9-notes--open-questions)

---

## 1. User Roles & Authentication

| Role | Description | Access Level |
|------|-------------|--------------|
| `student` | Places food orders, views own history | Own orders, menu |
| `staff` | Manages kitchen queue and stock | All active orders, stock levels |
| `parent` | Monitors child's activity, sets controls | Linked child's orders, spending, controls |
| `principal` | Views aggregate reports and wellness data | All aggregate data (read-only) |

### Relationships
- A **Parent** can have 1+ linked **Students** (children)
- A **Student** can have 1+ linked **Parents**
- **Staff** members may be assigned to a station (e.g., Grill, Beverages)
- **Principal** has read-only access to aggregate data

---

## 2. Core Entities

| Entity | Description | Primary Key |
|--------|-------------|-------------|
| `users` | All system users across roles | `user_id` |
| `students` | Extended profile for student users | `user_id` (FK) |
| `menu_items` | Food/drink items available for order | `item_id` |
| `menu_item_customizations` | Available customizations per item | `customization_id` |
| `orders` | Placed orders | `order_id` |
| `order_items` | Line items within an order | `order_item_id` |
| `order_item_customizations` | Selected customizations per order item | `id` |
| `stock` | Daily stock levels per menu item | `stock_id` |
| `parental_controls` | Spending limits & restrictions per child | `control_id` |
| `wallet_transactions` | Top-ups, purchases, refunds | `transaction_id` |

---

## 3. Entity Relationship Diagram

```
users (1) ──── (1) students
  │                    │
  │                    ├──── (M) orders
  │                    │        │
  │                    │        └──── (M) order_items
  │                    │                    │
  │                    │                    └──── (M) order_item_customizations
  │                    │
  │                    └──── (1) parental_controls
  │                    │
  │                    └──── (M) wallet_transactions
  │
users (parent) ──── (M) students  [parent_student_link]

menu_items (1) ──── (M) menu_item_customizations
     │
     └──── (1) stock  [daily, per item]
```

---

## 4. Detailed Table Schemas

### 4.1 `users`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `user_id` | UUID | PK | Unique user identifier |
| `name` | VARCHAR(100) | NOT NULL | Display name |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Login email |
| `role` | ENUM | NOT NULL | `student`, `staff`, `parent`, `principal` |
| `avatar_url` | VARCHAR(500) | NULLABLE | Profile image URL |
| `created_at` | TIMESTAMP | NOT NULL | Account creation date |
| `updated_at` | TIMESTAMP | NOT NULL | Last profile update |

### 4.2 `students`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `user_id` | UUID | PK, FK → users | Student's user record |
| `grade` | VARCHAR(10) | NOT NULL | e.g., "4B" |
| `section` | VARCHAR(50) | NULLABLE | Class section |
| `wallet_balance` | DECIMAL(10,2) | NOT NULL, DEFAULT 0 | Current prepaid balance |
| `daily_spend_limit` | DECIMAL(10,2) | NOT NULL, DEFAULT 15.00 | Max daily spend |

### 4.3 `parent_student_link`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `parent_id` | UUID | FK → users | Parent user |
| `student_id` | UUID | FK → students | Linked child |
| PK: (`parent_id`, `student_id`) | | | |

### 4.4 `menu_items`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `item_id` | UUID | PK | Unique item identifier |
| `name` | VARCHAR(100) | NOT NULL | Item display name |
| `description` | TEXT | NULLABLE | Short description |
| `price` | DECIMAL(10,2) | NOT NULL | Unit price |
| `category` | ENUM | NOT NULL | `Mains`, `Snacks`, `Beverages`, `Desserts` |
| `emoji` | VARCHAR(10) | NULLABLE | Emoji visual placeholder |
| `image_url` | VARCHAR(500) | NULLABLE | Food photo URL |
| `calories` | INT | NULLABLE | Calorie count |
| `is_vegetarian` | BOOLEAN | DEFAULT false | Dietary flag |
| `allergens` | TEXT[] | NULLABLE | e.g., `['gluten', 'dairy']` |
| `prep_time_minutes` | INT | DEFAULT 10 | Average prep time |
| `is_active` | BOOLEAN | DEFAULT true | Soft delete / seasonal toggle |
| `created_at` | TIMESTAMP | NOT NULL | |
| `updated_at` | TIMESTAMP | NOT NULL | |

### 4.5 `menu_item_customizations`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `customization_id` | UUID | PK | |
| `item_id` | UUID | FK → menu_items | Parent menu item |
| `label` | VARCHAR(100) | NOT NULL | e.g., "Extra spicy", "No onions" |
| `price_modifier` | DECIMAL(10,2) | DEFAULT 0 | Additional cost (if any) |

### 4.6 `orders`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `order_id` | UUID | PK | e.g., "ORD-8492" |
| `student_id` | UUID | FK → students | Who placed the order |
| `status` | ENUM | NOT NULL | `Confirmed`, `Preparing`, `Ready`, `Picked Up`, `Cancelled` |
| `pickup_slot` | TIMESTAMP | NOT NULL | Selected pickup time |
| `total` | DECIMAL(10,2) | NOT NULL | Order total |
| `platform_fee` | DECIMAL(10,2) | DEFAULT 0.50 | Service fee |
| `staff_notes` | TEXT | NULLABLE | Kitchen notes |
| `cancel_reason` | TEXT | NULLABLE | If cancelled |
| `placed_at` | TIMESTAMP | NOT NULL | When order was submitted |
| `confirmed_at` | TIMESTAMP | NULLABLE | When kitchen accepted |
| `prep_started_at` | TIMESTAMP | NULLABLE | When cooking began |
| `ready_at` | TIMESTAMP | NULLABLE | When marked ready |
| `picked_up_at` | TIMESTAMP | NULLABLE | When student collected |

### 4.7 `order_items`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `order_item_id` | UUID | PK | |
| `order_id` | UUID | FK → orders | Parent order |
| `item_id` | UUID | FK → menu_items | Menu item ordered |
| `quantity` | INT | NOT NULL, MIN 1 | |
| `unit_price` | DECIMAL(10,2) | NOT NULL | Price at time of order |
| `line_total` | DECIMAL(10,2) | NOT NULL | quantity × unit_price |

### 4.8 `order_item_customizations`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | |
| `order_item_id` | UUID | FK → order_items | |
| `customization_id` | UUID | FK → menu_item_customizations | |
| `label` | VARCHAR(100) | NOT NULL | Denormalized for history |

### 4.9 `stock`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `stock_id` | UUID | PK | |
| `item_id` | UUID | FK → menu_items | |
| `date` | DATE | NOT NULL | Stock date |
| `daily_stock` | INT | NOT NULL | Total servings for the day |
| `remaining_stock` | INT | NOT NULL | Current remaining |
| `is_available` | BOOLEAN | DEFAULT true | Staff can manually toggle |
| `low_stock_threshold` | INT | DEFAULT 5 | Alert when below this |
| UNIQUE: (`item_id`, `date`) | | | One record per item per day |

### 4.10 `parental_controls`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `control_id` | UUID | PK | |
| `parent_id` | UUID | FK → users | Parent who set the controls |
| `student_id` | UUID | FK → students | Child being controlled |
| `daily_limit` | DECIMAL(10,2) | NOT NULL, DEFAULT 15.00 | Max daily spend |
| `weekly_limit` | DECIMAL(10,2) | NULLABLE | Optional weekly cap |
| `blocked_categories` | TEXT[] | DEFAULT '{}' | e.g., `['Desserts']` |
| `blocked_item_ids` | UUID[] | DEFAULT '{}' | Specific blocked items |
| `notify_on_order` | BOOLEAN | DEFAULT true | Alert parent on every order |
| `notify_on_limit` | BOOLEAN | DEFAULT true | Alert when limit approached |
| `updated_at` | TIMESTAMP | NOT NULL | |

### 4.11 `wallet_transactions`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `transaction_id` | UUID | PK | |
| `student_id` | UUID | FK → students | |
| `type` | ENUM | NOT NULL | `topup`, `purchase`, `refund` |
| `amount` | DECIMAL(10,2) | NOT NULL | Positive for topup/refund, negative for purchase |
| `balance_after` | DECIMAL(10,2) | NOT NULL | Running balance |
| `reference_id` | UUID | NULLABLE | FK → orders (for purchases) |
| `description` | VARCHAR(255) | NULLABLE | e.g., "Order ORD-8492" |
| `created_at` | TIMESTAMP | NOT NULL | |

---

## 5. Derived / Computed Data

These are **not stored** — they are computed via queries or materialized views for the dashboards.

### 5.1 Student Spending (Parent View)

```sql
-- Daily spend for a child
SELECT SUM(total) as daily_spend
FROM orders
WHERE student_id = :student_id
  AND DATE(placed_at) = CURRENT_DATE
  AND status != 'Cancelled';

-- Spending by category
SELECT mi.category, SUM(oi.line_total) as amount
FROM order_items oi
JOIN menu_items mi ON oi.item_id = mi.item_id
JOIN orders o ON oi.order_id = o.order_id
WHERE o.student_id = :student_id
  AND o.placed_at >= :period_start
GROUP BY mi.category;
```

### 5.2 Daily Report (Principal View)

```sql
-- Today's aggregate metrics
SELECT
  COUNT(*) as total_orders,
  SUM(total) as total_revenue,
  COUNT(DISTINCT student_id) as unique_students,
  AVG(total) as avg_order_value,
  AVG(EXTRACT(EPOCH FROM (ready_at - placed_at)) / 60) as avg_wait_minutes
FROM orders
WHERE DATE(placed_at) = CURRENT_DATE
  AND status != 'Cancelled';
```

### 5.3 Wellness Data (Principal View)

```sql
-- Category distribution
SELECT mi.category,
  ROUND(COUNT(*)::numeric / SUM(COUNT(*)) OVER () * 100) as percentage
FROM order_items oi
JOIN menu_items mi ON oi.item_id = mi.item_id
JOIN orders o ON oi.order_id = o.order_id
WHERE o.placed_at >= :period_start
GROUP BY mi.category;

-- Vegetarian percentage
SELECT
  ROUND(
    SUM(CASE WHEN mi.is_vegetarian THEN 1 ELSE 0 END)::numeric
    / COUNT(*) * 100
  ) as vegetarian_pct
FROM order_items oi
JOIN menu_items mi ON oi.item_id = mi.item_id;
```

### 5.4 Kitchen Queue (Staff View)

```sql
-- Active orders for kitchen
SELECT o.*, u.name as student_name
FROM orders o
JOIN students s ON o.student_id = s.user_id
JOIN users u ON s.user_id = u.user_id
WHERE o.status IN ('Confirmed', 'Preparing', 'Ready')
ORDER BY o.placed_at ASC;
```

---

## 6. API Endpoints by Role

### 6.1 Shared

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Authenticate user, return JWT + role |
| GET | `/auth/me` | Get current user profile |

### 6.2 Student

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/menu` | List today's available menu items (with stock status) |
| GET | `/menu/:itemId` | Get item detail with customizations |
| POST | `/orders` | Place a new order |
| GET | `/orders/active` | Get current active order (if any) |
| GET | `/orders/history` | List past orders (paginated) |
| GET | `/orders/:orderId` | Get order detail |
| GET | `/timeslots` | Get available pickup time slots |

### 6.3 Staff

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/staff/queue` | Get all active orders (Confirmed, Preparing, Ready) |
| PATCH | `/staff/orders/:orderId/status` | Update order status (`Confirmed` → `Preparing` → `Ready` → `Picked Up`) |
| GET | `/staff/stock` | Get today's stock levels for all items |
| PATCH | `/staff/stock/:itemId` | Update stock availability or remaining count |

### 6.4 Parent

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/parent/children` | List linked children |
| GET | `/parent/children/:childId/activity` | Get child's recent orders |
| GET | `/parent/children/:childId/spending?period=week` | Get spending summary for period |
| GET | `/parent/children/:childId/controls` | Get current parental controls |
| PUT | `/parent/children/:childId/controls` | Update parental controls (limits, blocks, notifications) |

### 6.5 Principal

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/principal/dashboard?date=today` | Get daily aggregate metrics |
| GET | `/principal/reports?period=week` | Get trend data (revenue, volume over time) |
| GET | `/principal/reports/categories` | Get revenue/orders by category |
| GET | `/principal/wellness` | Get wellness data (dietary distribution, calories) |
| GET | `/principal/top-items?limit=10` | Get top selling items |

---

## 7. Real-Time Requirements

| Feature | Mechanism | Description |
|---------|-----------|-------------|
| Kitchen queue updates | WebSocket / SSE | Staff sees new orders instantly as students place them |
| Order status for student | WebSocket / Polling | Student sees `Confirmed → Preparing → Ready` transitions live |
| Stock depletion | WebSocket | Menu updates when items sell out |
| Parent order notification | Push notification | Parent alerted when child places an order |

### Suggested WebSocket Channels

```
ws://api/orders/stream          → Staff: new/updated orders
ws://api/orders/:orderId/status → Student: status changes for their order
ws://api/stock/stream           → Menu: stock level changes
```

---

## 8. Enums & Constants

### Category
```
Mains | Snacks | Beverages | Desserts
```

### OrderStatus
```
Confirmed → Preparing → Ready → Picked Up
                                  ↘ Cancelled (from any state)
```

### UserRole
```
student | staff | parent | principal
```

### TransactionType
```
topup | purchase | refund
```

### Time Slot Rules
- Slots generated in **15-minute increments**
- First available slot: **15 minutes from now** (rounded up)
- Last slot: **end of canteen operating hours**
- Each slot has a **max capacity** (configurable, e.g., 20 orders)

---

## 9. Notes & Open Questions

| # | Topic | Question / Decision Needed |
|---|-------|---------------------------|
| 1 | **Authentication** | SSO integration (school system) or standalone email/password? |
| 2 | **Payment** | Wallet-only, or also support direct payment? |
| 3 | **Multi-canteen** | Single canteen for V1. Multi-canteen support needed for V2? |
| 4 | **Menu scheduling** | Daily menu set manually by staff, or recurring weekly schedule? |
| 5 | **Order modifications** | Can students modify/cancel after placing? Within what window? |
| 6 | **Stock management** | Auto-decrement on order, or manual staff updates only? |
| 7 | **Allergen enforcement** | Soft warning or hard block if student orders item with flagged allergen? |
| 8 | **Data retention** | How long to keep order history? Archival policy? |
| 9 | **Reporting frequency** | Real-time dashboards or end-of-day batch reports for principal? |
| 10 | **Notification delivery** | In-app only, or also email/SMS for parents? |

---

*Generated from the canteen ordering system prototype. All types and relationships are validated against the working frontend.*
