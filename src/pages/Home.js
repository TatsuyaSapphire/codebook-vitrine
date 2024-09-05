import React from 'react';
import { ProductHome } from '../components/ProductHome';
import { useNavigate } from 'react-router-dom';


export const Home =() =>{
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/products'); // Redirige vers la liste des produits
  };


  return(
    <main>
      <section className="container d-flex flex-row justify-content-center mt-5 mb-5">
        <div className="text-start my-5">
          <h1 className="text-5xl font-bold mb-4">The Ultimate eBook Store</h1>
          <p>CodeBook is the world's most popular and authoritative source for computer science ebooks. Find ratings and access to the newest books digitally.</p>
          <a type="button" onClick={handleRedirect} className="text-white btn btn-primary py-2 px-4">Explore eBooks</a>
        </div>
        <div>
          <img className="rounded mx-auto d-block" width="576" height="384" src="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=60" alt="CodeBook Hero Section">
          </img>
        </div>
      </section>
      <ProductHome/>
      <section className='mt-5'>
          <h1 className='text-decoration-underline fs-4 fw-bold'>Student About CodeBook</h1>
          <div className='container mt-5'>
            <div className='row'>
              <div className='col border border-light-subtle rounded-top'>
                <figure>
                  <blockquote>
                  <h3>Very easy this was to integrate</h3>
                  <p>If you care for your time, I hands down would go with this."</p>
                  </blockquote>
                  <figcaption className='d-flex flex-row justify-content-center'>
                  <img className='rounded-circle' alt='test' src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=50'></img>
                    <div>
                      <div>Bonnie Green</div>
                      <div>Developer at Random AI</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
              <div className='col border border-light-subtle rounded-top'>
                <figure>
                  <blockquote>
                  <h3>Very easy this was to integrate</h3>
                  <p>If you care for your time, I hands down would go with this."</p>
                  </blockquote>
                  <figcaption className='d-flex flex-row justify-content-center'>
                  <img className='rounded-circle' alt='test' src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=50'></img>
                    <div>
                      <div>Bonnie Green</div>
                      <div>Developer at Random AI</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className='row'>
            <div className='col border border-light-subtle rounded-bottom'>
                <figure>
                  <blockquote>
                  <h3>Very easy this was to integrate</h3>
                  <p>If you care for your time, I hands down would go with this."</p>
                  </blockquote>
                  <figcaption className='d-flex flex-row justify-content-center'>
                  <img className='rounded-circle' alt='test' src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=50'></img>
                    <div>
                      <div>Bonnie Green</div>
                      <div>Developer at Random AI</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
              <div className='col border border-light-subtle rounded-bottom'>
                <figure>
                  <blockquote>
                  <h3>Very easy this was to integrate</h3>
                  <p>If you care for your time, I hands down would go with this."</p>
                  </blockquote>
                  <figcaption className='d-flex flex-row justify-content-center'>
                  <img className='rounded-circle' alt='test' src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=50'></img>
                    <div>
                      <div>Bonnie Green</div>
                      <div>Developer at Random AI</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
      </section>
      <section>
        <div className='container mt-5 border border-light-subtle rounded'>
            <h4 className='my-4'>Question in mind</h4>
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                  Accordion Item #1
                </button>
              </h2>
              <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                <div className="accordion-body text-start">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus earum dicta nesciunt, nulla alias consequuntur cumque incidunt saepe mollitia esse! Magni praesentium delectus excepturi nostrum illo repellendus cum eius neque, aperiam dolores quaerat quis dolore magnam doloremque minus sint nemo qui necessitatibus at. Perspiciatis, corrupti cum labore quos odio porro!
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                  Accordion Item #2
                </button>
              </h2>
              <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                <div className="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                  Accordion Item #3
                </button>
              </h2>
              <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

