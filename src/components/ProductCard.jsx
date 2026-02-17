import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product, addToCart }) {
  return (
    // Bootstrap grid column: mobile par 2 cards, large par 3 cards.
    <div className="col-sm-6 col-lg-4">
      <div className="card h-100 border-0 product-card">
        <img src={product.image} alt={product.name} className="card-img-top product-image" />
        <div className="card-body d-flex flex-column">
          <small className="card-category">{product.category}</small>
          <h5 className="card-title mt-2">{product.name}</h5>
          <p className="mb-2 text-muted small">Rating: {product.rating}/5</p>
          <p className="card-text fw-semibold mb-4">${product.price}</p>
          <div className="d-flex gap-2 mt-auto">
            {/* Product details route: /products/:id */}
            <Link
              to={`/products/${product.id}`}
              className="btn btn-outline-dark rounded-pill px-3"
            >
              Details
            </Link>
            {/* Parent se mila addToCart callback call karte hain. */}
            <button
              type="button"
              className="btn btn-dark rounded-pill px-3"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
