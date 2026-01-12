import { useState } from 'react';
import { POSHeader, CategoryList, ProductGrid, InvoicePanel } from '../components';

export function POS({ onSwitchToAdmin }) {
  const [selectedCategory, setSelectedCategory] = useState(6); // Tất cả
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    if (product.stock === 0) return;
    
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      handleUpdateQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== productId));
    } else {
      const product = cartItems.find(item => item.id === productId);
      if (product && newQuantity <= product.stock) {
        setCartItems(
          cartItems.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    alert(`Thanh toán thành công! Tổng cộng: ${cartItems.length} sản phẩm`);
    setCartItems([]);
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-white overflow-hidden">
      <POSHeader onAdminClick={onSwitchToAdmin} />

      <div className="flex flex-1 overflow-hidden w-full">
        <CategoryList selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        <ProductGrid selectedCategory={selectedCategory} onAddToCart={handleAddToCart} />
        <InvoicePanel
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}
