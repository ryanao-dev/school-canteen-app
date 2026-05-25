import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useCart } from './hooks/useCart';
import { Order } from './data/mockData';
import { fetchMenuItem } from './data/api';
import { BottomNav, PageType } from './components/BottomNav';
import { MenuPage } from './pages/MenuPage';
import { ItemDetailPage } from './pages/ItemDetailPage';
import { CartPage } from './pages/CartPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { OrderHistoryPage } from './pages/OrderHistoryPage';
export function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('menu');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const cart = useCart();
  const handleItemSelect = (id: string) => {
    setSelectedItemId(id);
    fetchMenuItem(id).then(setSelectedItem).catch(console.error);
    setCurrentPage('detail');
  };
  const handlePlaceOrder = (order: Order) => {
    setActiveOrder(order);
    cart.clearCart();
    setCurrentPage('tracking');
  };
  const renderPage = () => {
    switch (currentPage) {
      case 'menu':
        return (
          <MenuPage
            key="menu"
            onItemSelect={handleItemSelect}
            onGoToCart={() => setCurrentPage('cart')}
            cartCount={cart.cartCount} />);


      case 'detail':
        if (!selectedItem) return null;
        return (
          <ItemDetailPage
            key="detail"
            item={selectedItem}
            onBack={() => setCurrentPage('menu')}
            cart={cart} />);


      case 'cart':
        return (
          <CartPage
            key="cart"
            cart={cart}
            onPlaceOrder={handlePlaceOrder}
            onBrowse={() => setCurrentPage('menu')} />);


      case 'tracking':
        return (
          <OrderTrackingPage
            key="tracking"
            order={activeOrder}
            onBackToMenu={() => setCurrentPage('menu')} />);


      case 'history':
        return <OrderHistoryPage key="history" />;
      default:
        return (
          <MenuPage
            key="menu"
            onItemSelect={handleItemSelect}
            onGoToCart={() => setCurrentPage('cart')}
            cartCount={cart.cartCount} />);


    }
  };
  return (
    <div className="w-full min-h-screen bg-background font-sans text-gray-900 selection:bg-amber-200">
      <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-2xl overflow-hidden">
        <AnimatePresence mode="wait">{renderPage()}</AnimatePresence>

        <BottomNav
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          cartCount={cart.cartCount} />
        
      </div>
    </div>);

}