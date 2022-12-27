import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import Search from '../Search/Search';

export default function Layout({userData,removeUserData}) {


  return (
    <>
      <Navbar userData={userData} removeUserData={removeUserData}/>
      <Search/>
      <Outlet/>
      <Footer/>
    </>
  )
}
