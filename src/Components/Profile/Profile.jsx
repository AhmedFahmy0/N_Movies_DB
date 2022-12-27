import React, { useContext, useEffect , useState} from 'react'
import { Link } from 'react-router-dom';
import { ListContext } from '../../Context/ListContext';import './Profile_style.css'
// import Avatar from 'react-avatar';
import { Helmet } from "react-helmet";
import { Avatar } from 'evergreen-ui'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';




export default function Profile({userData}) {


let fname = userData.first_name
let lname = userData.last_name

let { itemList, setItemList } = useContext(ListContext)

const [image, setimage] = useState('')
const [displayBasic, setDisplayBasic] = useState(false);


function setFav(movie) {
if (itemList.some(x => x.id === movie.id)) {
itemList.splice(itemList.findIndex(x => x.id === movie.id), 1)
let x = [...itemList]
localStorage.setItem("userList", JSON.stringify(x))
setItemList(x)
}
else {
itemList.push(movie);
let x = [...itemList]
localStorage.setItem("userList", JSON.stringify(x))
setItemList(x)
}
}
useEffect(() => {
if (localStorage.getItem("userList") != null) {
setItemList(JSON.parse(localStorage.getItem("userList")))
}
}, [])


return (
<>
<Helmet>
            <title>My List ❤️</title>
</Helmet>
    <div className='container g-0' style={{marginTop:'10rem'}}>
        <div className='row g-0'>
            <div className='col-md-4 me-5 d-flex flex-column align-items-center justify-content-center text-center'>
                {/* <Avatar name={fullname} textSizeRatio={3} size={250} round="150px" className='bg-info me-5' /> */}
                <Avatar name={userData.first_name +' '+userData.last_name} size={200} src={image}/>


                {/* <InputText type='file' 
                className='btn btn-outline-info mt-3'
                accept='/image/*'
                onChange ={(event) => {
                    const file = event.target.files[0];
                    if (file && file.type.substring(0,5)==='image')
                    {
                        setimage(file);
                    }
                    else {
                        setimage(null)
                    }}}
                /> */}
            </div>
            <div className='col-md-7 mt-5 '>
                <h3>First Name : <span className='text-info'>{fname}</span> </h3>
                <h3>Last Name : <span className='text-info'>{lname}</span> </h3>
                <h3>Email : <span className='text-info'>{userData.email}</span></h3>
            </div>
        </div>
    </div>
    <div className="container pt-5 animate__animated animate__fadeIn">
        <div className="row">
            <h3 className='text-center text-info mb-4'>The Favorites list ❤️ </h3>
                {itemList?.length > 0 ? itemList?.filter((movie) => movie.poster_path !== null).reverse().map((movie, index)=>
            <div key={index} className='col-md-2 mb-3'>
                <Link to={`/media_details/${movie.name ? 'tv' : 'movie'}/${movie.id}`}>
                <div className='position-relative cardOverParent'>
                    <img className='img-fluid' src={`https://image.tmdb.org/t/p/w500` + movie.poster_path} alt="" />
                    <div className='cardOverlay'><i onClick={(e)=> { setFav(movie); e.preventDefault() }}
                            className={'fa-solid fa-heart fs-5 me-2 ' + (itemList?.filter(x => x.id === movie.id).length
                            > 0 ? 'text-danger animate__animated animate__fadeIn' : null)}></i> </div>
                </div>
                <h4 className='h6 text-center my-2'>{movie.title ? movie.title : movie.name}</h4>
                </Link>
            </div>
            ) : <div className='text-center mt-5'>
                <h1>Your List Is Empty!</h1>
            </div>}
            
        </div>
    </div>
</>
)
}