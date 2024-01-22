import { React, useState } from 'react';
import Header from './Header';
import Product from './Product';
import Cart from './Cart'
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cart, setCart] = useState([]);

  const ToggleCart = () => {
    setIsCartVisible(!isCartVisible);
  }

  const handleAddProduct = (product) => {

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      const updateCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      setCart(updateCart);
    }
    else {
      setCart([...cart, { ...product, quantity: 1 }]);
      alert("Product Added")
    }
  }

  const handleRemoveProduct = (product) => {
    const updatedCart = cart.find((item) => item.id === product.id);
    if (updatedCart.quantity === 1) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart(
        cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item)
      )
    }
  }
  function convertToINR(price) {
    const conversionRate = 80;
    const inrPrice = price * conversionRate;
    return inrPrice.toFixed(2);
  }

  const myroute = createBrowserRouter([
    {
      path: "/", element: <Header cart={cart} ToggleCart={ToggleCart} setSearchTerm={setSearchTerm}
        handleAddProduct={handleAddProduct} handleRemoveProduct={handleRemoveProduct} />
    },
    // children: [
    { path: "/RegisterPage", element: <RegisterPage /> },
    { path: "/LoginPage", element: <LoginPage /> },
  ]);

  return (
    <>
      <RouterProvider router={myroute} />
      {/* <Header cart={cart} /> */}
      {isCartVisible ? (<Cart cart={cart} handleAddProduct={handleAddProduct}
        handleRemoveProduct={handleRemoveProduct} />) : (<Product searchTerm={searchTerm}
          handleAddProduct={handleAddProduct} convertToINR={convertToINR} />
      )}
    </>
  );
}

export default App;