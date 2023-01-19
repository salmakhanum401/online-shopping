import './App.css';
import { useState } from 'react';
import UserRegistrationForm from './components/UserRegistrationForm';
import ProductList from './components/ProductList';
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from './components/LoginPage';
import ProductInfo from './components/ProductInfo';
import Cart from './components/Cart';
import "bootstrap/dist/css/bootstrap.min.css";
import Orders from './components/Orders';
import OrderPlaced from './components/OrderPlaced';

function App() {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState(userId)
  const navigate = useNavigate();
  const ProtectedRoute = (props) => {
    if (!props.user) {
      return <Navigate to="/LoginPage" />;
    }
    return props.children;
  };

  return (
    <>
      <div className='header' style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 className='cursor-pointer' onClick={()=> navigate("/productsList")}>Online Shopping</h3>

        {user && <div style={{ display: "flex", gap: 10 }}>
          <Link className='text-white' to={`/cart/${userId}`}>Cart</Link>
          <Link to={`/orders/${userId}`} className='text-white'>Orders</Link>
          <Link className='text-white' onClick={() => { localStorage.clear(); setUser(null) }} style={{ marginLeft: 20 }}>Logout</Link>
        </div>}
      </div>

      <div className='m-3'>
        <Routes>
          <Route path="/UserRegistrationForm" element={<UserRegistrationForm />} />
          <Route path="/LoginPage" element={<LoginPage setUser={setUser} />} />
          <Route path="/productsList" element={<ProtectedRoute user={user}><ProductList /></ProtectedRoute>} />
          <Route path="/cart/:userId" element={<ProtectedRoute user={user}><Cart /></ProtectedRoute>} />
          <Route path="/product/:productId" element={<ProtectedRoute user={user}><ProductInfo /></ProtectedRoute>} />
          <Route path="/orders/:userId" element={<ProtectedRoute user={user}><Orders /></ProtectedRoute>} />
          <Route path="/ordersPlaced/:userId" element={<ProtectedRoute user={user}><OrderPlaced /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/LoginPage" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

