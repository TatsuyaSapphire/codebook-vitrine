import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../firebase/server';
import { useSelector } from 'react-redux';

export const LoginModal = ({ show, handleClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const theme = useSelector(state => state.themeState.theme);

    // Connexion avec Google
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            handleClose(); // Fermer la modal après connexion réussie
        } catch (error) {
            console.error('Erreur de connexion Google:', error);
            setError(error.message);
        }
    };

    // Connexion avec email et mot de passe
    const handleEmailLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            handleClose(); // Fermer la modal après connexion réussie
        } catch (error) {
            console.error('Erreur de connexion avec email:', error);
            setError(error.message);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Connexion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <div className="alert alert-danger">{error}</div>}
                <Button variant="primary" className="mb-3 w-100" onClick={handleGoogleLogin}>
                    Se connecter avec Google
                </Button>
                <div className="text-center">ou</div>
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
                        placeholder="Votre mot de passe"
                    />
                </div>
                <Button variant="success" className="mt-3 w-100" onClick={handleEmailLogin}>
                    Se connecter avec Email/Mot de passe
                </Button>
            </Modal.Body>
        </Modal>
    );
};