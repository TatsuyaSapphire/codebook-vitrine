import './App.css';
import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AllRoutes } from './routes/AllRoutes';
import {SearchBar} from './components/SearchBar';
import { SearchProvider } from './components/SearchContext';

function App() {
  return (
    <div className="App">
        <SearchProvider>
          <Header/>
          <SearchBar/>
          <AllRoutes/>
          <Footer/>
        </SearchProvider>
    </div>
  );
}


export default App;
