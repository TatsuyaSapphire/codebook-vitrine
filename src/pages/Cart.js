import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/server';
import { collection, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const user = auth.currentUser;
  const theme = useSelector(state => state.themeState.theme);

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

  return (
    <main className={`py-5 ${theme === 'light' ? 'light' : 'dark'}`}>
      <div className="container my-5 h-100 container-cart">
        {user ? (
          <>
            <h3>Votre Panier</h3>
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
          </>
        ) : ( 
          <>
            <h1>Veuillez vous connecter pour voir votre panier.</h1>
          </>
        )}
      </div>
    </main>
    
  );
};