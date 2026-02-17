import React from 'react';
import { Link } from 'react-router-dom';

function Footer({ compact = false }) {
  if (compact) {
    return (
      <footer className="app-footer app-footer--compact mt-auto">
        <div className="container py-2">
          <div className="footer-bottom mt-0 pt-2 text-center">
            <small className="mb-0">&copy; 2026 TechNest. All rights reserved.</small>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="app-footer mt-auto">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-6 col-lg-4">
            <h5 className="footer-brand mb-3">TechNest</h5>
            <p className="footer-text mb-3">
              Smart products, smooth checkout, and a modern shopping experience for everyday tech
              buyers.
            </p>
            <div className="d-flex gap-2">
              <a href="/" className="footer-social" aria-label="Facebook">
                <i className="bi bi-facebook" />
              </a>
              <a href="/" className="footer-social" aria-label="Instagram">
                <i className="bi bi-instagram" />
              </a>
              <a href="/" className="footer-social" aria-label="LinkedIn">
                <i className="bi bi-linkedin" />
              </a>
              <a href="/" className="footer-social" aria-label="YouTube">
                <i className="bi bi-youtube" />
              </a>
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <h6 className="footer-heading mb-3">Quick Links</h6>
            <div className="d-flex flex-column gap-2">
              <Link to="/" className="footer-link">
                Home
              </Link>
              <Link to="/products" className="footer-link">
                Products
              </Link>
              <Link to="/cart" className="footer-link">
                Cart
              </Link>
              <Link to="/auth" className="footer-link">
                Login
              </Link>
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <h6 className="footer-heading mb-3">Support</h6>
            <div className="d-flex flex-column gap-2">
              <a href="/" className="footer-link">
                Help Center
              </a>
              <a href="/" className="footer-link">
                Returns
              </a>
              <a href="/" className="footer-link">
                Shipping
              </a>
              <a href="/" className="footer-link">
                Privacy
              </a>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <h6 className="footer-heading mb-3">Contact</h6>
            <p className="mb-2 footer-contact">
              <i className="bi bi-geo-alt me-2" />
              Faisalabad, Pakistan
            </p>
            <p className="mb-2 footer-contact">
              <i className="bi bi-envelope me-2" />
              support@technest.com
            </p>
            <p className="mb-0 footer-contact">
              <i className="bi bi-telephone me-2" />
              +92 300 1234567
            </p>
          </div>
        </div>

        <div className="footer-bottom mt-4 pt-3 text-center">
          <small className="mb-0">&copy; 2026 TechNest. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
