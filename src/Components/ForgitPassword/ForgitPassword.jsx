import React, { useState } from 'react'
import styles from './ForgitPassword.module.css';
import { useFormik } from 'formik';
import * as yap from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function ForgitPassword() {
  const [isLooding, setisLooding] = useState(false)
  const [CodeFlage, setCodeFlage] = useState(true)
  const [massageerror, setmassageerror] = useState('')
  let navigate=useNavigate();
  //let baseURL="https://route-ecommerce.onrender.com"
  async function handelpassword(values){
    let{data}=await  axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords`,values)
  if (data.statusMsg=="success") {
    setCodeFlage(false)
  }
    console.log(data);
}
let validationSchema = yap.object({
  email:yap.string().required("email is required").email('email is not valid'),
 
  })

  let formik =useFormik({
    initialValues:{
      email:''
    },

    validationSchema,
    onSubmit:handelpassword
  })
  
  async function restcode(values){
    let{data}=await  axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode`,values).catch((errr)=>{
      setisLooding(false)
      console.log(errr,'error');
      setmassageerror(`${ errr.response.data.message}`)
      })
  console.log(data);
  if (data.status=="success") {
   //navigate to restet
   navigate("/restPasword")
  }
}
  let formik2 =useFormik({
    initialValues:{
      resetCode:''
    },

 
    onSubmit:restcode
  })
  
  return (
<>
{CodeFlage ? <div className='w-75 mx-auto py-4'>
    <h3>Forgit password....</h3>
   
    <form onSubmit={formik.handleSubmit}>
    <label htmlFor="email">email</label>
      <input className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" id='email' name='email'/>
      {formik.errors.email && formik.touched ? <div className='alert alert-danger'>{formik.errors.email}</div>:null}

      
      {isLooding ? <button  type='button' className='btn bg-main text-white' ><i className='fas fa-spinner fa-spin'></i></button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white' >send </button>} 
      
    </form>
    
  </div> :  <div className='w-75 mx-auto py-4'>
    <h3>Rest code....</h3>
    {massageerror.length>0?<div  className='alert alert-danger'>{massageerror}</div>:null}
    
    <form onSubmit={formik2.handleSubmit}>
    <label htmlFor="resetCode">Rest code</label>
      <input className='form-control mb-2' onChange={formik.handleChange} value={formik.values.resetCode} type="text" id='resetCode' name='resetCode'/>
      {/* {formik.errors.resetCode && formik.touched ? <div className='alert alert-danger'>{formik.errors.resetCode}</div>:null}
 */}
      
      {isLooding ? <button  type='button' className='btn bg-main text-white' ><i className='fas fa-spinner fa-spin'></i></button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white' >Reset Code </button>} 
      
    </form>
    
  </div>}
  
  {/* //////////////////////// */}



 
  </>
  )
}
