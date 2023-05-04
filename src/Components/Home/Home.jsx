import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ApiData } from '../../Context/ApiStore'
import { ListContext } from '../../Context/ListContext';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative, Keyboard ,  } from 'swiper';
import 'swiper/css'
import 'swiper/css/bundle'
import './Home.css'
import Loading from './../Loading/Loading';
import { Helmet } from "react-helmet";


export default function Home() {



// const [movies, setMovies] = useState([])
// const [tv, setTv] = useState([])
// const [people, setPeople] = useState([])
// async function getTrending(mediaType , callback){
// let {data} = await
// axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=e965895237f83bb41461c16dc66f6191`)
// callback(data.results)
// }
// useEffect(()=>{
// getTrending('movie' , setMovies)
// getTrending('tv', setTv)
// getTrending('person' , setPeople)

// }, [] )


let {TrendingAll , currentTrend , getCurrentTrend , currentPopular , getcurrentPopular , topRated , getTopRated , anime , getAnime }   = useContext(ApiData)
let { itemList, setItemList } = useContext(ListContext)

const [TrendingBtn, setTrendingBtn] = useState(true)
const [PopularBtn, setPopularBtn] = useState(true)
const [topRatedBtn, setTopRatedBtn] = useState(true)
const [animeBtn, setAnimeBtn] = useState(true)

let imgPath = 'https://image.tmdb.org/t/p/original'

let navigate = useNavigate()


function Watch(media) {
  navigate(`/media_details/${media.name ? 'tv' : 'movie'}/${media.id}`)
}

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


return (
<>
<Helmet>
      <title>Noxe Movies</title>
    </Helmet>
{TrendingAll?.length > 0 ? <><Swiper
      slidesPerView={1}
      centeredSlides={false}
      loop={true}
      grabCursor={true}
      effect={"creative"}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      keyboard={{
        enabled: true,
      }}
      modules={[Keyboard, Autoplay, EffectCreative]}
      className="mySwiper"
    >
      {TrendingAll?.filter(img => img.backdrop_path !== null).map((media, index) => <SwiperSlide key={index}>
        <div
          id='Home'
          className='bg-cover container-fluid position-relative'
          style={{ background: `linear-gradient(to right, rgba(6, 6, 6,0.5) 40%, transparent 100% )
          , url("https://image.tmdb.org/t/p/original${media.backdrop_path}")`}}>
          <div className='ps-3  cover-Display-home col-12 col-sm-12 col-md-5 d-flex flex-column justify-content-center position-absolute '>
            <h2 className='fw-bold'>{media?.title ? media.title : media.name}</h2>
            <span className='px-2 my-2'>{new Date(media?.release_date || media?.first_air_date).getFullYear()}</span>
            <p >{media.overview}</p>
            <div className='d-flex'>
            <button onClick={() => Watch(media)} className=' me-2 btn slider-btn  d-flex align-items-center justify-content-center mt-3 animate__animated animate__fadeInUp'><i className="fa-solid fa-arrow-right-to-bracket fs-5 me-2"></i> Watch</button>
            <button onClick={() => setFav(media)} className='btn  slider-btn d-flex align-items-center justify-content-center mt-3 animate__animated animate__fadeInUp'><i className={'fa-solid fa-heart fs-5 me-2 ' + (itemList?.filter(x => x.id === media.id).length > 0 ? 'text-danger animate__animated animate__heartBeat' : null)}></i> {itemList?.filter(x => x.id === media.id).length > 0 ? 'Remove From List' : 'Add To List'}</button>
              </div>
          </div>


        </div>
      </SwiperSlide>)}
    </Swiper></> : <Loading/>}

<div className=' container-fluid my-3  '>
<div className='d-flex justify-content-center align-items-center '>
      {currentTrend? <h4 className='me-auto my-3 px-3' >Trending <span className='ms-3 text-info fw-bold'>{currentTrend[0]?.name === undefined? 'Movies' : 'Tv Shows'}</span></h4> : null}
      <div id='HomeBtns'>
          <button onClick={() => {getCurrentTrend('movie');setTrendingBtn(true)}} className={'btn me-2 slider-btn '+(TrendingBtn?'active':'')}>Movies</button>
          <button onClick={() => {getCurrentTrend('tv');setTrendingBtn(false)}} className={'btn me-2 slider-btn  '+(TrendingBtn?'':'active')}>Tv Shows</button>
        </div>
</div>
{currentTrend.length > 0 ? <>
  <Swiper
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 8,
          },
        }}
        centeredSlides={false}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        modules={[Keyboard,Autoplay]}
        className="mySwiper"
      >
        {currentTrend.filter(img => img.poster_path !== null).map((media, index) => <SwiperSlide key={index} ><Link to={`/media_details/${media.media_type}/${media.id}`}>
          <div className='cardOverParent'>
          <div className='cardOverlay'><i onClick={(e) => { setFav(media); e.preventDefault() }} className={'fa-solid fa-heart fs-5 me-2 ' + (itemList?.filter(x => x.id === media.id).length > 0 ? 'text-danger animate__animated animate__fadeIn' : null)}></i> </div>
          <img className='w-100 ' src={imgPath + media.poster_path} title={media?.name || media?.title} alt={media?.name || media?.title} />
          </div>
        <h4 className='h6 text-center my-2'>{media?.title ? media.title : media.name}</h4>
        </Link></SwiperSlide>)}
      </Swiper>
</>:<Loading/>}
</div>

<hr className='w-50 mx-auto text-info' />

<div className=' container-fluid my-3  '>
<div className='d-flex justify-content-center align-items-center '>
      {currentPopular? <h4 className='me-auto my-3 px-3' >Popular<span className='ms-3 text-info fw-bold'>{currentPopular[0]?.name === undefined? 'Movies' : 'Tv Shows'}</span></h4> : null}
      <div id='HomeBtns'>
          <button onClick={() => {getcurrentPopular('movie');setPopularBtn(true)}} className={'btn me-2 slider-btn '+(PopularBtn?'active':'')}>Movies</button>
          <button onClick={() => {getcurrentPopular('tv');setPopularBtn(false)}} className={'btn me-2 slider-btn  '+(PopularBtn?'':'active')}>Tv Shows</button>
        </div>
</div>
{currentPopular.length > 0 ? <>
  <Swiper
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 8,
          },
        }}
        centeredSlides={false}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        modules={[Keyboard,Autoplay]}
        className="mySwiper"
      >
        {currentPopular.filter(img => img.poster_path !== null).map((media, index) => <SwiperSlide key={index} >
          <Link to={`/media_details/${currentPopular[0].name ? 'tv' : 'movie'}/${media.id}`}>
          <div className='cardOverParent'>
          <img className='w-100 ' src={imgPath + media.poster_path} title={media?.name || media?.title} alt={media?.name || media?.title} />
          <div className='cardOverlay'><i onClick={(e) => { setFav(media); e.preventDefault() }} className={'fa-solid fa-heart fs-5 me-2 ' + (itemList?.filter(x => x.id === media.id).length > 0 ? 'text-danger animate__animated animate__fadeIn' : null)}></i> 
          </div>
          </div>
        <h4 className='h6 text-center my-2'>{media?.title ? media.title : media.name}</h4>
        </Link></SwiperSlide>)}
      </Swiper>
</>:<Loading/>}
</div>

<hr className='w-50 mx-auto text-info' />

<div className=' container-fluid my-3  '>
<div className='d-flex justify-content-center align-items-center '>
      {topRated? <h4 className='me-auto my-3 px-3' >Top Rated <span className='ms-3 text-info fw-bold'>{topRated[0]?.name === undefined? 'Movies' : 'Tv Shows'}</span></h4> : null}
      <div id='HomeBtns'>
          <button onClick={() => {getTopRated('movie');setTopRatedBtn(true)}} className={'btn me-2 slider-btn '+(topRatedBtn?'active':'')}>Movies</button>
          <button onClick={() => {getTopRated('tv');setTopRatedBtn(false)}} className={'btn me-2 slider-btn  '+(topRatedBtn?'':'active')}>Tv Shows</button>
        </div>
</div>
{topRated.length > 0 ? <>
  <Swiper
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 8,
          },
        }}
        centeredSlides={false}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        modules={[Keyboard,Autoplay]}
        className="mySwiper"
      >
        {topRated.filter(img => img.poster_path !== null).map((media, index) => <SwiperSlide  key={index} >
          <Link to={`/media_details/${topRated[0].name ? 'tv' : 'movie'}/${media.id}`}>
          <div className='cardOverParent'>
          <img className='w-100 ' src={imgPath + media.poster_path} title={media?.name || media?.title} alt={media?.name || media?.title} />
          <div className='cardOverlay'><i onClick={(e) => { setFav(media); e.preventDefault() }} className={'fa-solid fa-heart fs-5 me-2 ' + (itemList?.filter(x => x.id === media.id).length > 0 ? 'text-danger animate__animated animate__fadeIn' : null)}></i> 
        </div>
          </div>
        <h4 className='h6 text-center my-2'>{media?.title ? media.title : media.name}</h4>
        </Link></SwiperSlide>)}
      </Swiper>
</>:<Loading/>}
</div>

<hr className='w-50 mx-auto text-info' />

<div className=' container-fluid my-3  '>
<div className='d-flex justify-content-center align-items-center '>
      {anime? <h4 className='me-auto my-3 px-3' >Anime <span className='ms-3 text-info fw-bold'>{anime[0]?.name === undefined? 'Movies' : 'Tv Shows'}</span></h4> : null}
      <div id='HomeBtns'>
          <button onClick={() => {getAnime('movie');setAnimeBtn(true)}} className={'btn me-2 slider-btn '+(animeBtn?'active':'')}>Movies</button>
          <button onClick={() => {getAnime('tv');setAnimeBtn(false)}} className={'btn me-2 slider-btn  '+(animeBtn?'':'active')}>Tv Shows</button>
        </div>
</div>
{anime.length > 0 ? <>
  <Swiper
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 8,
          },
        }}
        centeredSlides={false}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        modules={[Keyboard,Autoplay]}
        className="mySwiper"
      >
        {anime.filter(img => img.poster_path !== null).map((media, index) => <SwiperSlide key={index} >
          <Link to={`/media_details/${anime[0].name ?'tv':'movie'}/${media.id}`}>
        <div className='cardOverParent'>
        <img className='w-100 ' src={imgPath + media.poster_path} title={media?.name || media?.title} alt={media?.name || media?.title} />
        <div className='cardOverlay'><i onClick={(e) => { setFav(media); e.preventDefault() }} className={'fa-solid fa-heart fs-5 me-2 ' + (itemList?.filter(x => x.id === media.id).length > 0 ? 'text-danger animate__animated animate__fadeIn' : null)}></i> 
        </div>
        </div>
        <h4 className='h6 text-center my-2'>{media?.title ? media.title : media.name}</h4>
        </Link></SwiperSlide>)}
      </Swiper>
</>:<Loading/>}
</div>


</>
)
}