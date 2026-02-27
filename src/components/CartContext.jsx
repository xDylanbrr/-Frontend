import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('miCarrito');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('miCarrito', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find(
        item => item.id === product.id && item.formato === product.formato
      );
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && item.formato === product.formato
            ? { ...item, cantidad: item.cantidad + (product.cantidad || 1) }
            : item
        );
      }
      return [...prev, { ...product, instanceId: Date.now(), cantidad: product.cantidad || 1 }];
    });
  };

  const updateQuantity = (instanceId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prev) => prev.map(item => 
      item.instanceId === instanceId ? { ...item, cantidad: newQuantity } : item
    ));
  };

  const removeFromCart = (instanceId) => {
    setCart((prev) => prev.filter(item => item.instanceId !== instanceId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // ESTA ES LA FUNCIÓN QUE FALTABA O NO SE HABÍA GUARDADO
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.cantidad), 0);
  };

  // AQUÍ LA EXPORTAMOS PARA QUE LOS DEMÁS ARCHIVOS LA PUEDAN USAR
  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      getCartTotal, 
      updateQuantity 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}