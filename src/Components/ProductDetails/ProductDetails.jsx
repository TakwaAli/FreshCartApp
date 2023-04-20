
import styles from './ProductDetails.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";

export default function ProductDetails() {
  // loader
  const [isLooding, setisLooding] = useState(false)

// slider 
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

  const [productDetails, setproductDetails] = useState([]);
  const param = useParams()
  console.log(param);
  async function GetProductDetails() {
    setisLooding(true)
    try {
      let {data}= await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${param._id}`)
      setproductDetails(data.data)
      //console.log(data.data,'productDetails');
      setisLooding(false)
    } 
    catch (error) {
      console.log(error);
      setisLooding(true)
    }
  
  }
  useEffect(()=>{
      GetProductDetails()
  },[])
  return (
  <>
{isLooding ?<div className='text-center'> <i className='fas fa-spinner fa-spin fa-3x text-main'></i> </div>:<div className="container">
    <div className="row align-items-center">
      <div className='col-md-4 '>
        {/* <img className='w-100' src={productDetails?.imageCover} alt="" /> */}

        <Slider {...settings}>
       {(productDetails.images)?.map((imag)=>{return(<>
        <img className='w-100' src={imag}/>
       </>)})}

        </Slider>
      </div>
      <div className='col-md-8 mt-5'>
        <h2 className='mt-2'>{productDetails?.title}</h2>
        <p className='mt-2'>{productDetails?.description}</p>
        <h4 className='mt-2'>price : {productDetails?.price}EGP</h4>
        <h4 className='mt-2'>Quantity : {productDetails?.quantity}</h4>
        <button className='fs-5 btn bg-main text-white w-100 mt-3 '>+ Add To Cart</button>
      </div>
    </div>
  </div>}
  
  </>
  )
}
