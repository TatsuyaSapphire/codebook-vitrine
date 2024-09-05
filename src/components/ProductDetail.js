import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'; // Pour récupérer les paramètres d'URL
import { getProductById } from '../data/api'; // Importer la fonction getProductById
import {SearchBar} from './SearchBar';

export const ProductDetail = () => {
    const { id } = useParams(); // Récupérer l'ID du produit depuis les paramètres d'URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const productData = await getProductById(id);
            setProduct(productData);
          } catch (error) {
            console.error('Erreur lors de la récupération du produit:', error);
          } finally {
            setLoading(false);
          }
        };

        fetchProduct();
      }, [id]);

      if (loading) {
        return <p>Chargement du produit...</p>;
      }

      if (!product) {
        return <p>Produit non trouvé</p>;
      }

    return (
        <div>
          <SearchBar/>
          <h1>{product.title}</h1>
          <p> {product.overview} </p>
          <p> {product.price} </p>
          <p> {product.long_description}</p>
          <img src={product.poster} alt='product-img'></img>
          <p>{product.rating}</p>
          <p>{product.in_stock}</p>
          <p>{product.size}</p>
          <p>{product.best_seller}</p>
          {/* Vous pouvez ajouter d'autres détails ici */}
        </div>
      );
}