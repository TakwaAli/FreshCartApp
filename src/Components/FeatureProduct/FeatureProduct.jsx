import React, { useContext, useEffect, useState } from 'react'
import styles from './FeatureProduct.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';

export default function FeatureProduct() {
  const [products, setproducts] = useState([]);

let {addToCart}=useContext(cartContext)

async function addproduct(productId) {
  let response= await addToCart(productId)
  if (response ?.data ?.status === 'success') {
    toast.success(response.data.message)
  }
  else{
    toast.error(response.data.message)
  }
     console.log(response);
}
//https://documenter.getpostman.com/view/5709532/2s8Z75SVbe#a100c11e-9e5f-4735-b89e-22cd384f2b2d
  async function GetProducts() {
   let {data}= await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`)
    setproducts(data.data)
   console.log(data.data);
  
  }
  useEffect(()=>{
      GetProducts()
  },[])
  return (
  <>
  <div className="row">
    {products.map((product)=>{
      return(<>

 <div key={product._id} className='col-md-2'>
 
      <div className='product px-2 py-3 cursor-pointer'>
       
      <Link to={`/productDetails/${product._id}`}>
      <img className='w-100' src={product.imageCover}></img>
         </Link>
       
        <span className='text-main fw-bold font-sm'>{product.category.name}</span>
      <h3 className='h6 fw-bolder'>{product.title.split(' ').slice(0,2).join('  ')}</h3>
     <div className='d-flex justify-content-between'>
      <span className='text-muted'>{product.price}EGP</span>
      <span >
        <i className='fas fa-star rating-color'></i>
        {product.ratingsAverage}
        </span>
     </div>
     <button onClick={()=> addproduct(product._id)} className='btn bg-main text-white w-100'>+ Add</button>
      </div>
     
      
      </div>


     
    </>)
  
    })}
  </div>
  </>
  )
}
