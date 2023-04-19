
import styles from './CategorySlider.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
export default function CategorySlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 4
  };
  const [categories, setcategories] = useState([]);
  async function Getcategories() {
   let {data}= await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
   setcategories(data.data)
  // console.log(data.data);
  }
  useEffect(()=>{
      Getcategories()
  },[])
  return (
  <>
  <Slider {...settings}>
       {categories.map((category)=>
       {return(<>
        <div key={category._id}>
          <img height={200} className='w-100' src={category.image} alt="" />
          <h2 className='h5 text-center'>{category.name}</h2>
        </div>
       </>)})}

        </Slider>
  </>
  )
}
