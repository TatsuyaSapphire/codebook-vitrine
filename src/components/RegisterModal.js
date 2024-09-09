import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './../firebase/server';

export const RegisterModal = ({ show, handleClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (show) {
            setName('');
            setEmail('');
            setPassword('');
            setError(null);
        }
    }, [show]); 

    // Fonction d'inscription
    const handleRegister = async () => {
        try {
            // Créer l'utilisateur avec email et mot de passe
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Mettre à jour le profil de l'utilisateur avec le nom
            await updateProfile(userCredential.user, {
                displayName: name,
            });

            // Fermer la modal après inscription réussie
            handleClose();
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            setError(error.message);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Inscription</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="form-group">
                    <label>Nom</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Votre nom"
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Votre email"
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Choisissez un mot de passe"
                    />
                </div>
                <Button variant="primary" className="mt-3 w-100" onClick={handleRegister}>
                    S'inscrire
                </Button>
            </Modal.Body>
        </Modal>
    );
};