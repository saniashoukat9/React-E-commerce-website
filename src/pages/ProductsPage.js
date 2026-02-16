import React from 'react';
import ProductCard from '../components/ProductCard';

function ProductsPage({ products, addToCart }) {
  return (
    <section className="products-page">
      {/* Top banner: heading + total products count */}
      <div className="products-banner rounded-4 p-4 p-md-5 mb-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div>
            <p className="section-label mb-1">Product Catalog</p>
            <h2 className="mb-1">Explore All Products</h2>
            <p className="mb-0 text-muted">
              Premium picks curated for performance and modern setups.
            </p>
          </div>
          <span className="product-count-badge">{products.length} items</span>
        </div>
      </div>

      {/* Product listing grid */}
      <div className="row g-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </section>
  );
}

export default ProductsPage;
