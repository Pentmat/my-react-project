// ComponentUI.jsx
import React, { useState } from 'react';
import './App.css';

// Header Component
export function Header({ title, image }) {
  return (
    <header className="header">
      {image && <img src={image} alt="logo" className="header-logo" />}
      <h1>{title}</h1>
    </header>
  );
}

// ProductForm Component
export function ProductForm({ onAddToOrder }) {
  const productNames = [
    'AMD Ryzen 9 9950X, AM5, 4.3 GHz, 16-Core, WOF',
    'AMD Ryzen 9 9900X, AM5, 4.4 GHz, 12-Core, WOF',
    'AMD Ryzen 7 9700X, AM5, 3.8 GHz, 8-Core, WOF',
    'AMD Ryzen 5 9600X, AM5, 3.9 GHz, 6-Core, WOF',
  ];
  const productPrices = [741.90, 561.90, 411.90, 321.90];

  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleProductChange = (e) => {
    setSelectedProductIndex(Number(e.target.value));
  };

  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleSubtractQuantity = () => {
    setQuantity(Math.max(1, quantity - 1)); // Ensure quantity doesn't go below 1
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantity < 1) return; // Ensure quantity is valid
    const productName = productNames[selectedProductIndex];
    const productPrice = productPrices[selectedProductIndex];
    onAddToOrder(productName, productPrice, quantity);
    setQuantity(1); // Reset quantity after adding
  };

  return (
    <div className="product-form">
      <h2>Add Product to Order</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td><label htmlFor="product-select">Product:</label></td>
              <td>
                <select id="product-select" value={selectedProductIndex} onChange={handleProductChange}>
                  {productNames.map((name, index) => (
                    <option key={index} value={index}>
                      {name} - €{productPrices[index].toFixed(2)}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td><label>Quantity:</label></td>
              <td>
                <div className="quantity-controls">
                  <button type="button" onClick={handleSubtractQuantity} aria-label="Decrease quantity">-</button>
                  <span>{quantity}</span>
                  <button type="button" onClick={handleAddQuantity} aria-label="Increase quantity">+</button>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <button type="submit" className="submit-button">Add to Order</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

// OrderInfo Component
export function OrderInfo({ orders, onIncreaseQuantity, onDecreaseQuantity, onDeleteOrder }) {
  const totalOrderPrice = orders.reduce((total, order) => total + (order.productPrice * order.quantity), 0);

  return (
    <div className="order-info">
      <h2>Order Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price (€)</th>
            <th>Quantity</th>
            <th>Total Price (€)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-orders">No items in the order.</td>
            </tr>
          ) : (
            orders.map((order, index) => (
              <tr key={index}>
                <td>{order.productName}</td>
                <td>€{order.productPrice.toFixed(2)}</td>
                <td>{order.quantity}</td>
                <td>€{(order.productPrice * order.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => onIncreaseQuantity(index)} className="action-button" aria-label={`Increase quantity of ${order.productName}`}>+</button>
                  <button onClick={() => onDecreaseQuantity(index)} className="action-button" aria-label={`Decrease quantity of ${order.productName}`}>-</button>
                  <button onClick={() => onDeleteOrder(index)} className="action-button delete-button" aria-label={`Delete ${order.productName}`}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <h3 className="total-price">Total Order Price: €{totalOrderPrice.toFixed(2)}</h3>
    </div>
  );
}

// Main Component for managing state and logic
export default function ComponentUI() {
  const [orders, setOrders] = useState([]);

  // Handlers for ProductForm actions
  const handleAddToOrder = (productName, productPrice, quantity) => {
    // Check if the product already exists in the orders
    const existingOrderIndex = orders.findIndex(order => order.productName === productName);

    if (existingOrderIndex !== -1) {
      // If the product exists, update its quantity
      const updatedOrders = [...orders];
      updatedOrders[existingOrderIndex].quantity += quantity; // Increase quantity by the amount added
      setOrders(updatedOrders);
    } else {
      // If it's a new product, add to orders
      const newOrder = { productName, productPrice, quantity };
      setOrders([...orders, newOrder]);
    }
  };

  const handleIncreaseQuantity = (index) => {
    const updatedOrders = [...orders];
    updatedOrders[index].quantity += 1;
    setOrders(updatedOrders);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedOrders = [...orders];
    if (updatedOrders[index].quantity > 1) {
      updatedOrders[index].quantity -= 1;
      setOrders(updatedOrders);
    }
  };

  const handleDeleteOrder = (index) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
  };

  return (
    <div>
      <Header title="Product Order Page" />
      <ProductForm onAddToOrder={handleAddToOrder} />
      <OrderInfo
        orders={orders}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
        onDeleteOrder={handleDeleteOrder}
      />
    </div>
  );
}
