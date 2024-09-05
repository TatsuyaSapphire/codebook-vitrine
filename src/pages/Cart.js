import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/server';
import { collection, getDocs } from 'firebase/firestore';

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchCartItems = async () => {
        try {
          const cartRef = collection(db, 'users', user.uid, 'cart');
          const cartSnapshot = await getDocs(cartRef);
          const items = cartSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCartItems(items);
        } catch (error) {
          console.error("Erreur lors de la récupération du panier : ", error);
        }
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
          {cartItems.map(item => (
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