export const ADMIN_SECTION_TITLES = {
  overview: 'Overview',
  orders: 'Orders',
  products: 'Products',
  customers: 'Customers',
  reports: 'Reports',
  settings: 'Settings',
};

export const ADMIN_SIDEBAR_LINKS = [
  'overview',
  'orders',
  'products',
  'customers',
  'reports',
  'settings',
];

export const ADMIN_OVERVIEW_CARDS = [
  { label: 'Total Products', valueKey: 'products', className: 'stat-card-products' },
  { label: ' Total Orders ', value: '24', className: 'stat-card-orders' },
  { label: 'Revenue', value: '$5,870', className: 'stat-card-revenue' },
  { label: 'New Users', value: '18', className: 'stat-card-users' },
];

export const ADMIN_REPORT_BARS = [
  { month: 'Jan', amount: '$4,200', height: '128px' },
  { month: 'Feb', amount: '$5,100', height: '156px' },
  { month: 'Mar', amount: '$4,700', height: '144px' },
  { month: 'Apr', amount: '$5,900', height: '180px' },
  { month: 'May', amount: '$6,400', height: '196px' },
  { month: 'Jun', amount: '$7,200', height: '220px' },
];

export const adminOrders = [
  { id: 'ORD-1001', customer: 'Ayesha Khan', items: 3, total: 245, status: 'Delivered' },
  { id: 'ORD-1002', customer: 'Usman Ali', items: 1, total: 89, status: 'Processing' },
  { id: 'ORD-1003', customer: 'Sara Ahmed', items: 2, total: 174, status: 'Shipped' },
  { id: 'ORD-1004', customer: 'Hassan Raza', items: 4, total: 399, status: 'Pending' },
];

export const adminCustomers = [
  { id: 'CUS-201', name: 'Ayesha Khan', email: 'ayesha@example.com', orders: 8, spend: 1240 },
  { id: 'CUS-202', name: 'Usman Ali', email: 'usman@example.com', orders: 5, spend: 760 },
  { id: 'CUS-203', name: 'Sara Ahmed', email: 'sara@example.com', orders: 6, spend: 910 },
  { id: 'CUS-204', name: 'Hassan Raza', email: 'hassan@example.com', orders: 3, spend: 430 },
];
