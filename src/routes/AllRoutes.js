import { Routes, Route } from 'react-router-dom'
import { Home, DetailProduct, Login, Cart} from '../pages'
import { AllProducts } from '../components/ProductAll'



export const AllRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/products" element={<AllProducts />} /> {/* Route pour la liste des produits */}
            <Route path="/login" element={<Login />} /> {/* Route vers la page de connexion */}
            <Route path="/product/:id" element={<DetailProduct/>} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    )
}