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

function App() {
  let router =createBrowserRouter([{
    path:"",element:<Layout/>,children:[
      {index:true,element: <Home/>},
      {path:"cart",element: <Cart/>},
      {path:"categories",element: <Categories/>},
      {path:"products",element: <Products/>},
      {path:"productDetails",element: <ProductDetails/>},
      {path:"about",element: <About/>},
      {path:"login",element: <Login/>},
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
