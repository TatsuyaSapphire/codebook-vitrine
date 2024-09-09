import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/server';
import { collection, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { useTitle } from '../hooks/useTitle'
import { removeFromCart } from '../data/api';
import {PaymentModal} from '../components/PaymentModal'; // Importer le modal

export const Cart = () => {

  useTitle('Cart');

  const [cartItems, setCartItems] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false); // État pour gérer l'ouverture du modal
  const user = auth.currentUser;
  const theme = useSelector(state => state.themeState.theme);

  const imgStyle = { width: '14rem' };

  const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);

  const handleRemoveFromCart = async (productId) => {
    await removeFromCart(productId);
    setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
  };

  const fetchCartItems = async () => {
    if (!user) return;
    try {
      const cartRef = collection(db, `users/${user.uid}/cart`);
      const cartSnapshot = await getDocs(cartRef);
      setCartItems(cartSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Fonction pour vider le panier localement
  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  return (
    <main className={`py-5 ${theme === 'light' ? 'light' : 'dark'}`}>
        <div className='container-cart'>
        <h1 className="text-decoration-underline mb-5">Votre Panier</h1>
        {cartItems.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <section className="container">
            {cartItems.map(item => (
              <div key={item.id} className="d-flex flex-wrap justify-content-between border-bottom mb-5 p-2">
                <div className="d-flex align-items-center">
                  <img className="ml-2 rounded" style={imgStyle} alt={item.name} src={item.poster} />
                  <div className="ms-2">
                    <p className="mb-1">{item.name}</p>
                    <span
                      className="text-danger"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleRemoveFromCart(item.productId)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
                <div>
                  <p className="fs-5">{item.price} €</p>
                </div>
              </div>
            ))}
            <div className="mt-5">
              <p className="fw-bold fs-4">Total Amount: {totalPrice.toFixed(2)} €</p>
              <button className="btn btn-primary" onClick={() => setShowPaymentModal(true)}>Passer la commande</button>
            </div>
          </section>
        )}

        {/* Affichage du modal de paiement */}
        <PaymentModal
          show={showPaymentModal}
          handleClose={() => setShowPaymentModal(false)}
          cartItems={cartItems}
          totalPrice={totalPrice}
          clearCart={clearCart} // Passer la fonction clearCart au modal
        />
      </div>
    </main>
  );
};
