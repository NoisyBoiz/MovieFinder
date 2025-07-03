import React, {useEffect, useState, useRef} from "react";
import { Link } from "react-router-dom";
import {useTranslation} from 'react-i18next';
import "../styles/home.css";
import "../styles/common.css";
import {GoStar} from 'react-icons/go';

import CardMovie from "../component/cardMovie.jsx";
import Pagination from "../component/pagination.jsx"
import StyleTitle from "../utils/styleTitle";
import DragScrolling from "../utils/dragScrolling";
import MoviesService from "../services/movies.jsx";
import LocalStorage from "../utils/localStorage.jsx";
import { useNotification } from "../component/notification.jsx";
import FavoriteService from "../services/favorites.jsx";
// import { use } from "i18next";

function Home(){
    const {t} = useTranslation();
    const navigate = useNotification();
    const { notify } = useNotification();
    const posterURL = "https://image.tmdb.org/t/p/w500";
    const backDropURL ="https://image.tmdb.org/t/p/w1280";
    const [dataTrendingDay,setDataTrendingDay] = useState(null);
    const [dataTrendingWeek,setDataTrendingWeek] = useState(null);
    const [dataBackDrop,setDataBackDrop] = useState(null);
    const [indexSlide, setIndexSlide] = useState(0);
    const [indexSlideFlash, setIndexSlideFlash] = useState(0);
    const [preIndexSlide, setPreIndexSlide] = useState(0);
    const [trendingTime, setTrendingTime] = useState(0);
    const [totalPages,setTotalPages] = useState(0);
    const [allDataPopular,setAllDataPopular] = useState(null);
    const [dataPopular,setDataPopular] = useState(null);
    const [indexPage,setIndexPage] = useState(1);
    const [arrFavorite,setArrFavorite] = useState([]);
    const limitCard = 10;
    let timeOut = useRef(null);

    useEffect(()=>{
        const user = LocalStorage.getUserInfo();
        if(user!==null){
            FavoriteService.getFavorite(user.id).then(res=>{
                setArrFavorite(res);
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const scrollTop = ()=>{
        window.scrollTo(0,0);
    }
    const cmpDate = (x)=>{
        return new Date(x).getTime()>new Date().getTime()?true:false;
    }
    const formatTime = (time) => {
        return new Date(time).toLocaleDateString()
    }
    // get data back drop 
    useEffect(()=>{
        MoviesService.getMovies('upcoming', LocalStorage.getLanguage()).then((res) => {
            setDataBackDrop(res);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[LocalStorage.getLanguage()]);
    // get data trending
  
    useEffect(()=>{
        MoviesService.getMovies((trendingTime===0?"trending/day":"trending/week"), LocalStorage.getLanguage()).then((res) => {
            trendingTime===0?setDataTrendingDay(res):setDataTrendingWeek(res)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[trendingTime,LocalStorage.getLanguage()]);

    const changeIndexSlice = (x) => {
        setIndexSlideFlash(x);
        document.getElementsByClassName('homeBackDrop')[0].style.opacity = 0;
        setTimeout(()=>{
            if(indexSlide!==undefined) setIndexSlide(x);
            setTimeout(()=>{
                if(document.getElementsByClassName('homeBackDrop')[0]!==undefined)
                    document.getElementsByClassName('homeBackDrop')[0].style.opacity = 1;
            },20);
        },360);
    }
   
    // animation slide backdrop
    const moveSlideBackDrop = (x)=>{
        RemoveTimeOut();
        if(x!==preIndexSlide&&document.querySelector('.homePosterBox')!==null){
            changeIndexSlice(x);
            let n=x;
            if(x<preIndexSlide) n--;
            let width = document.querySelector('.homePosterBox').offsetWidth;
            if(n===1) width=width/1.5;
            if(n>dataBackDrop.length/2) {
                if(x>preIndexSlide) width=width*1.09;
                else width=width*1.16;
            }
            document.getElementsByClassName('homeSlideCard')[0].scrollTo({left:width*n,top: 0,behavior:'smooth'});
            setPreIndexSlide(x);
        }
    }

    const timeSlide = ()=>{
        RemoveTimeOut();
        if(dataBackDrop===null) return
        if(indexSlide<dataBackDrop.length - 1) moveSlideBackDrop(indexSlide+1);
        else moveSlideBackDrop(0);
    }

    useEffect(()=>{
        RemoveTimeOut();
        timeOut.current = setTimeout(timeSlide,5000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[indexSlide,dataBackDrop]);

    const RemoveTimeOut = ()=>{
        if(timeOut.current!==null){
            clearTimeout(timeOut.current);
            timeOut.current = null;
        }
    }

    useEffect(()=>{
        let hiddenElement,showELement,hiddenImg,showImg;
        if(trendingTime){
            hiddenElement = document.getElementsByClassName("trendingSlideDay");
            showELement = document.getElementsByClassName("trendingSlideWeek");
            hiddenImg = document.getElementsByClassName("styleImgTrending1");
            showImg = document.getElementsByClassName("styleImgTrending2");
        }
        else {
            hiddenElement = document.getElementsByClassName("trendingSlideWeek");
            showELement = document.getElementsByClassName("trendingSlideDay");
            hiddenImg = document.getElementsByClassName("styleImgTrending2");
            showImg = document.getElementsByClassName("styleImgTrending1");
        }
        if(hiddenElement[0]!==undefined) hiddenElement[0].style.opacity = "0";
        if(hiddenImg!==undefined)
        Array.from(hiddenImg).forEach((element,index) => {
            element.style.transform = "translateY(-100%)";
            element.style.transitionDelay = 0.05*index+"s";
        });
        setTimeout(()=>{
            if(hiddenElement[0]!==undefined) hiddenElement[0].style.display = "none";
            setTimeout(()=>{
                if(showELement[0]!==undefined){
                    showELement[0].style.display = "flex";
                    showELement[0].style.opacity= 0;
                    if(showImg!==undefined) Array.from(showImg).forEach(element =>{element.style.transform = "translateY(100%)";});
                    showELement[0].scrollTo({left:0,top: 0});
                }
                setTimeout(()=>{
                    if(showELement[0]!==undefined) showELement[0].style.opacity = 1;
                    if(showImg[0]!==undefined)
                    Array.from(showImg).forEach((element,index) => {
                        element.style.transform = "translateY(0%)";
                        element.style.transitionDelay = 0.05*index+"s";
                    });
                },20);
            },20);
        },500);
    },[trendingTime])
   
    useEffect(()=>{
        MoviesService.getMovies("popular",LocalStorage.getLanguage()).then(res => {
            setIndexPage(1);
            setAllDataPopular(res)
            setTotalPages(Math.round(res.length/limitCard));
            setDataPopular(res.slice(0,limitCard));
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[LocalStorage.getLanguage()]);

    useEffect(()=>{
        if(allDataPopular===null) return
        if(LocalStorage.getShowPagination()) setDataPopular(allDataPopular.slice((indexPage-1)*limitCard,indexPage*limitCard));
        else setDataPopular(allDataPopular.slice(0, indexPage*limitCard));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[indexPage])

    const handleFavorite = (id) => {
        const userInfor = LocalStorage.getUserInfo();
        if(userInfor===null){
            notify({
                type: "alert",
                title: t("Not logged in"),
                message: t("You need to log in to perform this action"),
                titleAccept: t("Sign In"),
                titleCancel: t("Cancel"),
                onCancel: () => navigate("/"),
                onAccept: () => navigate("/login/login"),
            });
            return
        }
        let data = {
            id: userInfor.id,
            idMovie: id
        }
        FavoriteService.updateFavorite(data).then(res=>{
            if(res.status===200){
                setArrFavorite(res.data);
            }
        })
    }
    
    return(
        <>
        <div className="home">
            <div className="homeTop"> 
                {dataBackDrop!==null?
                    <div className="homeBackDrop" > 
                        <div className="imgBackDrop"><img src={backDropURL + dataBackDrop[indexSlide]._id.backdrop_path} alt="backdrop"/></div>
                        <div className="backDropContent"> 
                            <div className="topBDContent">
                                <div className="backDropComing" style={cmpDate(dataBackDrop[indexSlide]._id.release_date)?{opacity:1}:{opacity:0}}> {t("Coming Soon")} </div>
                                <div className="bottomTBDContent">
                                    <span className="backDropTime"> {formatTime(dataBackDrop[indexSlide]._id.release_date)} </span>
                                    <span className="backDropRate"> <span className="rateAverage"> <p> <GoStar/> </p> {Math.floor(dataBackDrop[indexSlide]._id.vote_average*10)/10} </span>  <span className="backDropVoteCount"> {dataBackDrop[indexSlide]._id.vote_count} </span> </span> 
                                    <div className="backDropGenres"> 
                                        {dataBackDrop[indexSlide]._id.genre_ids.map((item,index)=>{
                                            return(<div key={index}>{t(item)}</div>)
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="backDropTitle">{StyleTitle(dataBackDrop[indexSlide].title)}</div>
                            <div className="backDropOverview">{dataBackDrop[indexSlide].overview}</div>
                            <div className="bottomBDContent">
                                <Link to={"/detail/"+dataBackDrop[indexSlide]._id._id} className="buttonDetailBD" onClick={scrollTop}>
                                    <button> {t("Detail")} </button>
                                </Link>
                                <button className={`buttonFavoriteBD ${arrFavorite.includes(dataBackDrop[indexSlide]._id._id)?"activeFavorite":"inactiveFavorite"}`} onClick={()=>{handleFavorite(dataBackDrop[indexSlide]._id._id)}}> <i className="fa-solid fa-heart"></i> {t("Favorite")} </button>
                            </div>
                        </div>
                    </div>
                :""
                }
                <div className="homeSlideContainer">
                    <div className="homeSlideCard">
                        {dataBackDrop!==null&&dataBackDrop.map((item,index)=>{
                            return(
                                <div key = {item._id._id} className="homePosterBox" onClick={()=>{moveSlideBackDrop(index)}}>
                                    <img src={posterURL+item._id.poster_path} alt="backdrop" className={indexSlideFlash===index?"focusPoster":"unfocusPoster"}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="homeContent">
                <div className="trendingContainer">
                    <div className="timeTrending"> <h2>{t("Trending")}</h2> <button onClick={()=>{setTrendingTime(0);}} className={trendingTime?"unfocusTrendingTime":"focusTrendingTime"}> {t("Day")} </button> <button onClick={()=>{setTrendingTime(1);}} className={trendingTime?"focusTrendingTime":"unfocusTrendingTime"}> {t("Week")} </button></div>
                    <div className="trendingBox">
                        <div className="trendingSlide trendingSlideDay" onMouseDown={(e)=>{DragScrolling(e,'trendingSlideDay')}} >
                            {dataTrendingDay!==null&&dataTrendingDay.map((item,index)=>{
                                return(
                                    <div key = {index} className="trendingCard styleImgTrending1">
                                        <Link to={"/detail/"+item._id._id} key = {item._id._id} onClick={scrollTop}>
                                            <img src={posterURL+item._id.poster_path} alt="Trending"/>
                                            {cmpDate(item._id.release_date)&&<p className="trendingCardComing">{t("Coming Soon")}</p>}
                                            <p className="trendingCardRate"> {Math.floor(item._id.vote_average*10)/10} </p>
                                            <div className="trendingCardContent">
                                                <p className="trendingCardName"> {item.title} </p>
                                                <p className="trendingCardDay"> {formatTime(item._id.release_date)} </p>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="trendingSlide trendingSlideWeek" onMouseDown={(e)=>{DragScrolling(e,'trendingSlideWeek')}} >
                            {dataTrendingWeek!==null&&dataTrendingWeek.map((item,index)=>{
                                return(
                                    <div key = {index} className="trendingCard styleImgTrending2">
                                        <Link to={"/detail/"+item._id._id} key = {item._id._id} onClick={scrollTop}>
                                            <img src={posterURL+item._id.poster_path} alt="Trending"/>
                                            {cmpDate(item._id.release_date)&&<p className="trendingCardComing">{t("Coming Soon")}</p>}
                                            <p className="trendingCardRate"> {Math.floor(item._id.vote_average*10)/10} </p>
                                            <div className="trendingCardContent">
                                                <p className="trendingCardName"> {item.title} </p>
                                                <p className="trendingCardDay"> {formatTime(item._id.release_date)} </p>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="commonContainer">
                    <h2> {t("Popular")} </h2>
                    {dataPopular!==null&&<>
                        <CardMovie data={dataPopular}/>
                        <Pagination totalPages={totalPages} indexPage={indexPage} setIndexPage={setIndexPage} showPagination={LocalStorage.getShowPagination()}/>
                    </>
                    }
                </div>
            </div>
        </div>
        </>
    )
}
export default Home