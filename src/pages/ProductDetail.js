import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetail } from '../components/ProductDetail';

export const ProductMovie = () => {
  const { id } = useParams()
  return (
    <div>
      <ProductDetail id={id}/>
    </div>
  );
}