import React from 'react';
import { addToCart } from '../data/api';

export const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <img src={product.imageUrl} alt={product.name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <button className="btn btn-primary" onClick={() => addToCart(product)}>
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};