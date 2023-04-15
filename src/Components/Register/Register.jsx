import React, { useState } from 'react'
import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as yap from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
let navigate=useNavigate();
const [isLooding, setisLooding] = useState(false)
const [massageerror, setmassageerror] = useState('')
  async function handelRegister(values){
    setisLooding(true)
  let{data}=await  axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`,values).catch((errr)=>{
  setisLooding(false)
  console.log(errr,'error');
  setmassageerror(`${ errr.response.data.message}`)
  })
  
  if(data.message ==='success'){
    setisLooding(false)
   navigate('/login')
  }

  console.log(data);
}
  let validationSchema = yap.object({
    name:yap.string().required("name is required").min(3,'min length is 3').max(10,'max lenght is 10'),
    email:yap.string().required("email is required").email('email is not valid'),
    password:yap.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}$/,'password must start with upper case ...'),
    rePassword:yap.string().required("rePassword is required").oneOf([yap.ref('password')],'not confirm password'),
    phone:yap.string().required("phone is required").matches(/^01[0125][0-9]{8}$/,'phone number must be 11 number')
  })
  let formik =useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword :'',
      phone :''
    },
    validationSchema,
    onSubmit:handelRegister
  })
  
  return (
  <>
  <div className='w-75 mx-auto py-4'>
    <h3>Register Now ....</h3>
    {massageerror.length>0?<div  className='alert alert-danger'>{massageerror}</div>:null}
    
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.name} type="text" id='name' name='name'/>
   {formik.errors.name && formik.touched ? <div className='alert alert-danger'>{formik.errors.name}</div>:null}
    
      <label htmlFor="email">email</label>
      <input className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" id='email' name='email'/>
      {formik.errors.email && formik.touched ? <div className='alert alert-danger'>{formik.errors.email}</div>:null}

      <label htmlFor="phone">phone</label>
      <input className='form-control mb-2' onChange={formik.handleChange} value={formik.values.phone} type="tel" id='phone' name='phone'/>
      {formik.errors.phone && formik.touched ? <div className='alert alert-danger'>{formik.errors.phone}</div>:null}

      <label htmlFor="password">password</label>
      <input className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type="password" id='password' name='password'/>
      {formik.errors.password && formik.touched ? <div className='alert alert-danger'>{formik.errors.password}</div>:null}

      <label htmlFor="rePassword">repassword</label>
      <input className='form-control mb-2' onChange={formik.handleChange} value={formik.values.rePassword} type="password" id='rePassword' name='rePassword'/>
      {formik.errors.rePassword && formik.touched ? <div className='alert alert-danger'>{formik.errors.rePassword}</div>:null}
     {isLooding ? <button  type='button' className='btn bg-main text-white' ><i className='fas fa-spinner fa-spin'></i></button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white' >Register</button>} 
      
    </form>
  </div>
  </>
  )
}
