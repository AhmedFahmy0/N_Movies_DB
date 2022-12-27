import React, { useContext, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import { Link, useLocation } from 'react-router-dom';
import {ApiData} from '../../Context/ApiStore'
import { Helmet } from "react-helmet";


export default function People() {

const { trendingPeople , getPage } = useContext(ApiData)

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
            <title>People</title>
        </Helmet>
  <div className='container my-5 animate__animated animate__fadeIn'>
    <div className='row '>
      <div className='col-md-4 d-flex align-items-center mb-4'>
        <div className=''>
          <div className='brder w-25 mb-3'></div>
          <h2 className='h2'>Trending <br /> People <br /> To Watch Them Now</h2>
          <p className='text-muted py-3'>Most Trending People By Days watshed Them Right Now</p>
          <div className='brder w-100 mt-3'></div>
        </div>
      </div>

      {trendingPeople.map( (people , index ) =>
      <div key={index} className='col-md-2 text-center g-4'>
        <Link to={`/person/${people.id}`}> <div className='movie position-relative'>
        <img src={'https://image.tmdb.org/t/p/w500'+people.profile_path} alt="" className='w-100' />
        <h3 className='h6 my-2'>{people.name}</h3>
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