import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CartPage({ cartItems, updateCartQuantity, removeFromCart }) {
  // Bootstrap popup visibility state.
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 12;
  const total = subtotal + shipping;
  const handlePlaceOrder = () => {
    setShowOrderPopup(true);
  };

  if (cartItems.length === 0) {
    return (
      <section className="text-center py-5 cart-empty">
        <h2>Your cart is empty</h2>
        <p className="text-muted">Add products from the listing page to see them here.</p>
        <Link to="/products" className="btn btn-dark">
          Go to Products
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="row g-4 align-items-start">
        <div className="col-lg-8">
          <div className="cart-items-panel p-4 rounded-4">
            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
              <h2 className="mb-0">Shopping Cart</h2>
              <span className="text-muted small">{itemCount} items</span>
            </div>

            <div className="d-flex flex-column gap-3">
              {cartItems.map(({ product, quantity }) => (
                <article key={product.id} className="cart-item-card p-3 rounded-4">
                  <div className="row g-3 align-items-center">
                    <div className="col-4 col-md-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid rounded-3 cart-product-image"
                      />
                    </div>
                    <div className="col-8 col-md-6">
                      <p className="text-success small fw-semibold mb-1">In Stock</p>
                      <h6 className="mb-1">{product.name}</h6>
                      <p className="text-muted small mb-2">Category: {product.category}</p>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary cart-qty-btn"
                          onClick={() => updateCartQuantity(product.id, quantity - 1)}
                        >
                          -
                        </button>
                        <span className="cart-qty-value">{quantity}</span>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary cart-qty-btn"
                          onClick={() => updateCartQuantity(product.id, quantity + 1)}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="btn btn-link text-danger text-decoration-none p-0 ms-2"
                          onClick={() => removeFromCart(product.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="col-md-3 text-md-end">
                      <h5 className="mb-1">${product.price * quantity}</h5>
                      <p className="mb-0 text-muted small">${product.price} each</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-end border-top mt-4 pt-3">
              <h5 className="mb-0">
                Subtotal ({itemCount} items): <strong>${subtotal.toFixed(2)}</strong>
              </h5>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card cart-summary-card border-0 rounded-4">
            <div className="card-body p-4">
              {showOrderPopup && (
                <div className="alert alert-success alert-dismissible fade show py-2" role="alert">
                  Order placed
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setShowOrderPopup(false)}
                  />
                </div>
              )}
              <p className="text-success fw-semibold mb-3">Your order is eligible for delivery.</p>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3 fw-bold">
                <span>Order Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                type="button"
                className="btn w-100 checkout-btn btn-lg"
                onClick={handlePlaceOrder}
              >
                Proceed to Checkout
              </button>
              <Link to="/products" className="btn btn-outline-dark w-100 mt-2 rounded-pill">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
