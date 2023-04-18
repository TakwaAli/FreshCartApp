import React, { useState } from 'react'
import styles from './RestPassword.module.css';
import { useFormik } from 'formik';
import * as yap from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
export default function RestPassword({saveuserData}) {
  let navigate=useNavigate();
const [isLooding, setisLooding] = useState(false)
const [massageerror, setmassageerror] = useState('')


  async function handelResetPassword(values){
    setisLooding(true)
  let{data}=await  axios.put(`https://route-ecommerce.onrender.com/api/v1/auth/resetPassword`,values).catch((errr)=>{
  setisLooding(false)
  console.log(errr,'error');
  setmassageerror(`${ errr.response.data.message}`)
  })
  
  if(data.message ==='success'){
   // console.log(data,"logindata");
    localStorage.setItem("userToken",data.token);
    saveuserData();
    setisLooding(false)
   navigate('/login')
  }

  console.log(data);
}


  let validationSchema = yap.object({
    email:yap.string().required("email is required").email('email is not valid'),
    newPassword:yap.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}$/,'password must start with upper case ...'),
    })


  let formik =useFormik({
    initialValues:{
      
      email:'',
      newPassword:'',
     
    },
    validationSchema,
    onSubmit:handelResetPassword
  })
  
  return (
    <>
    <div className='w-75 mx-auto py-4'>
      <h3>Reset Password Now ....</h3>
      {massageerror.length>0?<div  className='alert alert-danger'>{massageerror}</div>:null}
      
      <form onSubmit={formik.handleSubmit}>
      
        <label htmlFor="email">email</label>
        <input className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" id='email' name='email'/>
        {formik.errors.email && formik.touched ? <div className='alert alert-danger'>{formik.errors.email}</div>:null}
  
       
        <label htmlFor="password">password</label>
        <input className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type="password" id='password' name='password'/>
        {formik.errors.password && formik.touched ? <div className='alert alert-danger'>{formik.errors.password}</div>:null}
        {isLooding ? <button  type='button' className='btn bg-main text-white' ><i className='fas fa-spinner fa-spin'></i></button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white' >Login</button>} 
        
      </form>
     
    </div>
    </>
  )
}
