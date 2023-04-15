import React from 'react'
import styles from './ProtectedRouting.module.css';
import { Navigate } from 'react-router-dom';
export default function ProtectedRouting(props) {
  console.log(props,"child");
 if (localStorage.getItem('userToken')== null) {
  return <Navigate to={'/login'}></Navigate> 
 }
 else{
return props.children;
 }
}
