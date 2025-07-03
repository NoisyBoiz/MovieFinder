import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import "../styles/common.css"
import CardMovie from "../component/cardMovie.jsx";
import Pagination from "../component/pagination.jsx"
import MoviesService from "../services/movies.jsx";
import LocalStorage from "../utils/localStorage.jsx";

function Movie() {
    const {type} = useParams();
    const {t} = useTranslation();
    const [data,setData] = useState(null);
    const [allData,setAllData] = useState(null);
    const [indexPage,setIndexPage] = useState(1);
    const [totalPages,setTotalPages] = useState(0);
    const limitCard = 20;

    useEffect(()=>{
        let t = type;
        if(type === "trending") t = "trending/week"
        MoviesService.getMovies(t, LocalStorage.getLanguage()).then(res => {
            setIndexPage(1);
            setAllData(res)
            setTotalPages(Math.round(res.length/limitCard));
            setData(res.slice(0,limitCard));
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[LocalStorage.getLanguage(), type]);

    useEffect(()=>{
        if(allData===null) return
        if(LocalStorage.getShowPagination()) setData(allData.slice((indexPage-1)*limitCard,indexPage*limitCard));
        else setData(allData.slice(0, indexPage*limitCard));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[indexPage, type])

    return (
        <div className="commonContainer">
            {data!==null?
                <>
                    <h2> {t(type)} </h2>
                    <CardMovie method={"movie"} data={data}/>
                    <Pagination totalPages={totalPages} indexPage={indexPage} setIndexPage={setIndexPage} showPagination={LocalStorage.getShowPagination()}/>
                </>
            :""}
        </div>
    );
}
export default Movie;