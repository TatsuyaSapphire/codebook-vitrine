// src/pages/Cart.jsx
import React, { useEffect, useState } from 'react';
import { getCartItems } from '../data/api';
import { useAuth } from '../contexts/AuthContext';

export const ProductCart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchCartItems = async () => {
        const items = await getCartItems();
        setCartItems(items);
      };

      fetchCartItems();
    }
  }, [user]);

  if (!user) {
    return <p>Veuillez vous connecter pour voir votre panier.</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Votre Panier</h2>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <ul className="list-group">
          {cartItems.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              {item.name}
              <span>{item.price} €</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
