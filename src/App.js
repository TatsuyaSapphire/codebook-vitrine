import './App.css';
import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AllRoutes } from './routes/AllRoutes';
import { AuthProvider } from './components/AuthVerif'; // Importer le contexte AuthProvider
import { SearchProvider } from './components/SearchContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <SearchProvider>
            <Header/>
            <AllRoutes/>
            <Footer/>
        </SearchProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
