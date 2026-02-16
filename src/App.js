import React, { useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { products } from './data/products';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AuthPage from './pages/AuthPage';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductsPage from './pages/ProductsPage';
import './styles/styles.css';

const ADMIN_PRODUCTS_STORAGE_KEY = 'technest_admin_products';

function App() {
  // BrowserRouter app ke poore routes ko enable karta hai.
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const [productCatalog, setProductCatalog] = useState(() => {
    try {
      const savedProducts = localStorage.getItem(ADMIN_PRODUCTS_STORAGE_KEY);
      return savedProducts ? JSON.parse(savedProducts) : products;
    } catch (error) {
      return products;
    }
  });

  // cartItems ka shape: [{ product: {...}, quantity: number }]
  const [cartItems, setCartItems] = useState([]);
  const [showCartToast, setShowCartToast] = useState(false);
  const [, setCartToastTimer] = useState(null);

  // Cart badge ke liye total quantity calculate karte hain.
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product) => {
    // Agar product pehle se cart me hai to quantity +1, warna naya item add.
    setCartItems((currentCart) => {
      let alreadyInCart = false;

      const updatedCart = currentCart.map((item) => {
        if (item.product.id === product.id) {
          alreadyInCart = true;
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      if (!alreadyInCart) {
        updatedCart.push({ product, quantity: 1 });
      }

      return updatedCart;
    });

    // Add to Cart click par short popup message show hota hai.
    setShowCartToast(true);

    setCartToastTimer((currentTimer) => {
      if (currentTimer) {
        window.clearTimeout(currentTimer);
      }

      return window.setTimeout(() => {
        setShowCartToast(false);
        setCartToastTimer(null);
      }, 1800);
    });
  };

  const updateCartQuantity = (productId, nextQuantity) => {
    // Quantity 0 ya us se kam ho to item cart se remove ho jata hai.
    setCartItems((currentCart) => {
      const updatedCart = [];

      for (const item of currentCart) {
        if (item.product.id !== productId) {
          updatedCart.push(item);
          continue;
        }

        if (nextQuantity > 0) {
          updatedCart.push({ ...item, quantity: nextQuantity });
        }
      }

      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const updateProductCatalog = (nextProducts) => {
    setProductCatalog(nextProducts);
    try {
      localStorage.setItem(ADMIN_PRODUCTS_STORAGE_KEY, JSON.stringify(nextProducts));
    } catch (error) {
      // Ignore storage errors and keep in-memory state working.
    }
  };

  // Route param string hoti hai, is liye Number() se id compare karte hain.
  const getProductById = (id) => productCatalog.find((product) => product.id === Number(id));
  const hideNavbar = location.pathname.startsWith('/admin');

  return (
    <div className="app-shell d-flex flex-column min-vh-100">
      {showCartToast && (
        <div className="cart-toast alert alert-success mb-0" role="status" aria-live="polite">
          Product added to cart
        </div>
      )}
      {!hideNavbar && <Navbar cartCount={cartCount} />}
      <main className="container py-4">
        {/* App ke saare public routes yahan define hain. */}
        <Routes>
          <Route path="/" element={<HomePage products={productCatalog} addToCart={addToCart} />} />
          <Route
            path="/products"
            element={<ProductsPage products={productCatalog} addToCart={addToCart} />}
          />
          <Route
            path="/products/:id"
            element={
              <ProductDetailsPage
                getProductById={getProductById}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                updateCartQuantity={updateCartQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/admin"
            element={
              <AdminDashboardPage
                products={productCatalog}
                onProductsChange={updateProductCatalog}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer compact={hideNavbar} />
    </div>
  );
}

export default App;
