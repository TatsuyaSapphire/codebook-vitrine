import { collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/server'; // Assurez-vous que le chemin est correct

// Fonction pour récupérer tous les produits
export const getAllProducts = async () => {
  try {
    const productsCollection = collection(db, 'products');
    const snapshot = await getDocs(productsCollection);
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return products;
  } catch (error) {
    console.error('Erreur de récupération des produits:', error);
    return [];
  }
};

export const getFeaturedProducts = async () => {
  try {
    const productsCollection = collection(db, 'featured_products');
    const snapshot = await getDocs(productsCollection);
    const featured_products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return featured_products;
  } catch (error) {
    console.error('Erreur de récupération des produits:', error);
    return [];
  }
};

// Fonction pour récupérer un produit par son ID
export const getProductById = async (id) => {
  try {
    const productDoc = doc(db, 'products', id);
    const snapshot = await getDoc(productDoc);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      throw new Error('Produit non trouvé');
    }
  } catch (error) {
    console.error('Erreur de récupération du produit:', error);
    return null;
  }
};

export const addToCart = async (product) => {
  const user = auth.currentUser;

  // Vérifie si l'utilisateur est connecté
  if (!user) {
    alert("Vous devez être connecté pour ajouter des produits au panier.");
    return;
  }

  try {
    // Référence au panier de l'utilisateur dans Firestore
    const cartRef = collection(db, 'users', user.uid, 'cart');
    await addDoc(cartRef, product);
    alert("Produit ajouté au panier !");
  } catch (error) {
    console.error("Erreur lors de l'ajout au panier : ", error);
  }
};

// Fonction pour récupérer les produits du panier
export const getCartItems = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  try {
    const cartRef = collection(db, 'users', user.uid, 'cart');
    const cartSnapshot = await getDocs(cartRef);
    return cartSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erreur lors de la récupération du panier : ", error);
    return [];
  }
};