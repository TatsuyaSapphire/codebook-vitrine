import { Routes, Route } from 'react-router-dom'
import { Home, DetailProduct} from '../pages'
import { AllProducts } from '../components/ProductAll'
// import SearchResults from '../pages/SearchResult';



export const AllRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/products" element={<AllProducts />} /> {/* Route pour la liste des produits */}
            <Route path="/product/:id" element={<DetailProduct/>} />
            {/* <Route path="/search" element={<SearchResults/>} /> */}
        </Routes>
    )
}