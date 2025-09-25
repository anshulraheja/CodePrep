import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Ecommerce/Home';
import Products from './components/Ecommerce/Products';
import ProductDetails from './components/Ecommerce/ProductDetails';
import {} from 'react-router';
import { CartProvider } from './components/Ecommerce/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Layout
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'products/:id', element: <ProductDetails /> },
    ],
  },
]);
root.render(
  // <React.StrictMode>
  <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
