import React from 'react'
import styles from './Register.module.css';
import { useFormik } from 'formik';

export default function Register() {
  function handelRegister(values){
    console.log(values);
  }
  let formik =useFormik({
    initialValues:{
      name:'',
      phone :'',
      email:'',
      password:'',
      rePassword :''
    },
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
