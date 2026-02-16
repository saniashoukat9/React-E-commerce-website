import React from 'react';
import { Link, useParams } from 'react-router-dom';

function ProductDetailsPage({ getProductById, addToCart }) {
  // URL se id read karte hain: /products/:id
  const { id } = useParams();
  const product = getProductById(id);
  if (!product) {
    return (
      <section>
        <h2>Product Not Found</h2>
        <p className="text-muted">The product you are trying to view does not exist.</p>
        <Link to="/products" className="btn btn-dark">
          Back to Products
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="row g-4 align-items-center">
        {/* Left side: product image */}
        <div className="col-md-6">
          <div className="product-details-image-wrap rounded-4">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded-4 product-details-image"
            />
          </div>
        </div>

        {/* Right side: product info + actions */}
        <div className="col-md-6">
          <small className="text-muted">{product.category}</small>
          <h2 className="mt-2">{product.name}</h2>
          <p className="mb-2 text-muted">Rating: {product.rating}/5</p>
          <h4 className="my-3">${product.price}</h4>
          <p>{product.description}</p>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-dark" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
            <Link to="/cart" className="btn btn-outline-dark">
              View Cart
            </Link>
            <Link to="/products" className="btn btn-outline-secondary back-products-btn">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;
