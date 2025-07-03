import React, {useState, useEffect} from "react";
import {useParams } from "react-router-dom";
import {useTranslation} from 'react-i18next';
import "../styles/common.css"
import "../styles/search.css"
import CardMovie from "../component/cardMovie.jsx";
import Pagination from "../component/pagination.jsx"
import LocalStorage from "../utils/localStorage.jsx";
import MoviesService from "../services/movies.jsx";
import GenresService from "../services/genres.jsx";

function Search () {
    const {t} = useTranslation();
    const {query} = useParams();
    const {isSearch} = useParams();
    const [data,setData] = useState(null);
    const [allData,setAllData] = useState(null);
    const [indexPage,setIndexPage] = useState(1);
    const [totalPages,setTotalPages] = useState(0);
    const [dataListGenres,setDataListGenres] = useState(null);
    const [genres,setGenres] = useState(null);
    const limitCard = 20;

    useEffect(()=>{
        GenresService.getAllGenres().then(res => {
            setDataListGenres(res);
        })
    },[])

    useEffect(()=>{
        if(isSearch==="1"){
            MoviesService.getMoviesByTitle(query,LocalStorage.getLanguage()).then(res => {
                setIndexPage(1);
                setAllData(res)
                setTotalPages(Math.round(res.length/limitCard));
                setData(res.slice(0,limitCard));
            })
        }
        else{
            if(dataListGenres===null) return
            if(query.includes("genres=")){
                let genres = query.split("genres=")[1].split("&")[0];
                let genresName = [];
                genres.split(",").forEach(item => {
                    dataListGenres.forEach(genre => {
                        if(genre._id===item) genresName.push(genre.name);
                    }   
                )})
                setGenres(genresName);
            }
            else setGenres(null);   
            MoviesService.filterMovies(query,LocalStorage.getLanguage()).then(res => {
                setIndexPage(1);
                setAllData(res)
                setTotalPages(Math.round(res.length/limitCard));
                setData(res.slice(0,limitCard));
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[LocalStorage.getLanguage(),query,dataListGenres]);

    useEffect(()=>{
        if(allData===null) return
        if(LocalStorage.getShowPagination()) setData(allData.slice((indexPage-1)*limitCard,indexPage*limitCard));
        else setData(allData.slice(0, indexPage*limitCard));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[indexPage])

    return (
        <div className="commonContainer">
            {isSearch==="1"&&<h2> {t("Search")}<span> {query} </span></h2>}
            {isSearch==="0"&&<div className="detailFilter">
                <h2> {t("Filter")} </h2>
                    {genres!==null&&genres.map((item,index) => {
                        return <span key={index}> {t(item)} </span>
                    })}
                </div>
            }
            {data!==null&&(data.length?
                <>
                    <CardMovie method={"movie"} data={data}/>
                    <Pagination totalPages={totalPages} indexPage={indexPage} setIndexPage={setIndexPage} showPagination={LocalStorage.getShowPagination()}/>
                </>:
                <div className="emptySearch">
                    <img src="https://cdn.glitch.global/f41a9bd0-8a31-41ac-a400-886f727e1815/search.png?v=1684402479948" alt="empty search"/>
                    <h1>{t("No results have been discovered")}</h1>
                </div>
            )}
        </div>
    );
}
export default Search;