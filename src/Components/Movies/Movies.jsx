import React, { useContext, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import { Link, useLocation } from 'react-router-dom';
import {ApiData} from '../../Context/ApiStore'
import { Helmet } from "react-helmet";


export default function Movies() {

const { trendingMovies , getPage } = useContext(ApiData)
const handlePageClick = async (e) => {
let currentPage = e.selected + 1
getPage(currentPage)
}

let location = useLocation();
useEffect(() => {
getPage(1)
}, [location.pathname])

return (
<>
<Helmet>
            <title>Movies</title>
        </Helmet>
  <div className='container my-5 animate__animated animate__fadeIn'>
    {/* <div className='container d-flex justify-content-center align-items-center'>
      <button className='btn btn-info my-5 mx-3'>Trending</button>
      <button className='btn btn-info my-5 mx-3'>Popular</button>
      <button className='btn btn-info my-5 mx-3'>Top Rated</button>
    </div> */}
    <div className='row '>
      <div className='col-md-4 d-flex align-items-center mb-4 '>
        <div className=''>
          <div className='brder w-25 mb-3'></div>
          <h2 className='h2'>Trending <br /> Movies <br /> To Watch Now</h2>
          <p className='text-muted py-3'>Most Watched Movies By Days Watched Righte Now</p>
          <div className='brder w-100 mt-3'></div>
        </div>
      </div>

      {trendingMovies.map( (movie , index ) =>
      <div key={index} className='col-md-2 text-center g-4'>
        <Link to={`/media_details/${movie.media_type}/${movie.id}`}> <div className='movie position-relative'>
        <img src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} alt="" className='w-100' />
        <h3 className='h6 my-2'>{movie.title}</h3>
        <div className='vote p-2 text-white position-absolute top-0 end-0'>{movie.vote_average?.toFixed(1)}</div>
      </div>
      </Link>
    </div>)}
    <div className='mt-5'>
      <ReactPaginate previousLabel={'< previous'} nextLabel={'next>'}
        breakLabel={'...'}
        pageCount={1000}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link bg-dark'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link bg-dark'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link bg-dark'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link bg-dark'}
        activeClassName={'active'}
        />
    </div>
  </div>
  </div>

</>
)
}