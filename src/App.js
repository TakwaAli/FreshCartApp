import logo from './logo.svg';
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import About from './Components/About/About';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Categories from './Components/Categories/Categories';
import Notfound from './Components/Notfound/Notfound';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRouting from './Components/ProtectedRouting/ProtectedRouting';

function App() {
  const [userData, setuserData] = useState(null);

  function saveuserData() {
  let encodedToken=  localStorage.getItem("userToken");
 let decodedToken = jwtDecode(encodedToken);
 setuserData(decodedToken);
  }
  let router =createBrowserRouter([{
    path:"",element:<Layout userData={userData}/>,children:[
      {index:true,element: <ProtectedRouting><Home/></ProtectedRouting> },
      {path:"cart",element:<ProtectedRouting><Cart/></ProtectedRouting> },
      {path:"categories",element: <ProtectedRouting><Categories/></ProtectedRouting> },
      {path:"products",element: <ProtectedRouting><Products/></ProtectedRouting>},
      {path:"productDetails",element:<ProtectedRouting><ProductDetails/></ProtectedRouting> },
      {path:"about",element:<ProtectedRouting><About/></ProtectedRouting> },
      {path:"login",element: <Login saveuserData={saveuserData}/>},
      {path:"sigin",element: <Register/>},
      {path:"*",element: <Notfound/>},
    ]
  }])
  return (
  <>
  <RouterProvider router={router}></RouterProvider>
  </>

  );
}

export default App;
