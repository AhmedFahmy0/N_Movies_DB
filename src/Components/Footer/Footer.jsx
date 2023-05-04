import React from 'react'
import './Footer_style.css'
import { Link } from 'react-router-dom';

export default function Footer() {




  return (
    <>
      <footer  className='  main-footer ' >
            <div className="dark text-center text-white p-2   ">
                <p className='m-0'>© Copyright <strong>2022</strong>. All Rights Reserved</p>
                <p className='m-0'>Created by <Link className='nav-link d-inline text-info' target='_blank' to=""><strong>Ahmed Fahmy</strong></Link></p>
            </div>
        </footer>
    </>
  )
}
