import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import { adminCustomers, adminOrders } from '../data/adminData';

// Product form ka default initial state.
const INITIAL_PRODUCT_FORM = {
  name: '',
  category: '',
  price: '',
  image: '',
};

// Sidebar section id => visible title mapping.
const SECTION_TITLES = {
  overview: 'Overview',
  orders: 'Orders',
  products: 'Products',
  customers: 'Customers',
  reports: 'Reports',
  settings: 'Settings',
};

const getNormalizedText = (value) => value.trim().toLowerCase();
const formatCurrency = (value) => `$${Number(value).toFixed(2)}`;
const getStatusClass = (status) => `order-status status-${status.toLowerCase()}`;
const matchesText = (value, query) => value.toLowerCase().includes(query);

// Reusable empty-state row for tables.
const renderEmptyRow = (colSpan, text) => (
  <tr>
    <td colSpan={colSpan} className="text-center text-muted py-4">
      {text}
    </td>
  </tr>
);

// Overview cards ka UI data.
const OVERVIEW_CARDS = [
  { label: 'Total Products', valueKey: 'products', className: 'stat-card-products' },
  { label: ' Total Orders ', value: '24', className: 'stat-card-orders' },
  { label: 'Revenue', value: '$5,870', className: 'stat-card-revenue' },
  { label: 'New Users', value: '18', className: 'stat-card-users' },
];

// Reports section ke static graph bars (UI only).
const REPORT_BARS = [
  { month: 'Jan', amount: '$4,200', height: '128px' },
  { month: 'Feb', amount: '$5,100', height: '156px' },
  { month: 'Mar', amount: '$4,700', height: '144px' },
  { month: 'Apr', amount: '$5,900', height: '180px' },
  { month: 'May', amount: '$6,400', height: '196px' },
  { month: 'Jun', amount: '$7,200', height: '220px' },
];

function AdminDashboardPage({ products, onProductsChange }) {
  // UI state
  const [activeSection, setActiveSection] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState(INITIAL_PRODUCT_FORM);
  const [adminMessage, setAdminMessage] = useState('');

  // Search filters
  const normalizedSearch = getNormalizedText(searchTerm);

  // Products section search (name/category).
  const filteredProducts = products.filter(
    (product) =>
      matchesText(product.name, normalizedSearch) ||
      matchesText(product.category, normalizedSearch)
  );

  // Orders section search (id/customer/status).
  const filteredOrders = adminOrders.filter(
    (order) =>
      matchesText(order.id, normalizedSearch) ||
      matchesText(order.customer, normalizedSearch) ||
      matchesText(order.status, normalizedSearch)
  );

  // Customers section search (id/name/email).
  const filteredCustomers = adminCustomers.filter(
    (customer) =>
      matchesText(customer.id, normalizedSearch) ||
      matchesText(customer.name, normalizedSearch) ||
      matchesText(customer.email, normalizedSearch)
  );
  const isProductsSection = activeSection === 'products';

  // Form helpers
  const resetProductForm = () => {
    // Form close + state reset.
    setProductForm(INITIAL_PRODUCT_FORM);
    setEditingProductId(null);
    setIsProductFormOpen(false);
  };

  const handleAddProductClick = () => {
    setProductForm(INITIAL_PRODUCT_FORM);
    setEditingProductId(null);
    setIsProductFormOpen(true);
  };

  const handleEditProductClick = (product) => {
    // Existing product data ko form me preload karte hain.
    setProductForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      image: product.image || '',
    });
    setEditingProductId(product.id);
    setIsProductFormOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    // Product remove kar ke parent catalog update karte hain.
    const nextProducts = products.filter((product) => product.id !== productId);
    onProductsChange(nextProducts);
    setAdminMessage('Product deleted successfully.');
  };

  const handleProductInputChange = (event) => {
    const { name, value } = event.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductFormSubmit = (event) => {
    event.preventDefault();
    const name = productForm.name.trim();
    const category = productForm.category.trim();
    const priceValue = Number(productForm.price);
    const image = productForm.image.trim();

    if (!name || !category || !productForm.price.trim()) {
      setAdminMessage('Please fill all product fields.');
      return;
    }

    if (Number.isNaN(priceValue) || priceValue <= 0) {
      setAdminMessage('Please enter a valid product price.');
      return;
    }

    if (editingProductId) {
      // Update existing product
      const nextProducts = products.map((product) =>
        product.id === editingProductId
          ? {
              ...product,
              name,
              category,
              price: priceValue,
              image: image || product.image,
            }
          : product
      );
      onProductsChange(nextProducts);
      setAdminMessage('Product updated successfully.');
    } else {
      // Add new product
      const nextId = products.length
        ? Math.max(...products.map((product) => Number(product.id))) + 1
        : 1;

      const nextProducts = [
        ...products,
        {
          id: nextId,
          name,
          category,
          price: priceValue,
          image: image || 'https://via.placeholder.com/300x220?text=New+Product',
          rating: 4,
          description: 'New product added from admin panel.',
        },
      ];
      onProductsChange(nextProducts);
      setAdminMessage('Product added successfully.');
    }

    resetProductForm();
  };

  const handleLogout = () => {
    window.location.href = '/auth';
  };

  return (
    <section className="admin-page">
      {/* Top header: title, search, profile actions */}
      <div className="admin-header-bar rounded-4 p-3 p-md-4 mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-lg-3">
            <h5 className="mb-0 admin-project-name">Admin Dashboard</h5>
          </div>
          <div className="col-lg-4">
            <div className="admin-search-wrap">
              <i className="bi bi-search admin-search-icon" />
              <input
                type="search"
                className="form-control admin-search-input"
                placeholder="Search products, orders, customers..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex justify-content-lg-end align-items-center gap-2 gap-md-3 flex-wrap">
              <button type="button" className="btn admin-icon-btn position-relative" aria-label="Notifications">
                <i className="bi bi-bell fs-5" />
              </button>
              <div className="admin-profile-pill">
                <span className="admin-avatar">S</span>
                <div className="admin-profile-text">
                  <small className="d-block text-muted">Admin</small>
                  <span>Sania</span>
                </div>
              </div>
              <Link to="/" className="btn btn-outline-dark btn-sm rounded-pill px-3">
                Back to Home
              </Link>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm rounded-pill px-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Main layout: left sidebar + right content */}
      <div className="row g-4 align-items-start admin-layout">
        <div className="col-lg-4 admin-sidebar-col">
          <AdminSidebar activeSection={activeSection} onSectionSelect={setActiveSection} />
        </div>
        <div className="col-lg-8 admin-content-col">
          <div className="card border-0 admin-table-card">
            <div className="card-body">
              {adminMessage && (
                <div className="alert alert-info py-2 mb-3" role="status">
                  {adminMessage}
                </div>
              )}

              <div className="d-flex justify-content-between align-items-start gap-2 mb-4">
                <div>
                  <h5 className="mb-1">{SECTION_TITLES[activeSection]}</h5>
                  <p className="text-muted mb-0">
                    You are viewing the {SECTION_TITLES[activeSection].toLowerCase()} section.
                  </p>
                </div>
                {isProductsSection && (
                  <button
                    type="button"
                    className="btn btn-dark btn-sm rounded-pill px-2"
                    onClick={handleAddProductClick}
                  >
                    Add Product
                  </button>
                )}
              </div>

              {activeSection === 'overview' && (
                // Overview stats cards
                <div className="row g-3 mb-1">
                  {OVERVIEW_CARDS.map((card) => (
                    <div key={card.label} className="col-sm-6 col-xl-3">
                      <div className={`card border-0 stat-card ${card.className}`}>
                        <div className="card-body">
                          <small className="text-muted d-block mb-1">{card.label}</small>
                          <h4 className="mb-0">
                            {card.valueKey === 'products' ? products.length : card.value}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {isProductsSection && (
                // Products management: form + table
                <div>
                  {isProductFormOpen && (
                    <form className="admin-placeholder-block mb-3" onSubmit={handleProductFormSubmit}>
                      <div className="row g-2">
                        <div className="col-md-3">
                          <input
                            type="text"
                            name="name"
                            value={productForm.name}
                            onChange={handleProductInputChange}
                            className="form-control"
                            placeholder="Product name"
                          />
                        </div>
                        <div className="col-md-3">
                          <input
                            type="text"
                            name="category"
                            value={productForm.category}
                            onChange={handleProductInputChange}
                            className="form-control"
                            placeholder="Category"
                          />
                        </div>
                        <div className="col-md-3">
                          <input
                            type="number"
                            name="price"
                            value={productForm.price}
                            onChange={handleProductInputChange}
                            className="form-control"
                            placeholder="Price"
                            min="1"
                          />
                        </div>
                        <div className="col-md-3">
                          <input
                            type="url"
                            name="image"
                            value={productForm.image}
                            onChange={handleProductInputChange}
                            className="form-control"
                            placeholder="Image URL"
                          />
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-end mt-3">
                        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={resetProductForm}>
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-dark btn-sm">
                          {editingProductId ? 'Save Changes' : 'Add Product'}
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th className="text-end">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((product) => (
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>
                              <img
                                src={product.image}
                                alt={product.name}
                                className="admin-product-thumb"
                              />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{formatCurrency(product.price)}</td>
                            <td className="text-end">
                              <div className="d-inline-flex gap-2">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-primary rounded-pill px-3"
                                  onClick={() => handleEditProductClick(product)}
                                >
                                  Update
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger rounded-pill px-3"
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredProducts.length === 0 && renderEmptyRow(6, 'No products found.')}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeSection === 'orders' && (
                // Orders table
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.customer}</td>
                          <td>{order.items}</td>
                          <td>{formatCurrency(order.total)}</td>
                          <td>
                            <span className={getStatusClass(order.status)}>{order.status}</span>
                          </td>
                        </tr>
                      ))}
                      {filteredOrders.length === 0 && renderEmptyRow(5, 'No orders found.')}
                    </tbody>
                  </table>
                </div>
              )}

              {activeSection === 'customers' && (
                // Customers table
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Customer ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Total Orders</th>
                        <th>Total Spend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.map((customer) => (
                        <tr key={customer.id}>
                          <td>{customer.id}</td>
                          <td>{customer.name}</td>
                          <td>{customer.email}</td>
                          <td>{customer.orders}</td>
                          <td>{formatCurrency(customer.spend)}</td>
                        </tr>
                      ))}
                      {filteredCustomers.length === 0 && renderEmptyRow(5, 'No customers found.')}
                    </tbody>
                  </table>
                </div>
              )}

              {activeSection === 'reports' && (
                // Reports UI (static cards + bars)
                <div className="admin-reports-wrap">
                  <div className="row g-3 mb-4">
                    <div className="col-sm-6">
                      <div className="admin-placeholder-block">
                        <small className="text-muted d-block mb-1">Total Sales (6 months)</small>
                        <h5 className="mb-0">$33,500</h5>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="admin-placeholder-block">
                        <small className="text-muted d-block mb-1">Total Orders (6 months)</small>
                        <h5 className="mb-0">360</h5>
                      </div>
                    </div>
                  </div>

                  <div className="admin-chart-card">
                    <div className="admin-chart-grid">
                      {REPORT_BARS.map((bar) => (
                        <div key={bar.month} className="admin-chart-col">
                          <span className="admin-chart-value">{bar.amount}</span>
                          <div className="admin-chart-bar" style={{ height: bar.height }} />
                          <span className="admin-chart-label">{bar.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'settings' && (
                // Settings placeholder
                <div className="admin-placeholder-block">
                  <h6 className="mb-2">Store Settings</h6>
                  <p className="mb-0 text-muted">
                    Settings section is ready for profile, security, and preferences.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboardPage;
