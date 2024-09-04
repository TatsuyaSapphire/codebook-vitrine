import { Routes, Route } from 'react-router-dom'
import { Home, MoviePopular, MovieTopRated, MovieUpComing, DetailMovie, ResultsPage} from '../pages'


export const AllRoutes = () => {
    return (
    
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/popularmovie" element={<MoviePopular />} />
            <Route path="/topratedmovie" element={<MovieTopRated />} />
            <Route path="/upcomingmovie" element={<MovieUpComing />} />
            <Route path="/movie/:id" element={<DetailMovie />} />
            <Route path="/results" element={<ResultsPage/>} />
        </Routes>
    )
}