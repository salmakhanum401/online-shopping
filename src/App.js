// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import UserRegistrationForm from './components/UserRegistrationForm';
import ProductList from './components/ProductList';
// import LoginPage from './components/LoginPage';
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



// import './App.css';
// // import UserList from './components/UserList';
// // import CountExample from './components/CountExample';
// // import TestUserList from './components/TestUserList';
// // import Count from './components/Count';
// // import Names from './components/Names';
// import{Route,Routes, useNavigate} from "react-router-dom";
// import Names from './components/Names';
// import BookList from './components/BookList';
// import UserList from './components/UserList.jsx';
// import CountExample from './components/CountExample.jsx';
// import TestUserList from './components/TestUserList';
// import HooksExamples from './components/HooksExamples';
// import ClickCount from './components/HOC/ClickCount';
// import MouseCount from './components/HOC/MouseCount';
// import Callback from './components/Callback';
// // import UserRegistrationForm from './components/HOC/UserRegistrationForm';
// import ProductList from './components/ProductList';


// function App() {
//   const navigate = useNavigate();
//   return (
//     <>
//     <div>
//       {/* <button onClick={()=>navigate("/books")}>Books</button>
//       <button onClick={()=>navigate("/hooksExample")}>Hooks Examples</button>
//       <button onClick={()=>navigate("/hoc")}>Higher Order components</button>
//       <button onClick={()=>navigate("/useCallback")}>Use Callback</button> */}
//       <button onClick={()=>navigate("/userRegistrationForm")}> User Registration Form</button>
//       <button onClick={()=>navigate("/productsList")}> Product List</button>
//     </div>
//     <Routes>
//       {/* <Route path="/" element={<Names/>}/>
//       <Route path="/books" element={<BookList/>}/>
//       <Route path="/user" element={<UserList/>}/>
//       <Route path="/count" element={<CountExample/>}/>
//       <Route path="/test" element={<TestUserList/>}/>
//       <Route path="/hooksExample" element={<HooksExamples/>}/>
//       <Route path="/hoc" element={<><ClickCount buttonText="Click Button" /><MouseCount buttonText="Mouse Button" /></>} />
//       <Route path="/useCallback" element={<Callback />} /> */}
//       <Route path="/productsList" element={<ProductList />} />
//       {/* <Route path="/userRegistrationForm" element={<UserRegistrationForm/>}/> */}
//     </Routes>
//    </>
//   )
// }

// export default App;
