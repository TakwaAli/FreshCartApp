import React, { useEffect, useState } from 'react'
import styles from './FeatureProduct.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function FeatureProduct() {
  const [products, setproducts] = useState([]);
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
 <Link to={`/productDetails/${product._id}`}>
      <div className='product px-2 py-3 cursor-pointer'>
        <img className='w-100' src={product.imageCover}></img>
        <span className='text-main fw-bold font-sm'>{product.category.name}</span>
      <h3 className='h6 fw-bolder'>{product.title.split(' ').slice(0,2).join('  ')}</h3>
     <div className='d-flex justify-content-between'>
      <span className='text-muted'>{product.price}EGP</span>
      <span >
        <i className='fas fa-star rating-color'></i>
        {product.ratingsAverage}
        </span>
     </div>
     <button className='btn bg-main text-white w-100'>+ Add</button>
      </div>
      </Link>
      </div>


     
    </>)
  
    })}
  </div>
  </>
  )
}
