import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase/server';
import { onAuthStateChanged } from 'firebase/auth';
import { useSelector } from 'react-redux';

export const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const theme = useSelector(state => state.themeState.theme); // Récupérer le thème depuis l'état global

  const imgStyle ={
    width: '18rem',
  }

  // Fonction pour récupérer les commandes
  const fetchOrders = async (user) => {
    try {
      const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const userOrders = querySnapshot.docs.map((doc) => doc.data());
      setOrders(userOrders);
      setLoading(false); // Arrêter le chargement après avoir récupéré les données
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes :', error);
      setLoading(false); // Arrêter le chargement même en cas d'erreur
    }
  };

  // Utiliser onAuthStateChanged pour surveiller l'état de l'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchOrders(currentUser); // Récupérer les commandes une fois que l'utilisateur est authentifié
      } else {
        setUser(null);
        setOrders([]); // Effacer les commandes si l'utilisateur se déconnecte
        setLoading(false);
      }
    });

    // Nettoyer l'abonnement lors du démontage du composant
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Chargement des commandes...</p>;
  }

  return (
    <main className={`py-5 main-order-history ${theme === 'light' ? 'light' : 'dark'}`}> {/* Appliquer la classe de thème */}
        <h1 className="mt-3 text-decoration-underline fw-bold">Historique des commandes</h1>
      {orders.length === 0 ? (
        <p className="mt-5">Vous n'avez pas encore passé de commande.</p>
      ) : (
        <div className={`container py-5 list-group ${theme === 'light' ? 'light' : 'dark'}`}>
          {orders.map((order, index) => (
            <div key={index} className={`list-group-item ${theme === 'light' ? 'light' : 'dark'}`}>
                <div className='container d-flex justify-content-center'>
                    <p className='mx-4'><strong>Date :</strong> {new Date(order.date).toLocaleDateString()}</p>
                    <p><strong>Total :</strong> {order.total} €</p>
                </div>
                {order.items.map((item, i) => (
                    <div className='container' key={i}>
                        <div className='row border border-dark-subtle rounded mx-2 mb-2  align-items-center'>
                            <div className='col'>
                                <Link to={`/product/${item.productId}`}>
                                    <img src={item.poster} style={imgStyle} className='m-3 rounded' alt='product-img'/>
                                </Link>
                            </div>
                            <div className='col fw-bold'>
                                <p>{item.name} - {item.price}€</p>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
