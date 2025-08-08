import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ProductsPage from './pages/ProductsPage';
import ProductsDetailPage from './pages/ProductsDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/404';
import ProductProvider from './context/ProductProvider';
import CartProvider from './context/CartContext';
import Layout from './layout/Layout';

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Layout>
          <Routes>
            <Route index element={<Navigate to={'/products'} replace />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductsDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
