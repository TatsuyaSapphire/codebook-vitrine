import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/server';
import { collection, getDocs } from 'firebase/firestore';

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const user = auth.currentUser;

  const imgStyle = {
    width: '14rem',
  }

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
    <main className="mt-5">
      <h2 className='text-decoration-underline'>Votre Panier</h2>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <section className="container">
          {cartItems.map(item => (
            <div key={item.id} className="d-flex d-flex-row flex-wrap justify-content-between border-bottom m-auto p-2 mb-5">
              <div className='d-flex'>
                <img className=' ml-2 rounded' style={imgStyle}  alt={item.name} src={item.poster}></img>
                <div className=''>
                  <a>
                    <p className='ms-2'>{item.name}</p>
                  </a>
                  <span className=' text-danger text-decoration-none'>Remove</span>
                </div>
              </div>
              <div>
                <span className='fs-5'>{item.price} €</span>
              </div>
            </div>
          ))}
          <div>
            <p className='border-bottom fw-bold fs-4 text-start mt-5'>Total Amount:</p>
          </div>

            <div className='modal-dialog modal-lg'>Place Order</div>

        </section>
      )}
    </main>
  );
};