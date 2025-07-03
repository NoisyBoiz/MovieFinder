import React, {useEffect, useRef, useState} from "react";
import {useNavigate,Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import "../styles/header.css";
import Navbar from "./navbar.jsx";

import {BsSunFill,BsMoonFill} from 'react-icons/bs';
import {MdLanguage} from 'react-icons/md';
import {BiUserCircle} from 'react-icons/bi';
import { IoMdLogIn } from "react-icons/io";

import DragScrolling from "../utils/dragScrolling.jsx";
import DarkMode from "../utils/darkMode.jsx";
import LocalStorage from "../utils/localStorage.jsx";
import GenresService from "../services/genres.jsx";

function Header(){
    const navigate = useNavigate();
    const {t,i18n} = useTranslation();
    const [showSlider, setShowSlider] = useState(false);
    const [showMenuMobi, setShowMenuMobi] = useState(false);
    const [indexGenres, setIndexGenres] = useState([]);
    const [dataListGenres, setDataListGenres] = useState(null);
    const [showListSort, setShowListSort] = useState(false);
    const [sortBy, setSortBy] = useState(null);
    const [directionSort, setDirectionSort] = useState(false);
    const [querySearchNavbar, setQuerySearchNavbar] = useState("");
    const [dropDownLanguage,setDropDownLanguage] = useState(false);
    const [language,setLanguage] = useState(LocalStorage.getLanguage());
    const [darkMode,setDarkMode] = useState(LocalStorage.getDarkMode());
    const [userInfor,setUserInfor] = useState(null);
    const sliderRef = useRef(null);
    const menuMobiRef = useRef(null);
    const languageRef = useRef(null);
    let outsideClick = (e)=>{
        if(sliderRef.current!==null)
        if(!sliderRef.current.contains(e.target)) setShowSlider(false);
        if(menuMobiRef.current!==null) 
        if(!menuMobiRef.current.contains(e.target)) setShowMenuMobi(false);
        if(languageRef.current!==null)
        if(!languageRef.current.contains(e.target)) setDropDownLanguage(false);
    }
    useEffect(()=>{
        document.addEventListener("click",(e)=>{outsideClick(e);});
    })
    const updateindexGenres = (x)=>{
        indexGenres.includes(x)?setIndexGenres(indexGenres.filter(item=>item!==x)):setIndexGenres([...indexGenres,x]);
    }
    const searchFunc = ()=>{
        if(querySearchNavbar==="") return;
        document.getElementsByName('searchInput')[0].value="";
        navigate('/search/1/'+querySearchNavbar);
    }

    const filterFunc = ()=>{
        if(indexGenres.length===0&&sortBy===null) return;
        let arrGenres = [];
        for(let i=0;i<indexGenres.length;i++){
            arrGenres.push(dataListGenres[indexGenres[i]]._id);
        }
        let listUrl = [];
        if(indexGenres.length) listUrl.push("genres="+arrGenres.join(","));
        if(sortBy!==null) listUrl.push("sort_by="+sortBy.method + (directionSort?".asc":".desc"));
        let url = listUrl.join("&");    
        navigate('/search/0/'+url);
    }
    useEffect(()=>{
        setUserInfor(LocalStorage.getUserInfo());
        GenresService.getAllGenres().then(res=>{
            setDataListGenres(res);
        })
    },[])

    const changeLanguage = (lang) => {
        LocalStorage.setLanguage(lang);
        i18n.changeLanguage(lang)
    }

    const changeSortBy = (method,name)=>{
        if(sortBy===null) setSortBy({method:method,name:name});
        else if(sortBy.method===method) setSortBy(null);
        else setSortBy({method:method,name:name});
    }

    return(
        <>
        <div className={`maskOutClick ${(showSlider||showMenuMobi)?"showMaskOutClick":"hiddenMaskOutClick"}`}></div>
        <div className="header" >
            <div className="headerContainer">
                <div className="menuMobi" ref={menuMobiRef}>
                    <i className="fa-solid fa-bars iconMenu" onClick={()=>{setShowMenuMobi(!showMenuMobi)}}></i>
                    <div className={`navbarMobi ${showMenuMobi? "showNavbarMobi":"hiddenNavbarMobi"}`}>
                        <Navbar/>
                    </div>  
                </div>
                <div className="logoWeb"><Link to="/"><h1><span>MO</span><span>VIE</span></h1></Link></div>
                <div ref={sliderRef} className="searchNavBarContainer">
                    <div className="searchInputNavBar">
                        <i onClick={()=>{searchFunc()}} className="searchButtonNavBar fa-solid fa-magnifying-glass"></i>
                        <input type="text" name="searchInput" placeholder={t("Search")} onChange={(e)=>{setQuerySearchNavbar(e.target.value)}} onKeyDown={(e)=>{if(e.key==="Enter"){searchFunc()}}}/>
                        <i className="searchSliderNavBar fa-solid fa-sliders" onClick={()=>{setShowSlider(!showSlider)}}></i> 
                    </div>
                    <div className={showSlider?"showSliderBar":"hiddenSliderBar"} >
                        <button className="buttonFilter" onClick={filterFunc}> {t("Filter")} </button>
                        <div className="sliderSort" onMouseMove={()=>{setShowListSort(true)}} onMouseOut={()=>{setShowListSort(false)}}>
                            <p className={sortBy!=null?"focusSort":"unfocusSort"}> {sortBy==null?t("Arrange"):t(sortBy.name)} <i className={`fa-solid fa-arrow-down ${directionSort?"upSort":"downSort"}`} onClick={()=>{setDirectionSort(!directionSort)}}></i> <button className={`clearIndexSort ${sortBy==null?"addIndexSort":"removeIndexSort"}`} onClick={()=>{setSortBy(null);}}> + </button> </p>
                            <div className={showListSort?"showListSort":"hiddenListSort"}>
                                <ul>
                                    <li className={sortBy!==null&&sortBy.method==="release_date"?"chooseSort":"unchooseSort"} onClick={()=>{changeSortBy("release_date","Release Date")}}> {t("Release Date")} </li>
                                    <li className={sortBy!==null&&sortBy.method==="vote_average"?"chooseSort":"unchooseSort"} onClick={()=>{changeSortBy("vote_average","Vote Average")}}> {t("Vote Average")} </li>
                                    <li className={sortBy!==null&&sortBy.method==="vote_count"?"chooseSort":"unchooseSort"} onClick={()=>{changeSortBy("vote_count","Vote Count")}}> {t("Vote Count")} </li>
                                </ul>
                            </div>
                        </div>
                        <div className="sliderGenres" > 
                            <p className={indexGenres.length?"focusGenres":"unfocusGenres"} > <span> {indexGenres.length} </span> {t("Genres")} <button className={`clearIndexGenres ${indexGenres.length?"removeIndexGenres":"addIndexGenres"}`} onClick={()=>{setIndexGenres([]);}}> + </button> </p>
                            <div className="listGenres" onMouseDown={(e)=>{DragScrolling(e,"listGenres")}}>
                                <ul>
                                    {dataListGenres!==null&&dataListGenres.map((item, index)=>{
                                        return(
                                            <li key={index} className={indexGenres.includes(index)?"chooseGenre":"unchooseGenre"} onClick={()=>{updateindexGenres(index)}}>{t(item.name)}<span className={indexGenres.includes(index)?"addIconGenres":"removeIconGenres"}>+</span></li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-action"> 
                    <div className="settingHeader"> 
                        <div className="dropDownLanguage" ref={languageRef}>
                            <p className="gr-language" onClick={()=>{setDropDownLanguage(!dropDownLanguage)}}> <MdLanguage/> </p>
                            <div className={dropDownLanguage?"showDropDownLanguage":"hiddenDropDownLanguage"}>
                                <ul>
                                    <li className={language==='vi'?"focusLanguage":""} onClick={()=>{changeLanguage("vi"); setLanguage("vi")}}> {t("Vietnamese")} </li>
                                    <li className={language==='en'?"focusLanguage":""} onClick={()=>{changeLanguage("en"); setLanguage("en")}}> {t("English")} </li>
                                    <li className={language==='ru'?"focusLanguage":""} onClick={()=>{changeLanguage("ru"); setLanguage("ru")}}> {t("Russian")} </li>
                                    <li className={language==='ja'?"focusLanguage":""} onClick={()=>{changeLanguage("ja"); setLanguage("ja")}}> {t("Japanese")} </li>
                                </ul>
                            </div>
                        </div>
                        <div className="darkModeHeader">{!darkMode?<p className="bs-sun" onClick={()=>{LocalStorage.setDarkMode(true);setDarkMode(true);DarkMode(true);}}> <BsMoonFill/> </p>:<p className="bs-moon" onClick={()=>{LocalStorage.setDarkMode(false);setDarkMode(false);DarkMode(false);}}><BsSunFill/></p>}</div>
                    </div>
                    <div className="loginHeader"> 
                        {userInfor!==null? <div className="loginInfor"> <p className="bi-user"><BiUserCircle/></p> {userInfor.name} </div>: 
                        <> 
                        <Link to="/login/login" className="loginButton"> <p className="bi-user"> <BiUserCircle/> </p> <span> {t("Sign In")} </span> </Link>
                        <Link to="/login/signup" className="loginButton"> <p className="bi-user"> <IoMdLogIn /> </p> <span> Sign Up </span> </Link>
                        </>} 
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Header