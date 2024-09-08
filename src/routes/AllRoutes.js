import { Routes, Route } from 'react-router-dom'
import { Home, DetailProduct, Cart, AllProducts} from '../pages'
import {SearchResults} from '../components/SearchResult';
import {OrderHistory} from '../components/OrderHistory';

export const AllRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/products" element={<AllProducts />} /> {/* Route pour la liste des produits */}
            <Route path="/product/:id" element={<DetailProduct/>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-history" element={<OrderHistory />} />
        </Routes>
    )
}