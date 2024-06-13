import './App.css';
import { BrowserRouter, Routes,Route, Outlet } from 'react-router-dom';
// import { Route } from 'react-router';
import ProductDetails from './features/product/ProductDetails';
import ProductList from './features/product/ProductList.js';
import Basket from './features/order/Basket.js';
import Login from './features/user/Login.js'
import Register from './features/user/Register.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userIn } from './features/user/userSlice.js';
import { updateBasketFromStorge, enterAdress } from './features/order/orderSlice.js';
import UpdateProduct from './features/product/FormUpdateProduct.js';
import AddProduct from './features/product/FormAddProduct.js';
import PrivateRoute from './features/user/PrivateRoute.js';
import 'primeicons/primeicons.css';
import NavBar from './NavBar.js';
import HomePage from './HomePage.js';


function App() {

  let disp = useDispatch();
  useEffect(() => {
    let user = localStorage.getItem("currentUser");
    if (user) {
      disp(userIn(JSON.parse(user)));
    }
    let basket = localStorage.getItem("basket");
    if (basket) {
      disp(updateBasketFromStorge(JSON.parse(basket)));
    }
    let adress = localStorage.getItem("adress");
    if (adress) {
      disp(enterAdress(adress));
    }
  }, [])

  return (<>
    
      {/* <NavBar /> */}
      <Routes>
        <Route path="loveFlower" element={<NavBar/>}>
          <Route path="homePage" element={<HomePage />} />
          <Route path="list" element={<ProductList />}>
            <Route path=":id" element={<ProductDetails />} />
          </Route>
          <Route path="basket" element={<Basket />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="admin/update/:id" element={<PrivateRoute> <UpdateProduct /></PrivateRoute>} />
          <Route path="admin/add" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
      </Route>
      </Routes>
        <Outlet/>

  </>);
}


export default App;
