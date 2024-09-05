import React from 'react';
import { auth, provider } from '../firebase/server';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/'); // Redirige vers la page d'accueil après la connexion
    } catch (error) {
      console.error('Erreur lors de la connexion avec Google :', error);
    }
  };

  return (
    <div className="container">
      <h2 className='mt-5'>Connectez-vous avec Google</h2>
      <button onClick={handleGoogleLogin} className="btn btn-primary mt-5">
        Se connecter avec Google
      </button>
    </div>
  );
};