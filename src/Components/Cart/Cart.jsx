import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';

export default function Cart() {

  const [CartDetails, setCartDetails] = useState(null)
  let {getLockedUserCart,removeItem,updateCart} = useContext(cartContext)

  async function getCart() {
    let response= await getLockedUserCart()
    if (response ?.data ?.status === 'success') {
      console.log(response.data.data);
      setCartDetails(response.data.data)
    }
    
  }

  async function remove(product_id) {
    let response= await removeItem(product_id)
    setCartDetails(response.data.data)
    toast("product delete from cart")
  }
  async function updateCartQuantity(product_id,count) {
    let response= await updateCart(product_id ,count)
    setCartDetails(response.data.data)
    toast("product Quntatity updated")
  }
  useEffect(async () => {
    
    getCart();
   
  }, [])
  
  return (
  <>
  {CartDetails !== null ? <div className='bg-main-light p-4 my-4'>
    <h3>Shop Cart :</h3>
    <h6>Total Cart Price :{CartDetails.totalCartPrice}</h6>
    {(CartDetails.products)?.map((product)=><div key={product.product._id} className='row'>

    <div className='col-md-1'>
<img src={product.product.imageCover} className='w-100' alt="" />
    </div>
    <div className='col-md-11 d-flex justify-content-between'>
     <div>
     <h6>{product.product.title}</h6>
     <h6 className='text-main'>price: {product.price}</h6>
     <button onClick={()=>remove(product.product._id)} className='btn m-0 p-z'><i className='fa-regular fa-trash-can text-danger'></i> Remove</button>
     </div>
     <div>
      <button onClick={()=>updateCartQuantity(product.product._id,product.count+1)} className='btn border-main btn-sm'>+</button>
      <span className='mx-2'>{product.count}</span>
      <button onClick={()=>updateCartQuantity(product.product._id,product.count-1)} className='btn border-main btn-sm'>-</button>
     </div>
    </div>

</div>)}
  </div> 

  : null}
  
  </>
  )
}
