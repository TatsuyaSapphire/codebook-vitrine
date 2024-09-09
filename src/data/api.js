import { collection, getDocs, doc , getDoc, addDoc, writeBatch , query, where} from 'firebase/firestore';
import { db, auth } from '../firebase/server'; // Assurez-vous que le chemin est correct


export const searchProducts = async (searchTerm) => {
  try {
    const productsCollection = collection(db, 'products');

    // Récupérer tous les produits (ou un sous-ensemble si possible)
    const snapshot = await getDocs(productsCollection);

    // Créer une expression régulière pour la recherche, sans convertir en minuscule
    const searchTermRegex = new RegExp(searchTerm, 'i'); // 'i' pour insensible à la casse

    // Filtrer les produits dont le nom contient le terme recherché
    const products = snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter(product => searchTermRegex.test(product.name));

    return products;
  } catch (error) {
    console.error('Erreur de recherche des produits:', error);
    return [];
  }
};

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
    // Vérifiez que l'utilisateur est connecté
    if (!auth.currentUser) {
      console.error("Erreur : L'utilisateur doit être connecté.");
      return;
    }

    // Récupérer les détails du produit depuis la collection "products" dans Firestore
    const productRef = doc(db, 'products', productId);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      console.error("Erreur : Le produit n'existe pas.");
      return;
    }

    const productDetails = productSnapshot.data(); // Récupérer les données du produit

    // Référence au panier de l'utilisateur dans Firestore
    const cartRef = collection(db, `users/${auth.currentUser.uid}/cart`);

    // Ajouter le produit au panier avec tous ses détails
    const docRef = await addDoc(cartRef, {
      productId: productId,
      ...productDetails, // Ajouter toutes les informations du produit récupéré
      quantity: 1  // Par défaut, ajouter avec quantité 1
    });

    console.log('Produit ajouté au panier avec succès. Document ID:', docRef.id);
    return docRef.id; // Retourner l'ID du document pour une utilisation ultérieure si nécessaire
  } catch (error) {
    console.error('Erreur lors de l\'ajout au panier :', error);
    return null;
  }
};

export const removeFromCart = async (productId) => {
  console.log("Tentative de suppression du produit ID:", productId);
  if (!productId) {
    console.error("Erreur : ID du produit manquant.");
    return;
  }

  if (!auth.currentUser) {
    console.error("Erreur : Utilisateur non connecté.");
    return;
  }

  const cartRef = collection(db, `users/${auth.currentUser.uid}/cart`);
  const q = query(cartRef, where('productId', '==', productId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const batch = writeBatch(db);
    querySnapshot.forEach((doc) => {
      console.log("Suppression du document ID:", doc.id);  // Ajout de log pour débogage
      batch.delete(doc.ref);
    });
    await batch.commit();
    console.log('Produit retiré du panier avec succès');
  } else {
    console.error("Le produit n'est pas dans le panier.");
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