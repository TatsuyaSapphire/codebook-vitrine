import { collection, getDocs, doc , getDoc, addDoc, deleteDoc, query, where} from 'firebase/firestore';
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
    const productRef = doc(db, 'products', id);
    const productSnapshot = await getDoc(productRef);

    if (productSnapshot.exists()) {
      return { id: productSnapshot.id, ...productSnapshot.data() };
    } else {
      console.error('Produit non trouvé');
      return null;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du produit :', error);
    return null;
  }
};

export const addToCart = async (productId) => {
  if (!productId) {
    console.error("Erreur : ID du produit manquant.");
    return;
  }

  try {
    // Récupérer le produit depuis Firebase pour s'assurer qu'il existe
    const productRef = doc(db, 'products', productId);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      console.error("Le produit n'existe pas.");
      return;
    }

    const productData = productSnapshot.data();

    // Ajouter le produit au panier de l'utilisateur
    const cartRef = collection(db, `users/${auth.currentUser.uid}/cart`);
    await addDoc(cartRef, {
      ...productData,
      id: productId,
    });

    console.log('Produit ajouté au panier avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'ajout au panier :', error);
  }
};

export const removeFromCart = async (productId) => {
  if (!productId) {
    console.error("Erreur : ID du produit manquant.");
    return;
  }

  try {
    // Vérifier si l'utilisateur est connecté
    if (!auth.currentUser) {
      console.error("Erreur : Utilisateur non connecté.");
      return;
    }

    // Référence vers le panier de l'utilisateur
    const cartRef = collection(db, `users/${auth.currentUser.uid}/cart`);
    // Rechercher le produit dans le panier
    const q = query(cartRef, where('id', '==', productId));
    const querySnapshot = await getDocs(q);

    // Suppression du produit trouvé
    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        console.log('Produit retiré du panier avec succès');
      });
    } else {
      console.error("Le produit n'est pas dans le panier.");
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du panier :', error);
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