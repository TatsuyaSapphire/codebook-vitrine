import './App.css';
import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AllRoutes } from './routes/AllRoutes';
import {SearchBar} from './components/SearchBar';
import { SearchProvider } from './components/SearchContext';
import { AuthProvider } from './components/AuthVerif'; // Importer le contexte AuthProvider

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <SearchProvider>
          <Header/>
          <SearchBar/>
          <AllRoutes/>
          <Footer/>
        </SearchProvider>
      </AuthProvider>
    </div>
  );
}


export default App;
