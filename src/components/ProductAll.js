import React, { useEffect, useState } from 'react';
import { getAllProducts, addToCart, removeFromCart, getCartItems} from '../data/api';
import { Link } from 'react-router-dom';
import Star from '../assets/etoile.png';
import '../App.css';
import { useSelector } from 'react-redux';
import { useTitle } from '../hooks/useTitle'


export const AllProducts = () => {

  useTitle('Products');

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les produits du panier
  const fetchCartItems = async () => {
    try {
      const items = await getCartItems();
      setCartItems(items.map((item) => item.id));
    } catch (error) {
      console.error('Erreur lors de la récupération des articles du panier :', error);
    }
  };
  const theme = useSelector(state => state.themeState.theme);
  const [filterDisplay, setFilterDisplay] = useState(false);

  // États pour gérer les filtres
  const [priceSort, setPriceSort] = useState("");   // Tri par prix
  const [ratingFilter, setRatingFilter] = useState("");  // Filtrage par note
  const [bestSellerOnly, setBestSellerOnly] = useState(false);  // Filtre "Best Seller"
  const [inStockOnly, setInStockOnly] = useState(false);  // Filtre "En Stock"

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    fetchCartItems();
  }, []);

  // gestion affichage menu filtres
  const toggleFilterDisplay = () => {
    setFilterDisplay(!filterDisplay);
  };

  // Fonction pour effacer les filtres
  const clearFilters = () => {
    // Décoche tous les radio buttons et checkboxes
    setPriceSort("");
    setRatingFilter("");
    setBestSellerOnly(false);
    setInStockOnly(false);
  };


  const handleCartAction = async (product) => {
    if (!product || !product.id) {
      console.error('Erreur : ID du produit manquant ou produit invalide.', product);
      return;
    }

    if (cartItems.includes(product.id)) {
      await removeFromCart(product.id);
      setCartItems(cartItems.filter((id) => id !== product.id));
    } else {
      await addToCart(product.id);
      setCartItems([...cartItems, product.id]);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<img src={Star} alt="star" key={i} style={{ width: 20, height: 20 }} />);
    }
    return stars;
  };

  // Fonction pour appliquer les filtres
  const applyFilters = () => {
    let filteredProducts = [...products];

    // Filtrer par note (rating)
    if (ratingFilter) {
      filteredProducts = filteredProducts.filter(product => product.rating >= ratingFilter);
    }

    // Filtrer par Best Seller
    if (bestSellerOnly) {
      filteredProducts = filteredProducts.filter(product => product.best_seller);
    }

    // Filtrer par stock
    if (inStockOnly) {
      filteredProducts = filteredProducts.filter(product => product.in_stock);
    }

    // Tri par prix
    if (priceSort === "lowToHigh") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (priceSort === "highToLow") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    return filteredProducts;
  };

  // Appliquer les filtres avant le rendu
  const filteredProducts = applyFilters();

  if (loading) {
    return <p>Chargement des produits...</p>;
  }

  return (
    <main className={`pt-3 pb-5 ps-5 ${theme === 'light' ? 'light' : 'dark'}`}>
      <section className="container d-flex flex-column w-75 mx-auto">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className='link-underline-primarys fw-bold'>All eBooks({filteredProducts.length})</h4>
          <button className={`burger-btn rounded me-5 ${theme === 'light' ? 'light' : 'dark'}`} onClick={toggleFilterDisplay}>
            <i className="bi bi-three-dots-vertical"></i>
          </button>
        </div>
        <div className='cardContainer'>
          <div className='row ps-3'>
            {filteredProducts.map((product) => (
              <div className='col-4 mt-5' key={product.id}>
                <div className='card'>
                  <Link to={`/product/${product.id}`}>
                    <img src={product.poster} className='card-img-top cardImg' alt='product-img' />
                  </Link>
                  <div className='card-body cardBody'>
                    <h5 className='card-title fw-bold fs-4 text-start cardTitle'>{product.name}</h5>
                    <p className='card-text text-start cardDescription'>{product.overview}</p>
                    <div style={{ display: 'flex', color: '#FFD700' }}>
                      {renderStars(product.rating)}
                    </div>
                    <div className='d-flex justify-content-between mt-4'>
                      <p className='card-text text-start fw-bold fs-4'>${product.price}</p>
                      <button className='btn btn-primary btn-sm rounded-lg' onClick={() => handleCartAction(product)}>
                      {cartItems.includes(product.id) ? 'Remove from Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className={`filter px-2 d-flex flex-column ${theme === 'light' ? 'light' : 'dark'} ${filterDisplay ? 'filterVisible' : 'filterInvisible'}`}>
            <div className="d-flex justify-content-between align-items-center  pt-3">
              <h5>FILTERS</h5>
              <button className={`filter-close rounded px-2 pt-1 ${theme === 'light' ? 'light' : 'dark'}`} onClick={toggleFilterDisplay}><h5>X</h5></button>
            </div>
            <div className="border-bottom pb-3"></div>
            <div className="py-4 overflow-y-auto">
              <ul className="p-0 m-0 d-flex flex-column justify-content-start align-items-start">
                <li className="p-0 m-0">
                  <p className="text-start fw-bold m-0">Sort By</p>
                  <div className="d-flex align-items-center m-0">
                    <input type="radio" name="price-sort" value="lowToHigh" className="me-1" id="price-sort-1" checked={priceSort === "lowToHigh"}
                            onChange={() => setPriceSort("lowToHigh")}></input>
                    <label htmlFor="price-sort-1" className="pb-1">Price - Low to High</label>
                  </div>
                  <div className="d-flex align-content-center">
                    <input type="radio" name="price-sort" value="highTolow" className="me-1" id="price-sort-2" checked={priceSort === "highToLow"}
                            onChange={() => setPriceSort("highToLow")}></input>
                    <label htmlFor="price-sort-2" className="pb-1">Price - High to Low</label>
                  </div>
                </li>
                <li className="p-0 mt-3">
                  <p className="text-start fw-bold m-0">Rating</p>
                  <div className="d-flex align-items-center m-0">
                    <input type="radio" name="rating-sort" value="4" className="me-1" id="rating-sort-1" checked={ratingFilter === "4"}
                            onChange={() => setRatingFilter("4")}></input>
                    <label htmlFor="rating-sort-1" className="pb-1">4 stars & Above</label>
                  </div>
                  <div className="d-flex align-content-center">
                    <input type="radio" name="rating-sort" value="3" className="me-1" id="rating-sort-2" checked={ratingFilter === "3"}
                            onChange={() => setRatingFilter("3")}></input>
                    <label htmlFor="rating-sort-2" className="pb-1">3 stars & Above</label>
                  </div>
                  <div className="d-flex align-content-center">
                    <input type="radio" name="rating-sort" value="2" className="me-1" id="rating-sort-3" checked={ratingFilter === "2"}
                            onChange={() => setRatingFilter("2")}></input>
                    <label htmlFor="rating-sort-3" className="pb-1">2 stars & Above</label>
                  </div>
                  <div className="d-flex align-content-center">
                    <input type="radio" name="rating-sort" value="1" className="me-1" id="rating-sort-4" checked={ratingFilter === "1"}
                            onChange={() => setRatingFilter("1")}></input>
                    <label htmlFor="rating-sort-4" className="pb-1">1 star & Above</label>
                  </div>
                </li>
                <li className="p-0 mt-3">
                  <p className="text-start fw-bold m-0">Other Filters</p>
                  <div className="d-flex align-items-center m-0">
                    <input type="checkbox" name="best-seller-sort" checked={bestSellerOnly}
                            onChange={() => setBestSellerOnly(!bestSellerOnly)} className="me-1"></input>
                    <label htmlFor="best-seller-sort" className="pb-1">Best Seller Only</label>
                  </div>
                  <div className="d-flex align-content-center">
                    <input type="checkbox" name="instock-sort" checked={inStockOnly}
                            onChange={() => setInStockOnly(!inStockOnly)} className="me-1"></input>
                    <label htmlFor="instock-sort" className="pb-1">INSTOCK Only</label>
                  </div>
                </li>
                <li className="p-0 mt-3">
                  <p type="button" className={`px-5 py-2 ms-2 filter-clear rounded ${theme === 'light' ? 'light' : 'dark'}`} onClick={clearFilters}>Clear Filter</p>
                </li>
              </ul>
            </div>
      </section>
    </main>
  );
};