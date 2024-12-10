import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

// Create Cart Context
export const CartContext = createContext();

// Create CartProvider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Calculate the total number of items in the cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product, quantity, size, color) => {
    const newProduct = {
      productID: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      size,
      color,
    };

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(
      (item) =>
        item.id === product.id && item.size === size && item.color === color
    );

    if (existingProductIndex >= 0) {
      // Update the quantity of the existing product
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      // Add the new product to the cart
      setCart((prevCart) => [...prevCart, newProduct]);
    }
  };

  // Retrieve the cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // Store the cart in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // const removeFromCart = (productID, size, color) => {
  //   setCart((prevCart) =>
  //     prevCart.filter(
  //       (item) =>
  //         item.productID !== productID ||
  //         item.size !== size ||
  //         item.color !== color
  //     )
  //   );
  // };
  const removeFromCart = async (productID, size, color, quantity) => {
    console.log(quantity);
    try {
      // Make an API call to release the reserved stock
      await axios.patch(`http://localhost:3000/plants/${productID}/release`, {
        quantity,
      });

      // Update the cart state
      setCart((prevCart) =>
        prevCart.filter(
          (item) =>
            item.productID !== productID ||
            item.size !== size ||
            item.color !== color
        )
      );

      alert("Item removed from the cart and stock updated.");
    } catch (error) {
      console.error("Error releasing the stock:", error);
      alert("Failed to update the stock. Please try again.");
    }
  };

  const updateProductQuantity = (productID, size, color, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productID === productID &&
        item.size === size &&
        item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateProductQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart context
export const useCart = () => {
  return useContext(CartContext);
};
