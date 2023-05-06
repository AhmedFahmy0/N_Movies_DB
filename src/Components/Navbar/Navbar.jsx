import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar_style.css'
import $ from 'jquery'
import  axios  from 'axios';
import { ApiData } from '../../Context/ApiStore';
import { useContext } from 'react';
import icon from '../cover.png'

export default function Navbar({userData ,removeUserData}) {


let navigate = useNavigate()
function logOutUser(){
removeUserData()
navigate('/login')
}


const navbar = document.querySelector('nav');
window.onscroll = () => {
  if (window.scrollY > 20) {
    navbar.classList.add('nav-active');
  } else {
    navbar.classList.remove('nav-active');
  }
};



function toggler (){
  $('nav').toggleClass('bg-dark')
}

$('.nav-link').on('click', function () {
  $('#search').fadeOut(1000)
  $('.navbar-collapse').removeClass('show')
  $('nav').removeClass('bg-dark')
});

let { setSearchList, setCheckSearching } = useContext(ApiData);


async function getSearch(term) {
  let { data } = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&query=${term}&include_adult=false`);
  setSearchList(data.results);
}



return (
<>
  <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
    <div className="container-fluid">
    <Link onClick={() => $('#search').fadeOut(1000)} className="navbar-brand" to="/">
    <img width={90} src={icon} alt="logo" />
    </Link>
    <div onClick={toggler} className='toggler'>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    </div>
      <div className="collapse navbar-collapse text-center" id="navbarSupportedContent">
        {userData?<ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center ">
          <li className='nav-link'>
            <Link className='nav-link' to="/profile"> Profile </Link>
          </li>
          </ul>
            :
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center ">
          <li className='nav-link'>
            <Link className='nav-link' to="/"> Home </Link>
          </li>
          <li className='nav-link'>
            <Link className='nav-link' to="/movies"> Movies </Link>
          </li>
          <li className='nav-link'>
            <Link className='nav-link' to="/tv"> TvShows </Link>
          </li>
          <li className='nav-link'>
            <Link className='nav-link' to="/people"> People </Link>
          </li>
        </ul>
        }

        {/* <div className='icon ms-5'>
          <i className='fab m-2 fa-facebook'></i>
          <i className='fab m-2 fa-instagram'></i>
          <i className='fab m-2 fa-twitter'></i>
          <i className='fab m-2 fa-spotify'></i>
          <i className='fab m-2 fa-youtube'></i>
        </div> */}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
                        <li className="nav-item d-flex flex-row-reverse">


              <div className="searchBox d-flex  mx-auto">
                <input id='searchInput' onInput={(e) => { setCheckSearching(e.currentTarget.value) }} onChange={(e) => { getSearch(e.target.value) }} type="search" className='form-control m-auto ' placeholder='Search...' />
                <button className="searchButton" href="#">
                  <i  className="fa-solid fa-magnifying-glass showe"></i>
                </button>
              </div>

            </li>
          {userData ? <>

            <li className="nav-item">
              <a className="nav-link" target={'_blank'} href="https://github.com/AhmedFahmy0" rel=""><i
                  className='fa-brands fa-github ' style={{fontSize:'1.5rem'}}></i></a>
            </li>
            <li className="nav-item d-flex align-items-center  justify-content-center mx-4">
              Welcome <span className=' ms-2 text-success fw-bold'> {userData.first_name}</span>
            </li>
            <li className="nav-item">
              <span onClick={logOutUser} className="nav-link logout curs">Logout</span>
            </li>
          </> : <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
          </>}
        </ul>
      </div>
    </div>
  </nav>

</>
)
}