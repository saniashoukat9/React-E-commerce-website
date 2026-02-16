import React from 'react';

const links = ['overview', 'orders', 'products', 'customers', 'reports', 'settings'];

function AdminSidebar({ activeSection, onSectionSelect }) {
  return (
    <aside className="admin-sidebar p-4 rounded-4">
      <h5 className="mb-1">Admin Panel</h5>
      <p className="text-white-50 small mb-3">Quick Navigation</p>
      <div className="d-flex flex-column gap-2">
        {links.map((item) => (
          <button
            key={item}
            type="button"
            className={`text-white px-3 py-2 sidebar-link text-start border-0 bg-transparent${
              activeSection === item ? ' active' : ''
            }`}
            onClick={() => onSectionSelect(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default AdminSidebar;
