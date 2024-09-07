import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/server';
import { collection, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { removeFromCart } from '../data/api';

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const user = auth.currentUser; // Make sure this is updating as expected
  const theme = useSelector(state => state.themeState.theme);

  const imgStyle = {
    width: '14rem',
  };

  const handleRemoveFromCart = async (productId) => {
    if (!productId) {
      console.error("Attempted to remove an item without a valid product ID.");
      return;
    }
    await removeFromCart(productId);
    setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
  };

  const fetchCartItems = async () => {
    if (!user) {
      console.log("No user logged in.");
      return;
    }
    try {
      const cartRef = collection(db, `users/${user.uid}/cart`);
      const cartSnapshot = await getDocs(cartRef);
      const items = cartSnapshot.docs.map(doc => {
        console.log("Fetched item:", doc.data()); // Log to see what is being fetched
        return { id: doc.id, ...doc.data() };
      });
      setCartItems(items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]); // Ensures fetchCartItems runs when user changes

  return (
    <main className={`py-5 ${theme === 'light' ? 'light' : 'dark'}`}>
      <h2 className='text-decoration-underline'>Votre Panier</h2>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <section className="container">
          {cartItems.map(item => (
            <div key={item.id} className="d-flex flex-wrap justify-content-between border-bottom mb-5 p-2">
              <div className='d-flex'>
                <img className='ml-2 rounded' style={imgStyle} alt={item.name} src={item.poster} />
                <div>
                  <p className='ms-2'>{item.name}</p>
                  <button className='text-danger' onClick={() => handleRemoveFromCart(item.productId)}>
                    Remove
                  </button>
                </div>
              </div>
              <div>
                <span className='fs-5'>{item.price} €</span>
              </div>
            </div>
          ))}
          <div>
            <p className='fw-bold fs-4 mt-5'>Total Amount:</p>
          </div>
          <div className='modal-dialog modal-lg'>Place Order</div>
        </section>
      )}
    </main>
  );
};