// App.js
import { useState } from 'react';
import RyzenLogo from './assets/ryzen.svg';
import './App.css';
import { Header, ProductForm, OrderInfo } from './ComponentUI';

function App() {
  const [orders, setOrders] = useState([]);

  const handleAddToOrder = (productName, productPrice, quantity) => {
    setOrders((prevOrders) => {
      
      const existingOrderIndex = prevOrders.findIndex(
        (order) => order.productName === productName
      );
  
      if (existingOrderIndex === -1) {
        
        const newOrder = { productName, productPrice, quantity };
        return [...prevOrders, newOrder];
      } else {
        
        return prevOrders;
      }
    });
  };

  const handleIncreaseQuantity = (index) => {
    const newOrders = [...orders];
    newOrders[index].quantity += 1;
    setOrders(newOrders);
  };

  const handleDecreaseQuantity = (index) => {
    const newOrders = [...orders];
    if (newOrders[index].quantity > 1) {
      newOrders[index].quantity -= 1;
      setOrders(newOrders);
    }
  };

  const handleDeleteOrder = (index) => {
    const newOrders = orders.filter((_, i) => i !== index);
    setOrders(newOrders);
  };

  return (
    <div className="App">
      <Header title="Shop for ryzen" image={RyzenLogo} />
      <ProductForm onAddToOrder={handleAddToOrder} />
      {orders.length > 0 && (
        <OrderInfo 
          orders={orders} 
          onIncreaseQuantity={handleIncreaseQuantity} 
          onDecreaseQuantity={handleDecreaseQuantity} 
          onDeleteOrder={handleDeleteOrder} 
        />
      )}
    </div>
  );
}

export default App;
