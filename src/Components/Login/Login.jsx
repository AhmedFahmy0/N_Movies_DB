import axios from 'axios'
import Joi from 'joi'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'






export default function Login({saveUserData , userData}) {

const [user, setUser] = useState({
email:"",
password:"",
})
const [error, setError] = useState('')
const [loading, setLoading] = useState(false)
const navigate = useNavigate()
const [errorList, setErrorList] = useState([])

function getUserData(e){
let myUser = {...user}
myUser[e.target.name] = e.target.value
setUser(myUser)
// $(e.target).next().html('')
}

async function sendLoginData(){
let {data} = await axios.post('https://sticky-note-fe.vercel.app/signin', user)
if (data.message === 'success') {
setLoading(false)
localStorage.setItem('userToken' , data.token )
saveUserData()
navigate('/')
}else{
setLoading(false)
setError(data.message)
}
}

function submitLogin(e){
setLoading(true)
e.preventDefault()
let validate = validateLoginFrom()
if(validate.error){
setLoading(false)
setErrorList(validate.error.details)
}else{
sendLoginData()
}
}

function validateLoginFrom(){
let scheme = Joi.object({
email:Joi.string().email({ tlds:['com','net']}).required(),
password:Joi.string().required().pattern(/^[0-9]{3,9}/)
})
return scheme.validate(user , {abortEarly:false})
}

// useEffect(()=>{
//   if(userData !==null)
//   {
//       navigate('/')
//   }
// })

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

<div  style={{marginTop:'10rem'}}>
  <form onSubmit={submitLogin} className='my-5 w-50 mx-auto'>

    <label htmlFor="email">Email :</label>
    <input onChange={getUserData} type="email" className='form-control my-2 my-input' name='email' />
    {errorList.length > 0?<p className='text-danger error-form  my-2 h5'>
      {errorList.filter(err => err.context.label === 'email' )[0]?.message}
    </p>:''}

    <label htmlFor="password">Password :</label>
    <input onChange={getUserData} type="password" className='form-control my-2 my-input' name='password' />
    {errorList.length>0?<p className='text-danger error-form  my-2 h5'>
      {errorList.filter(err => err.context.label === 'password' )[0]?.message}
    </p>:''}

    <button className='btn btn-outline-info mx-auto my-2 px-3'>
      Login
      <span>{loading === true?<i className='ms-2 fa fa-spinner fa-spin'></i>:''}</span>
    </button>
    <p className='text-secondary text-center'>New to Noxe? <Link className='text-info' to="/register">Sign up now</Link></p>

  </form>
  </div>
</>
)
}