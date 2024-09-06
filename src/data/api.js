import { collection, getDocs, doc, setDoc , getDoc, addDoc, updateDoc, arrayRemove } from 'firebase/firestore';
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
  if (!auth.currentUser) {
    console.error('Utilisateur non connecté. Veuillez vous connecter pour modifier votre panier.');
    return;
  }

  try {
    // Référence à la collection des utilisateurs
    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    
    // Référence au document "cartItems" du panier
    const cartDocRef = doc(userDocRef, 'cartItems', 'items');

    // Vérifiez si le document "cartItems" existe
    const cartDocSnapshot = await getDoc(cartDocRef);

    if (cartDocSnapshot.exists()) {
      // Document existe, mettre à jour en retirant le produit
      await updateDoc(cartDocRef, {
        items: arrayRemove(productId)
      });
    } else {
      // Document n'existe pas, créer un nouveau document avec un tableau vide
      await setDoc(cartDocRef, {
        items: [] // Crée un document avec un tableau vide si le document n'existe pas
      });
      console.log('Panier initialisé. Aucun produit trouvé à supprimer.');
    }

    console.log('Produit supprimé du panier avec succès');
  } catch (error) {
    console.error('Erreur lors de la suppression du produit du panier :', error);
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