import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Alert from './components/Alert.jsx';
import { useCart } from './context/CartContext.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Categories from './pages/Categories.jsx';
import Offers from './pages/Offers.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import PaymentResult from './pages/PaymentResult.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Blog from './pages/Blog.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import Account from './pages/Account.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  const { notice, dismissNotice } = useCart();
  return <div className="app-shell"><Navbar />{notice && <div className="container global-notice"><Alert message={notice} type="success" onClose={dismissNotice} /></div>}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Products />} />
      <Route path="/productos/:id" element={<ProductDetail />} />
      <Route path="/categorias" element={<Categories />} />
      <Route path="/ofertas" element={<Offers />} />
      <Route path="/carrito" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/resultado-pago" element={<PaymentResult />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/nosotros" element={<About />} />
      <Route path="/contacto" element={<Contact />} />
      <Route path="/mi-cuenta" element={<Account />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/comprador" element={<Navigate to="/mi-cuenta" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </div>;
}
