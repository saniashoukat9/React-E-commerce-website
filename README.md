# TechNest E-commerce Website

## Project Overview
TechNest is a React e-commerce application that demonstrates a frontend shopping workflow with an additional admin management panel.

On the customer side, users start from the Home page, view featured items and customer review cards, then move to the Products page to browse the full catalog. Each item links to a dedicated Product Details route (`/products/:id`) where product-specific information is loaded dynamically and users can add the item to cart.

The cart flow is interactive and behaves like a real store cart:
- products can be added from multiple pages
- item quantity can be increased/decreased
- items are removable from the cart
- navbar cart badge updates in real time
- cart totals (subtotal/shipping/total) are calculated and displayed

The Auth page provides login/signup UI with mode switching and client-side validation (required inputs and minimum password length), along with feedback alerts for successful or invalid form submission.

The Admin Dashboard is implemented as a separate route with its own layout and sidebar navigation. It includes overview blocks plus product management actions (add, edit, delete). Product updates are persisted in `localStorage`, so admin changes remain available after page refresh.

Overall, the project follows reusable component architecture, route-based navigation with React Router, and Bootstrap + custom CSS styling for responsive layout, consistent theme, and interactive UI effects.

## Pages/Components Implemented

### Pages
- `HomePage` (`/`)
- `ProductsPage` (`/products`)
- `ProductDetailsPage` (`/products/:id`)
- `CartPage` (`/cart`)
- `AuthPage` (`/auth`)
- `AdminDashboardPage` (`/admin`)

### Components
- `Navbar`
- `Footer`
- `ProductCard`
- `AdminSidebar`

### Data Files
- `products.js`
- `adminData.js`

## Technologies Used
- React
- React Router DOM
- Bootstrap 5
- CSS 3 
- JavaScript (ES6+)

## Steps to Run the Project
1. Open terminal in the project root.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open:
   `http://localhost:3000`
## Assigned By:
Sir Usama Aslam(CEO, Udevs)
