import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/';


const products = axios.create({
    baseURL: BASE_URL,
    params: {
    },
});

export const getAllProducts = async () => {
    try {
        const response = await products.get('/products');
        return response.data.results;
    } catch (error){
        console.error("Erreur de récupération des produits", error);
        return [];
    }
}

// export const getPopularProducts = async () => {
//     try {
//         const response = await tmdb.get('/products/popular');
//         return response.data.results;
//     } catch (error){
//         console.error("Erreur de récupération des produits populaire", error);
//         return [];
//     }
// }

export const getDetailProducts= async (id) => {
    try {
        const response = await products.get(`/products/${id}`);
        return response.data;
    } catch (error){
        console.error("Erreur de récupération des details du produit", error);
        return [];
    }
}


