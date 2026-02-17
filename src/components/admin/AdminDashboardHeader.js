import React from 'react';

function AdminDashboardHeader({ onBackToHome, onLogout }) {
  return (
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
              placeholder="Static layout mode"
            />
          </div>
        </div>
        <div className="col-lg-5">
          <div className="d-flex justify-content-lg-end align-items-center gap-2 gap-md-3 flex-wrap">
            <button type="button" className="btn admin-icon-btn position-relative" aria-label="Notifications" disabled>
              <i className="bi bi-bell fs-5" />
            </button>
            <div className="admin-profile-pill">
              <span className="admin-avatar">S</span>
              <div className="admin-profile-text">
                <small className="d-block text-muted">Admin</small>
                <span>Sania</span>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-outline-dark btn-sm rounded-pill px-3"
              onClick={onBackToHome}
            >
              Back to Home
            </button>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm rounded-pill px-3"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardHeader;
