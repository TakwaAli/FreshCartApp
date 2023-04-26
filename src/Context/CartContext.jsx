import axios from "axios";
import { createContext, useState } from "react";

export let cartContext= createContext();


export function CartContextProvider(props){
    const [data, setdata] = useState({})
    let header ={
        token:localStorage.getItem('userToken')
    }
    //let URL="https://route-ecommerce.onrender.com/api/v1/cart"
     function addToCart(product_id) {
      return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`,{
            productId:product_id
        }
       
        ,{headers:header})
        .then((response)=>response)
        .catch((error)=>error)
       
    }


    function getLockedUserCart(product_id) {
        return axios.get(`https://route-ecommerce.onrender.com/api/v1/cart` ,
        {headers:header})
        .then((response)=>response)
        .catch((error)=>error)
         
      }

    return <cartContext.Provider value={{addToCart,getLockedUserCart}} >

        {props.children}
    </cartContext.Provider>
}