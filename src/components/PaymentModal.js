import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase/server'; // Assurez-vous que Firebase est bien configuré

export const PaymentModal = ({ show, handleClose, cartItems, totalPrice, clearCart }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiration: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) {
        console.error('Utilisateur non authentifié.');
        return;
      }

      // 1. Enregistrer la commande dans Firestore
      const orderData = {
        userId: user.uid,
        items: cartItems,
        total: totalPrice,
        date: new Date().toISOString(), // Date de la commande
      };
      await addDoc(collection(db, 'orders'), orderData);

      // 2. Vider le panier dans Firestore
      const cartRef = collection(db, `users/${user.uid}/cart`);
      const cartSnapshot = await getDocs(cartRef);

      const batchDeletePromises = cartSnapshot.docs.map((docItem) =>
        deleteDoc(doc(db, `users/${user.uid}/cart`, docItem.id))
      );

      await Promise.all(batchDeletePromises);

      // 3. Vider le panier localement en appelant clearCart()
      clearCart();

      console.log('Commande enregistrée et panier vidé avec succès');
      handleClose(); // Fermer le modal
    } catch (error) {
      console.error('Erreur lors de la soumission de la commande :', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Paiement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCardNumber">
            <Form.Label>Numéro de carte</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez le numéro de carte"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCardName">
            <Form.Label>Nom sur la carte</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom complet"
              name="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formExpiration">
            <Form.Label>Date d'expiration</Form.Label>
            <Form.Control
              type="text"
              placeholder="MM/AA"
              name="expiration"
              value={formData.expiration}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCvv">
            <Form.Label>CVV</Form.Label>
            <Form.Control
              type="text"
              placeholder="CVV"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Payer {totalPrice.toFixed(2)} €
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};