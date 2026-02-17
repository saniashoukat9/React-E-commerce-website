import React from 'react';
import { ADMIN_OVERVIEW_CARDS, ADMIN_REPORT_BARS } from '../../data/adminDashboardData';

const formatCurrency = (value) => `$${Number(value).toFixed(2)}`;
const getStatusClass = (status) => `order-status status-${status.toLowerCase()}`;

function AdminSectionContent({
  activeSection,
  sectionTitle,
  isProductsSection,
  products,
  previewProducts,
  previewOrders,
  previewCustomers,
}) {
  return (
    <div className="card border-0 admin-table-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-4">
          <div>
            <h5 className="mb-1">{sectionTitle}</h5>
            <p className="text-muted mb-0">
              You are viewing the {sectionTitle.toLowerCase()} section.
            </p>
          </div>
          {isProductsSection && (
            <button type="button" className="btn btn-dark btn-sm rounded-pill px-2" disabled>
              Add Product
            </button>
          )}
        </div>

        {activeSection === 'overview' && (
          <div className="row g-3 mb-4">
            {ADMIN_OVERVIEW_CARDS.map((card) => (
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
          <div className="table-responsive mb-4">
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
                {previewProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <img src={product.image} alt={product.name} className="admin-product-thumb" />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{formatCurrency(product.price)}</td>
                    <td className="text-end">
                      <div className="d-inline-flex gap-2">
                        <button type="button" className="btn btn-sm btn-outline-primary rounded-pill px-3" disabled>
                          Update
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-danger rounded-pill px-3" disabled>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === 'orders' && (
          <div className="table-responsive mb-4">
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
                {previewOrders.map((order) => (
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
              </tbody>
            </table>
          </div>
        )}

        {activeSection === 'customers' && (
          <div className="table-responsive mb-4">
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
                {previewCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.orders}</td>
                    <td>{formatCurrency(customer.spend)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === 'reports' && (
          <div className="admin-reports-wrap mb-4">
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
                {ADMIN_REPORT_BARS.map((bar) => (
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
          <div className="admin-placeholder-block">
            <h6 className="mb-2">Store Settings</h6>
            <p className="mb-0 text-muted">Settings section is displayed as static layout only.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSectionContent;
