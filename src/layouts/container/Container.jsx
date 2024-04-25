import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { SIGN_IN_PATH, SIGN_UP_PATH } from '../../constants/path';

function Container() {
  
  const {pathname} = useLocation();
  
  
  
  
  
  return (
   <>
    <Header/>
    <Outlet/>
    {pathname !== SIGN_IN_PATH() && pathname !== SIGN_UP_PATH() && <Footer/>}
    
   </>
  )
}

export default Container
