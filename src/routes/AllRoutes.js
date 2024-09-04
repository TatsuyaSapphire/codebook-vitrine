import { Routes, Route } from 'react-router-dom'
import { Home, DetailProduct} from '../pages'


export const AllRoutes = () => {
    return (

        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/product/:id" element={<DetailProduct/>} />
        </Routes>
    )
}