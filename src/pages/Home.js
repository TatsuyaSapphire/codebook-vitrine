import React from 'react';
import { ProductHome } from '../components/ProductHome';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTitle } from '../hooks/useTitle'


export const Home =() =>{

  useTitle('Home');

  const navigate = useNavigate();
  const theme = useSelector(state => state.themeState.theme);

  const handleNavigateToProducts = () => {
    navigate('/products'); // Redirige vers la page de tous les produits
  };

  return(
    <main className={`py-5 ${theme === 'light' ? 'light' : 'dark'}`}>
      <section className="container d-flex flex-row justify-content-center mb-5" id="intro-home">
        <div className="text-start my-5" id="title-home">
          <h1 className="display-5 font-bold mb-4 textAnim">The Ultimate eBook Store</h1>
          <p className="h4 mb-4 pe-3">CodeBook is the world's most popular and authoritative source for computer science ebooks. Find ratings and access to the newest books digitally.</p>
          <button type="button" onClick={handleNavigateToProducts} className="text-white btn btn-primary py-2 px-4 mt-2">Explore eBooks</button>
        </div>
        <div>
          <img className="rounded mx-auto d-block" width="576" height="384" src="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=60" alt="CodeBook Hero Section">
          </img>
        </div>
      </section>
      <ProductHome/>
      <section className='container my-5 px-0' id="student-section">
          <h1 className='text-decoration-underline fs-4 fw-bold'>Student About CodeBook</h1>
          <div className='mt-3 d-flex flex-wrap align-content-start' id="students-home">
            <figure className="py-5 w-50 m-0">
              <blockquote className="px-5">
                <h4 className="fw-bold">Very easy this was to integrate</h4>
                <p>If you care for your time, I hands down would go with this."</p>
              </blockquote>
              <figcaption className='d-flex flex-row justify-content-center mt-5'>
                <img className='rounded-circle' alt='test' src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=50'></img>
                <div className='text-start'>
                  <div className="info-student">Bonnie Green</div>
                  <div className="info-student-job">Developer at Random AI</div>
                </div>
              </figcaption>
            </figure>
            <figure className="py-5 w-50 m-0">
              <blockquote className="px-5">
                <h4 className="fw-bold">Solid foundation for any project</h4>
                <p>Designing with Figma components that can be easily translated to the utility classes of Tailwind CSS is a huge timesaver!"</p>
              </blockquote>
              <figcaption className='d-flex flex-row justify-content-center mt-5'>
                <img className='rounded-circle' alt='test' src='https://images.unsplash.com/photo-1525085475165-c6808cdb005e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=50'></img>
                <div className='text-start'>
                  <div className="info-student">Roberta Casas</div>
                  <div className="info-student-job">Lead designer at Random</div>
                </div>
              </figcaption>
            </figure>
            <figure className="py-5 w-50 m-0">
              <blockquote className="px-5">
                <h4 className="fw-bold">Mindblowing workflow</h4>
                <p>Aesthetically, the well designed components are beautiful and will undoubtedly level up your next application."</p>
              </blockquote>
              <figcaption className='d-flex flex-row justify-content-center mt-5'>
                <img className='rounded-circle' alt='test' src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=60'></img>
                <div className='text-start'>
                  <div className="info-student">Jese Leos</div>
                  <div className="info-student-job">Software Engineer at Random</div>
                </div>
              </figcaption>
            </figure>
            <figure className="py-5 w-50 m-0">
              <blockquote className="px-5">
                <h4 className="fw-bold">Efficient Collaborating</h4>
                <p>You have many examples that can be used to create a fast prototype for your team."</p>
              </blockquote>
              <figcaption className='d-flex flex-row justify-content-center mt-5'>
                <img className='rounded-circle' alt='test' src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=60'></img>
                <div className='text-start'>
                  <div className="info-student">Joseph McFall</div>
                  <div className="info-student-job">CTO at Random</div>
                </div>
              </figcaption>
            </figure>
          </div>
      </section>
      <section className="container my-10 rounded shadow-sm mx-auto accordion-container" id="accordion-section">
        <div className='py-5 px-4'>
          <h3><span className="border-bottom pb-3">Question in mind ?</span></h3>
          <div className="accordion mt-5 accordion-flush" id="accordionPanelsStayOpenExample">
            <div className={`accordion-item ${theme === 'light' ? 'light' : 'dark'}`}>
              <h2 className="accordion-header">
                <button className={`accordion-button collapsed ${theme === 'light' ? 'light text-dark' : 'dark text-white'}`} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                  <span className={`h5 ${theme === 'light' ? 'text-dark' : 'text-white'}`}>Why should I use CodeBook?</span>
                </button>
              </h2>
              <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse">
                <div className="accordion-body text-start">
                  <p className={`h5 ${theme === 'light' ? 'text-dark' : 'p-grey'}`}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus earum dicta nesciunt, nulla alias consequuntur cumque incidunt saepe mollitia esse! Magni praesentium delectus excepturi nostrum illo repellendus cum eius neque, aperiam dolores quaerat quis dolore magnam doloremque minus sint nemo qui necessitatibus at. Perspiciatis, corrupti cum labore quos odio porro!</p>
                </div>
              </div>
            </div>
            <div className={`accordion-item ${theme === 'light' ? 'light' : 'dark'}`}>
              <h2 className="accordion-header">
                <button className={`accordion-button collapsed ${theme === 'light' ? 'light' : 'dark'}`} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                  <span className={`h5 ${theme === 'light' ? 'text-dark' : 'text-white'}`}>Can I access my eBook on mobile?</span>
                </button>
              </h2>
              <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                <div className="accordion-body text-start">
                  <p className={`h5 ${theme === 'light' ? 'text-dark' : 'p-grey'}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. At accusamus nobis tempore perferendis qui, quam, atque reprehenderit vero quaerat, assumenda pariatur eveniet. Maxime eaque, neque corrupti ad minus repudiandae consectetur!</p>
                </div>
              </div>
            </div>
            <div className={`accordion-item ${theme === 'light' ? 'light' : 'dark'}`}>
              <h2 className="accordion-header">
                <button className={`accordion-button collapsed ${theme === 'light' ? 'light' : 'dark'}`} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                  <span className={`h5 ${theme === 'light' ? 'text-dark' : 'text-white'}`}>Do you offer refunds?</span>
                </button>
              </h2>
              <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                <div className="accordion-body text-start">
                  <p className={`h5 ${theme === 'light' ? 'text-dark' : 'p-grey'}`}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse iste dolor deserunt expedita quam fugit et inventore amet pariatur. Animi.</p>
                </div>
              </div>
            </div>
            <div className={`accordion-item ${theme === 'light' ? 'light' : 'dark'}`}>
              <h2 className="accordion-header">
                <button className={`accordion-button collapsed ${theme === 'light' ? 'light' : 'dark'}`} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                  <span className={`h5 ${theme === 'light' ? 'text-dark' : 'text-white'}`}>Do you support Internation payments?</span>
                </button>
              </h2>
              <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse">
                <div className="accordion-body text-start">
                  <p className={`h5 ${theme === 'light' ? 'text-dark' : 'p-grey'}`}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse iste dolor deserunt expedita quam fugit et inventore amet pariatur. Animi.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

