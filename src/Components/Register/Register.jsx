import axios from 'axios'
import Joi from 'joi'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import $ from 'jquery'
import './Register_style.css'



export default function Register() {

const [user, setUser] = useState({
  first_name:"",
  last_name:"",
  email:"",
  password:"",
  age:0
})
const [error, setError] = useState('')
const [loading, setLoading] = useState(false)
const navigate = useNavigate()
const [errorList, setErrorList] = useState([])

function getUserData(e){
  let myUser = {...user}
  myUser[e.target.name] =  e.target.value
    setUser(myUser)
    // $(e.target).next().html('')
}


async function sendRegisterData(){
  let {data} = await axios.post
  ('https://sticky-note-fe.vercel.app/signup', user)
  setLoading(false)
  if (data.message === 'success') {
    navigate('/login')
  }else{
    setError(data.message)
  }
}

function submitRegister(e){
  setLoading(true)
  e.preventDefault()
  let validate = validateRegisterFrom()
  if(validate.error){
    setLoading(false)
    setErrorList(validate.error.details)
  }else{
    sendRegisterData()
  }
}



function validateRegisterFrom(){
  let scheme = Joi.object({
    first_name:Joi.string().min(3).max(20).required(),
    last_name:Joi.string().min(3).max(20).required(),
    age:Joi.number().min(16).max(80).required(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().required().pattern(/^[0-9]{3,8}/)
  })
  return scheme.validate(user , {abortEarly:false})
}


  return (
    <>
      {error.length >0 ? <div className= "toast animate__animated animate__fadeInDown notification" role="alert" aria-live="assertive" aria-atomic="true"> 
      <div className="toast-body text-center notf-border position-relative ">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {error}
            </div>
        </div> : null}

<div className='bgImage d-flex mt-5' >
      <form onSubmit={submitRegister} className=' form-body w-50 mx-auto my-auto p-4'>

    <label htmlFor="first_name">First Name :</label>
    <input onChange={getUserData}  type="text" className='form-control my-2 my-input' name='first_name' />
    { errorList.length > 0 ? <p className='text-danger error-form  my-2 h5'>
      {errorList.filter(err => err.context.label === 'first_name' )[0]?.message}
    </p>:''}

    <label htmlFor="last_name">Last Name :</label>
    <input onChange={getUserData} type="text" className='form-control my-2 my-input' name='last_name' />
    {errorList.length > 0 ? <p className='text-danger error-form  my-2 h5'>
      {errorList.filter(err => err.context.label === 'last_name' )[0]?.message}
    </p>: ''}

    <label htmlFor="age">Age :</label>
    <input onChange={getUserData} type="number" className='form-control my-2 my-input' name='age' />
    {errorList.length > 0? <p className='text-danger error-form  my-2 h5'>
      {errorList.filter(err => err.context.label === 'age' )[0]?.message}
    </p>:''}

    <label htmlFor="email">Email :</label>
    <input onChange={getUserData} type="email" className='form-control my-2 my-input' name='email' />
    {errorList.length > 0? <p className='text-danger error-form  my-2 h5'>
      {errorList.filter(err => err.context.label === 'email' )[0]?.message}
    </p>:''}

    <label htmlFor="password">Password :</label>
    <input onChange={getUserData} type="password" className='form-control my-2 my-input' name='password' />
    {errorList.length>0? <p className='text-danger error-form  my-2 h5'>
      {/* {errorList.filter(err => err.context.label === 'password' )[0]?.message} */}
      Write the password only numbers, a minimum of three numbers and a maximum of eight numbers Like 123456
    </p>:''}

    <button className='btn btn-outline-info bu  my-2 px-3'>
      Register 
      <span>{loading === true?<i className='ms-2 fa fa-spinner fa-spin'></i>:''}</span>
      </button>

      </form>
      </div>

    </>
  )
}