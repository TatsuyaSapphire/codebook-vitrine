import { getDetailProducts,} from '../data/Tmdb';
import React, { useEffect, useState} from 'react';

export const ProductDetail = ({id}) => {

    const [product, setProducts] = useState(null);
    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await getDetailProducts(id);
            console.log(fetchedProduct);
            setProducts(fetchedProduct);
        };
        if (id){
            fetchProduct();
        }
    }, [id]);

    const imgStyle = {
        width: '500px',
        height:'750px'
    }


    return (
        <main className='m-5'>
            {product &&
                <section className='container'>
                        <div className='row mt-5'>
                            <div className='col'>
                            <img src={`${product.poster}`} alt={product.title} className={imgStyle} />
                            </div>
                            <div className='col text-start'>
                                <h1>{product.title}</h1>
                                <p className=''>{product.rating}</p>
                                <p className='fw-bold'>Date de sortie : {product.overview}</p>
                            </div>
                        </div>
                </section>
            }
        </main>
    );
}