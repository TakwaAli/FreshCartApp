import React, { useState } from 'react'
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as yap from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({saveuserData}) {
let navigate=useNavigate();
const [isLooding, setisLooding] = useState(false)
const [massageerror, setmassageerror] = useState('')
  async function handelLogin(values){
    setisLooding(true)
  let{data}=await  axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`,values).catch((errr)=>{
  setisLooding(false)
  console.log(errr,'error');
  setmassageerror(`${ errr.response.data.message}`)
  })
  
  if(data.message ==='success'){
   // console.log(data,"logindata");
    localStorage.setItem("userToken",data.token);
    saveuserData();
    setisLooding(false)
   navigate('/')
  }

  console.log(data);
}
  let validationSchema = yap.object({
    email:yap.string().required("email is required").email('email is not valid'),
    password:yap.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}$/,'password must start with upper case ...'),
    })
  let formik =useFormik({
    initialValues:{
      
      email:'',
      password:'',
     
    },
    validationSchema,
    onSubmit:handelLogin
  })
  
  return (
  <>
  <div className='w-75 mx-auto py-4'>
    <h3>Login Now ....</h3>
    {massageerror.length>0?<div  className='alert alert-danger'>{massageerror}</div>:null}
    
    <form onSubmit={formik.handleSubmit}>
    
      <label htmlFor="email">email</label>
      <input className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" id='email' name='email'/>
      {formik.errors.email && formik.touched ? <div className='alert alert-danger'>{formik.errors.email}</div>:null}

     
      <label htmlFor="password">password</label>
      <input className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type="password" id='password' name='password'/>
      {formik.errors.password && formik.touched ? <div className='alert alert-danger'>{formik.errors.password}</div>:null}
      {isLooding ? <button  type='button' className='btn bg-main text-white' ><i className='fas fa-spinner fa-spin'></i></button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white' >Register</button>} 
      
    </form>
  </div>
  </>
  )
}

