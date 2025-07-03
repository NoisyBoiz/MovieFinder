import React,{useRef} from "react";
import { Link } from "react-router-dom";
import {useTranslation} from 'react-i18next';
import "../styles/common.css";

function CardMovie({method,data}){
    const {t} = useTranslation();
    const posterURL = useRef("https://image.tmdb.org/t/p/w500");
    const scrollTop = ()=>{
        window.scrollTo(0,0);
    }
    const cmpDate = (x)=>{
        return new Date(x).getTime()>new Date().getTime()?true:false;
    }
    const formatTime = (time) => {
        return new Date(time).toLocaleDateString()
    }

    return(
        <div className="topCommonContainer"> 
            {data!=null&&data.map((item,index)=>{
                return(
                    <div key = {index} className="commonCard">
                        <Link to={"/detail/"+item._id._id} onClick={scrollTop}>
                            <img src={item._id.poster_path!=null?posterURL.current+item._id.poster_path:"https://cdn.glitch.global/f41a9bd0-8a31-41ac-a400-886f727e1815/%E1%BA%A2nh%20ch%E1%BB%A5p%20m%C3%A0n%20h%C3%ACnh%202023-05-04%20165735.png?v=1683194371036"} alt="popular" />
                            {cmpDate(item._id.release_date)&&<p className="commonCardComing"> {t("Coming Soon")}</p>}
                            <p className="commonCardRate"> {Math.floor(item._id.vote_average*10)/10} </p>
                            <div className="commonCardContent">
                                <p className="commonCardName"> {item.title} </p>
                                <p className="commonCardDay"> {formatTime(item._id.release_date)} </p>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}
export default CardMovie;