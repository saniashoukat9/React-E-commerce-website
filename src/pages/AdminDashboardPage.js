import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AdminDashboardHeader from '../components/admin/AdminDashboardHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminSectionContent from '../components/admin/AdminSectionContent';
import {
  adminCustomers,
  adminOrders,
  ADMIN_SECTION_TITLES,
} from '../data/adminDashboardData';

function AdminDashboardPage({ products }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSection = searchParams.get('section') || 'overview';
  const activeSection = ADMIN_SECTION_TITLES[selectedSection] ? selectedSection : 'overview';
  const isProductsSection = activeSection === 'products';
  const previewProducts = products.slice(0, 6);
  const previewOrders = adminOrders.slice(0, 6);
  const previewCustomers = adminCustomers.slice(0, 6);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleLogout = () => {
    navigate('/auth');
  };

  const handleSectionSelect = (section) => {
    setSearchParams({ section });
  };

  return (
    <section className="admin-page">
      <AdminDashboardHeader onBackToHome={handleBackToHome} onLogout={handleLogout} />

      <div className="row g-4 align-items-start admin-layout">
        <div className="col-lg-4 admin-sidebar-col">
          <AdminSidebar activeSection={activeSection} onSectionSelect={handleSectionSelect} />
        </div>

        <div className="col-lg-8 admin-content-col">
          <AdminSectionContent
            activeSection={activeSection}
            sectionTitle={ADMIN_SECTION_TITLES[activeSection]}
            isProductsSection={isProductsSection}
            products={products}
            previewProducts={previewProducts}
            previewOrders={previewOrders}
            previewCustomers={previewCustomers}
          />
        </div>
      </div>
    </section>
  );
}

export default AdminDashboardPage;
