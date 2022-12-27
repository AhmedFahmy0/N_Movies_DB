import React, { useEffect, useState } from 'react'
import Layout from './Components/Layout/Layout';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import People from './Components/People/People';
import Tv from './Components/Tv/Tv';
import jwtDecode from 'jwt-decode';
import MediaDetails from './Components/MediaDetails/MediaDetails';
import { Offline } from 'react-detect-offline';
import ApiDataProvider from './Context/ApiStore';
import Profile from './Components/Profile/Profile';
import PersonDetails from './Components/personDetails/PersonDetails';


export default function App() {

const [userData, setUserData] = useState(null)

function saveUserData(){
let encodedToken = localStorage.getItem('userToken')
let decodedToken = jwtDecode(encodedToken)
setUserData(decodedToken)
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
<Login saveUserData={saveUserData}/>
</>
}
}


let router = createBrowserRouter([
{path:'' , element:<Layout removeUserData={removeUserData} userData={userData} /> , children:[
{path:'login' , element:<Login saveUserData={saveUserData} userData={userData}/>},
{path:'register' , element:<Register userData={userData}/>},
{index:true , element:<ProtectedRoute> <Home /> </ProtectedRoute> },
{path:'media_details/:media_type/:id' , element:<ProtectedRoute> <MediaDetails /> </ProtectedRoute>},
{path:'movies' , element:<ProtectedRoute> <Movies /> </ProtectedRoute>},
{path:'tv' , element:<ProtectedRoute> <Tv /> </ProtectedRoute>},
{path:'people' , element:<ProtectedRoute> <People /> </ProtectedRoute>},
{ path: 'person/:id', element: <ProtectedRoute><PersonDetails /></ProtectedRoute> },
{path:'profile' , element:<ProtectedRoute> <Profile userData={userData}/> </ProtectedRoute>},
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