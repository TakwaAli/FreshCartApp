import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css';
import { cartContext } from '../../Context/CartContext';

export default function Cart() {

  const [CartDetails, setCartDetails] = useState(null)
  let {getLockedUserCart} = useContext(cartContext)

  async function getCart() {
    let response= await getLockedUserCart()
    if (response ?.data ?.status === 'success') {
      console.log(response.data.data);
      setCartDetails(response.data.data)
    }
    
  }

  useEffect(async () => {
    
    getCart();
   
  }, [])
  
  return (
  <>
  {CartDetails !== null ? <div className='bg-main-light p-4 my-4'>
    <h3>Shop Cart :</h3>
    <h6>Total Cart Price :{CartDetails.totalCartPrice}</h6>
    {(CartDetails.products)?.map((product)=><div className='row'>

    <div className='col-md-1'>
<img src={product.product.imageCover} className='w-100' alt="" />
    </div>
    <div className='col-md-11'>
     <h6>{product.product.title}</h6>
     <h6>price: {product.price}</h6>
    </div>
</div>)}
  </div> 

  : null}
  
  </>
  )
}
