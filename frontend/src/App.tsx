import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Gate from './pages/Gate';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen text-gray-900 dark:text-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gate" element={<Gate />} />
            <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
            <Route path="/products/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}
