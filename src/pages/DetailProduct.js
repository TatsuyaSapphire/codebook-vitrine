import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetail } from '../components/ProductDetail';
import { useTitle } from '../hooks/useTitle'

export const DetailProduct = () => {
  const { id } = useParams()
  useTitle('Product Detail');
  return (
    <div>
      <ProductDetail id={id}/>
    </div>
  );
}