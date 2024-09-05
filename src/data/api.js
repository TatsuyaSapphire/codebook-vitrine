import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/server'; // Assurez-vous que le chemin est correct

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