import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'; // Pour récupérer les paramètres d'URL
import { getProductById } from '../data/api'; // Importer la fonction getProductById
import Star from '../assets/etoile.png'

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

      const renderStars = (rating) => {
        const stars = [];
        // Boucle pour afficher le nombre d'étoiles en fonction du rating
        for (let i = 0; i < rating; i++) {
          stars.push(<img src={Star} alt="star" key={i} style={{ width: 20, height: 20 }} />);
        }
        return stars;
      };

    return (
        <section>
          <h1>{product.name}</h1>
          <p className='fw-bold'> {product.overview} </p>
          <div className='container'>
            <div className='row mt-5'>
              <div className='col'>
                <img src={product.poster}></img>
              </div>
              <div className='col text-start'>
                <p className='fw-bold fs-3'> €{product.price} </p>
                <p>{renderStars(product.rating)}</p>
                <div className='mb-2'>
                  <span className='badge text-bg-light text-success fs-6 p-2'>{product.inStock ? 'En stock' : 'Rupture Stock'}</span>
                  {product.best_seller && (
                  <span className="badge text-bg-light text-warning fw-bold p-2 fs-6 mx-2">Bestseller</span> // Badge "Bestseller" si applicable
                  )}
                  {product.size && (
                  <span className="badge text-bg-light text-primary p-2 fs-6 mx-2">{product.size}MB</span> // Affichage de la taille
                  )}
                </div>
                <div>
                  <button class="py-2 px-3 text-white fw-bold fs-6 btn btn-primary btn-sm rounded-lg mb-2">Add To Cart <i>+</i></button>
                </div>
                <p className='fw-bold'> {product.long_description}</p>
              </div>
            </div>
          </div>
          {/* Vous pouvez ajouter d'autres détails ici */}
        </section>
      );
}