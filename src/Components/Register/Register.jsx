import React from 'react'
import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as yap from 'yup'
export default function Register() {
  function handelRegister(values){
    console.log(values);
  }
  let validationSchema = yap.object({
    name:yap.string().required("name is required").min(3,'min length is 3').max(10,'max lenght is 10'),
    email:yap.string().required("email is required").email('email is not valid'),
    password:yap.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}$/,'password must start with upper case ...'),
    rePassword:yap.string().required("rePassword is required").oneOf([yap.ref('password','not confirm password')]),
    phone:yap.string().required("phone is required").matches(/^01[0125][0-9]{8}$/,'phone number must be 11 number')
  })
  let formik =useFormik({
    initialValues:{
      name:'',
      phone :'',
      email:'',
      password:'',
      rePassword :''
    },
    validationSchema,
    onSubmit:handelRegister
  })
  
  return (
  <>
  <div className='w-75 mx-auto py-4'>
    <h3>Register Now ....</h3>
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.name} type="text" id='name' name='name'/>
    <div className='alert alert-danger'></div>
      <label htmlFor="email">email</label>
      <input className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" id='email' name='email'/>
   
      <label htmlFor="phone">phone</label>
      <input className='form-control mb-2' onChange={formik.handleChange} value={formik.values.phone} type="tel" id='phone' name='phone'/>
   
      <label htmlFor="password">password</label>
      <input className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type="password" id='password' name='password'/>
     
      <label htmlFor="rePassword">repassword</label>
      <input className='form-control mb-2' onChange={formik.handleChange} value={formik.values.rePassword} type="password" id='rePassword' name='rePassword'/>
   
      <button type='submit' className='btn bg-main text-white' >Register</button>
    </form>
  </div>
  </>
  )
}
