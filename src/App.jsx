/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import Layout from './Components/Layout/Layout';
import { RouterProvider, Navigate, createHashRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import People from './Components/People/People';
import Tv from './Components/Tv/Tv';
import jwtDecode from 'jwt-decode';
import MediaDetails from './Components/MediaDetails/MediaDetails';
import { Offline } from 'react-detect-offline';
import Profile from './Components/Profile/Profile';
import PersonDetails from './Components/personDetails/PersonDetails';
import Notfound from './Components/Notfound/Notfound';
import { ApiData } from './Context/ApiStore'



export default function App() {

  const x = useContext(ApiData)
  console.log(x)

const [userData, setUserData] = useState(null)

function saveUserData(){
let encodedToken = localStorage.getItem('userToken')
let decodedToken = jwtDecode(encodedToken)
console.log(decodedToken)
setUserData(decodedToken)
// setprofil(decodedToken)
}



function removeUserData(){
localStorage.removeItem('userToken')
setUserData(null)
return <Navigate to="/login" />
}

useEffect(() => {
if (localStorage.getItem('userToken') !== null && userData == null) {
saveUserData()

}
}, [])

function ProtectedRoute({children}){
if (userData) {
return <>
  {children}
</> 
}else{
return <>
<Login saveUserData={saveUserData} userData={userData}/>
</>
}
}


let router = createHashRouter([
{path:'' , element:<Layout removeUserData={removeUserData} userData={userData} /> , children:[
{path:'login' , element:<Login saveUserData={saveUserData} userData={userData}/>},
{path:'register' , element:<Register userData={userData}/>},
{index:true , element: <Home />  },
{path:'media_details/:media_type/:id' , element:<ProtectedRoute> <MediaDetails /> </ProtectedRoute>},
{path:'movies' , element: <Movies /> },
{path:'tv' , element: <Tv /> },
{path:'people' , element:<People />},
{ path: 'person/:id', element: <ProtectedRoute><PersonDetails /></ProtectedRoute> },
{path:'profile' , element:<ProtectedRoute> <Profile userData={userData}/> </ProtectedRoute>},
{ path: '*', element: <Notfound /> }
]}
])

return (
<>
    <div>
      <Offline>
        <div className='offline'> (surprise!) You offline Now </div>
      </Offline>
    </div>
    <RouterProvider router={router} />
</>
)
}