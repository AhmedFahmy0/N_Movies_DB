import axios from "axios";
import {
    createContext,
    useEffect,
    useState
} from "react";

export let ApiData = createContext([]);

function ApiDataProvider(props) {
    const [TrendingAll, setTrendingAll] = useState([]);
    const [currentTrend, setcurrentTrend] = useState([]);
    const [currentPopular, setcurrentPopular] = useState([]);
    const [topRated, settopRated] = useState([]);
    const [anime, setAnime] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingTv, setTrendingTv] = useState([]);
    const [trendingPeople, setTrendingPeople] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [searchList, setSearchList] = useState(null);
    const [CheckingSearch, setCheckSearching] = useState("");

    async function getTrendingAll() {
        let {
            data
        } = await axios.get(
            "https://api.themoviedb.org/3/trending/all/day?api_key=e965895237f83bb41461c16dc66f6191"
        );
        setTrendingAll(data.results);
    }

    async function getCurrentTrend(currentPop) {
        let {
            data
        } = await axios.get(
            `https://api.themoviedb.org/3/trending/${
        currentPop ? currentPop : "movie"
        }/day?api_key=e965895237f83bb41461c16dc66f6191`
        );
        setcurrentTrend(data.results);
    }

    async function getcurrentPopular(currentPop) {
        let {
            data
        } = await axios.get(
            `https://api.themoviedb.org/3/${
        currentPop ? currentPop : "movie"
        }/popular?api_key=e965895237f83bb41461c16dc66f6191`
        );
        setcurrentPopular(data.results);
    }

    async function getTopRated(currentPop) {
        let {
            data
        } = await axios.get(
            `https://api.themoviedb.org/3/${
        currentPop ? currentPop : "movie"
        }/top_rated?api_key=e965895237f83bb41461c16dc66f6191`
        );
        settopRated(data.results);
    }

    async function getAnime(currentPop) {
        let {
            data
        } = await axios.get(
            `https://api.themoviedb.org/4/discover/${ currentPop ? currentPop : "movie"}?&with_genres=16&with_keywords=210024|287501&api_key=e965895237f83bb41461c16dc66f6191`
        );
        setAnime(data.results);
    }

    async function getTrendingMovies() {
        let {
            data
        } = await axios.get(
            `https://api.themoviedb.org/3/trending/movie/day?api_key=e965895237f83bb41461c16dc66f6191&page=${currentPage}`
        );
        setTrendingMovies(data.results);
    }
    async function getTrendingTv() {
        let {
            data
        } = await axios.get(
            `https://api.themoviedb.org/3/trending/tv/day?api_key=e965895237f83bb41461c16dc66f6191&page=${currentPage}`
        );
        setTrendingTv(data.results);
    }
    async function getTrendingPersons() {
        let {
            data
        } = await axios.get(
            `https://api.themoviedb.org/3/trending/person/day?api_key=e965895237f83bb41461c16dc66f6191&page=${currentPage}`
        );
        setTrendingPeople(data.results);
    }

    function getPage(page) {
        setcurrentPage(page);
    }

    useEffect(() => {
        getTrendingAll();
        getCurrentTrend();
        getcurrentPopular();
        getTopRated();
        getAnime();
        getTrendingMovies();
        getTrendingTv();
        getTrendingPersons();
    }, [currentPage]);

    return ( <ApiData.Provider value = {
            {
                TrendingAll,
                currentTrend,
                currentPopular,
                topRated,
                anime,
                trendingMovies,
                trendingTv,
                trendingPeople,
                getCurrentTrend,
                getcurrentPopular,
                getTopRated,
                getAnime,
                getTrendingMovies,
                getTrendingTv,
                getTrendingPersons,
                getPage,
                searchList,
                setSearchList,
                setCheckSearching,
                CheckingSearch,
            }
        } >
        {    props.children
        }</ApiData.Provider>
    );
}

export default ApiDataProvider;