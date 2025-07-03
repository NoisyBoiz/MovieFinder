import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import {useTranslation} from 'react-i18next';
import "../styles/navbar.css"
import LocalStorage from "../utils/localStorage.jsx";
import { MdUpcoming } from "react-icons/md";
import { GiPopcorn } from "react-icons/gi";
import { RiMovie2Fill } from "react-icons/ri";

function Navbar(){
    const {t} = useTranslation();
    const [focusNavbar, setFocusNavbar] = useState("home");
    const [userInfor,setUserInfor] = useState(null);
    const getPath = ()=>{
        let arr = window.location.pathname.split("/");
        if(arr[1]==="") setFocusNavbar("home");
        else if(arr[1]==="tvshows") setFocusNavbar(arr[2]);
        else setFocusNavbar(arr[1]);
    }
    useEffect(()=>{
        setUserInfor(LocalStorage.getUserInfo());
        getPath();
    },[]);
    const handleLogout = ()=>{
        localStorage.removeItem("user-info");
        window.location.reload();
    }
    return(
        <div className="navbar">
            <div className="navbarMenu">
                <ul> 
                    <Link to="/"> <li className={focusNavbar==="home"?"focusNavbar":"unfocusNavbar"} onClick={()=>{setFocusNavbar("home")}}> <i className="fa-solid fa-house"></i>{t("Home")} </li> </Link>
                    <Link to="/movie/upcoming"><li className={focusNavbar==="upcoming"?"focusNavbar":"unfocusNavbar"} onClick={()=>{setFocusNavbar("upcoming")}} > <i> <MdUpcoming /> </i>{t("Upcoming")}</li></Link>
                    <Link to="/movie/theatres"><li className={focusNavbar==="theatres"?"focusNavbar":"unfocusNavbar"} onClick={()=>{setFocusNavbar("theatres")}}> <i> <GiPopcorn /> </i>{t("Theatres")}</li></Link>
                    <Link to="/movie/popular"><li className={focusNavbar==="popular"?"focusNavbar":"unfocusNavbar"} onClick={()=>{setFocusNavbar("popular")}} ><i className="fa-solid fa-ticket"></i>{t("Popular")}</li></Link>
                    <Link to="/movie/trending"><li className={focusNavbar==="trending"?"focusNavbar":"unfocusNavbar"} onClick={()=>{setFocusNavbar("trending")}} ><i><RiMovie2Fill /></i>{t("Trending")}</li></Link>
                    <Link to="/collections"><li className={focusNavbar==="collections"?"focusNavbar":"unfocusNavbar"} onClick={()=>{setFocusNavbar("collections")}}><i className="fa-solid fa-inbox"></i>{t("Collections")}</li></Link>
                </ul>
            </div>
            {userInfor!==null?<div className="logOut" onClick={()=>{handleLogout()}}>
                <i className="fa-solid fa-right-from-bracket"></i> Log Out
            </div>:""}
        </div>
    )
}
export default Navbar