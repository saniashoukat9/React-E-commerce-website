import React from 'react';
import { Link } from 'react-router-dom';

function HomePage({ products, addToCart }) {

  const featuredProducts = products.slice(0, 3);

  return (
    <>
      {/* Hero section */}
      <section className="hero-section rounded-4 p-4 p-md-5 text-white mb-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <p className="text-uppercase small mb-2 hero-kicker">Welcome to TechNest</p>
            <h1 className="display-5 fw-bold">Explore Tech Products </h1>
            <p className="lead mt-3 mb-4">
              Explore trending tech products, smooth navigation, and an interactive cart built
              with React, Bootstrap, and reusable components.
            </p>
            <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-lg-start">
              <Link to="/products" className="btn btn-warning btn-lg">
                Browse Products
              </Link>
            </div>
          </div>
          <div className="col-lg-5">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
              alt="Woman shopping with bags"
              className="hero-side-image w-100 rounded-4 shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="about-section rounded-4 p-4 p-md-5 mb-5">
        <div className="row g-4 align-items-center">
          <div className="col-lg-7">
            <p className="section-label mb-2">About TechNest</p>
            <h3 className="mb-3">Your Trusted Space for Modern Tech Shopping</h3>
            <p className="mb-2 text-muted">
              TechNest is designed as a clean and user-friendly e-commerce experience where
              customers can discover quality tech products quickly on desktop, tablet, and mobile.
            </p>
            <p className="mb-0 text-muted">
              This website highlights reusable React components, responsive layouts, and practical
              UI patterns used in real-world MERN projects.
            </p>
          </div>
          <div className="col-lg-5">
            <div className="about-box p-4 rounded-4">
              <h5 className="mb-3">What TechNest Offers</h5>
              <ul className="mb-0 ps-3">
                <li>Easy product discovery</li>
                <li>Clean cart management</li>
                <li>Responsive page structure</li>
                <li>Dashboard-ready architecture</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products section */}
      <section className="featured-section">
        <div className="section-heading d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <div>
            <p className="section-label mb-1">Featured Collection</p>
            <h3 className="mb-0">Top Picks for You</h3>
          </div>
          <Link to="/products" className="btn btn-dark">
            See All Products
          </Link>
        </div>
        <div className="row g-4">
          {featuredProducts.map((product) => (
            <div className="col-md-6 col-lg-4" key={product.id}>
              <div className="card h-100 border-0 shadow-sm featured-card">
                <img src={product.image} alt={product.name} className="card-img-top featured-image" />
                <div className="card-body d-flex flex-column">
                  <small className="text-muted">{product.category}</small>
                  <h5 className="card-title mt-1">{product.name}</h5>
                  <p className="mb-2 text-muted small">Rating: {product.rating}/5</p>
                  <p className="card-text fw-semibold mb-3">${product.price}</p>
                  <div className="mt-auto d-flex flex-wrap gap-2">
                    <button type="button" className="btn btn-dark" onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                    <Link to="/cart" className="btn btn-outline-dark">
                      View Cart
                    </Link>
                    <Link to={`/products/${product.id}`} className="btn btn-outline-dark">
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customers review cards */}
      <section className="customer-reviews-section mt-5">
        <div className="text-center mb-4">
          <h3 className="mb-0">Customers Review</h3>
        </div>
        <div className="row g-4">
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm review-card">
              <div className="card-body text-center p-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
                  alt="Ayesha Khan"
                  className="rounded-circle mb-3 border border-3 border-warning"
                  width="78"
                  height="78"
                />
                <div className="text-warning mb-2">
                  <i className="bi bi-star-fill me-1" />
                  <i className="bi bi-star-fill me-1" />
                  <i className="bi bi-star-fill me-1" />
                  <i className="bi bi-star-fill me-1" />
                  <i className="bi bi-star-fill" />
                </div>
                <p className="text-muted mb-3">
                  "The UI is super smooth on mobile and desktop. Shopping experience feels clean and
                  fast."
                </p>
                <h6 className="mb-0">Ayesha Khan</h6>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm review-card">
              <div className="card-body text-center p-4">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
                  alt="Usman Ali"
                  className="rounded-circle mb-3 border border-3 border-warning"
                  width="78"
                  height="78"
                />
                <div className="text-warning mb-2">
                  <i className="bi bi-star-fill me-1" />
                  <i className="bi bi-star-fill me-1" />
                  <i className="bi bi-star-fill me-1" />
                  <i className="bi bi-star-fill me-1" />
                  <i className="bi bi-star-fill" />
                </div>
                <p className="text-muted mb-3">
                  "I liked the cart flow and checkout layout. It looks close to a real e-commerce
                  website."
                </p>
                <h6 className="mb-0">Usman Ali</h6>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm review-card">
              <div className="card-body text-center p-4">
                <img
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80"
                  alt="Sara Ahmed"
                  className="rounded-circle mb-3 border border-3 border-warning"
                  width="78"
                  height="78"
                />
                <div className="text-warning mb-2">
                  <i className="bi bi-star-fill me-1" />
                  <i className="bi bi-star-fill me-1" />
                  <i className="bi bi-star-fill me-1" />
                  <i className="bi bi-star-fill me-1" />
                  <i className="bi bi-star-fill" />
                </div>
                <p className="text-muted mb-3">
                  "Dashboard and product pages are well structured. Great example of reusable React
                  components."
                </p>
                <h6 className="mb-0">Sara Ahmed</h6>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
