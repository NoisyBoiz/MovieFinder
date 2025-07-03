import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { MdDeleteForever } from "react-icons/md";
import "../styles/detail.css";

import { useTranslation } from "react-i18next";
import DragScrolling from "../utils/dragScrolling";
import LocalStorage from "../utils/localStorage.jsx";
import GenresService from "../services/genres.jsx";
import MoviesService from "../services/movies.jsx";
import UsersService from "../services/users.jsx";
import CommentsService from "../services/comments.jsx";
import FavoriteService from "../services/favorites.jsx";
import { useNotification } from "../component/notification";

const imgURL = {
  actor: "https://image.tmdb.org/t/p/w138_and_h175_face",
  poster: "https://image.tmdb.org/t/p/w500",
  backdrop: "https://image.tmdb.org/t/p/original",
  trailer: (key) => `https://img.youtube.com/vi/${key}/mqdefault.jpg`,
  fallback: "https://cdn.glitch.global/f41a9bd0-8a31-41ac-a400-886f727e1815/img.jpg?v=1682936306067"
};

const convertRunTime = (x) => `${Math.floor(x / 60)}h ${x % 60}m`;

function Detail() {
  const { idMovie } = useParams();
  const { t } = useTranslation();
  const user = LocalStorage.getUserInfo();
  const notify = useNotification();
  const videoRef = useRef(null);

  const [detail, setDetail] = useState(null);
  const [genres, setGenres] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [comments, setComments] = useState([]);
  const [cast, setCast] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (!idMovie) return;
    const lang = LocalStorage.getLanguage();

    const fetchAll = async () => {
      const [movie, movieCast, movieComments, genreList] = await Promise.all([
        MoviesService.getMovieById(idMovie, lang),
        MoviesService.getCast(idMovie),
        CommentsService.getComments(idMovie),
        GenresService.getAllGenres()
      ]);

      setDetail(movie);
      setCast(movieCast);
      setComments(movieComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));

      const genreNames = movie._id.genre_ids.map(
        (id) => genreList.find((g) => g._id === id)?.name
      ).filter(Boolean);
      setGenres(genreNames);

      if (user) {
        const fav = await FavoriteService.getFavorite(user.id);
        setFavorites(fav);
      }
    };

    fetchAll();
  }, [idMovie, user]);

  const handleComment = async () => {
    if (!commentText.trim()) {
      return notify.notify({ type: "warning", title: t("Warning"), message: t("Please enter a valid comment"), showCloseButton: true });
    }
    if (!user) {
      return notify.notify({ type: "warning", title: t("Not logged in"), message: t("You need to log in to perform this action"), onAccept: () => window.location.href = "/login/login", titleAccept: "Login", titleCancel: "Cancel" });
    }
    const res = await CommentsService.createComment({ idUser: user.id, idMovie, content: commentText });
    if (res.status === 200) {
      const refreshed = await CommentsService.getComments(idMovie);
      setComments(refreshed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setCommentText("");
    } else {
      notify.notify({ type: "error", title: t("Error"), message: t("Create comment fail") });
    }
  };

  const handleDeleteComment = async (id) => {
    notify.notify({
      type: "confirm",
      title: t("Warning"),
      message: t("Do you want to delete this comment?"),
      onAccept: async () => {
        const res = await CommentsService.deleteComment(id);
        if (res.status === 200) {
          const refreshed = await CommentsService.getComments(idMovie);
          setComments(refreshed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } else {
          notify.notify({ type: "error", title: t("Error"), message: t("Delete comment fail") });
        }
      },
      titleAccept: t("Accept"),
      titleCancel: t("Cancel")
    });
  };

  const handleFavorite = async () => {
    if (!user) {
      return notify.notify({ type: "warning", title: t("Not logged in"), message: t("You need to log in to perform this action"), onAccept: () => window.location.href = "/login/login", titleAccept: "Login", titleCancel: "Cancel" });
    }
    const res = await UsersService.updateFavorite({ id: user.id, idMovie });
    if (res.status === 200) setFavorites(res.data);
  };

  const isFavorite = favorites.includes(detail?._id?._id);

  if (!detail) return <div className="emptyDataDetail"><h1>4<i className="fa-solid fa-ghost"></i>4</h1><span>{t("Have no data about movie right now")}<br/>{t("Sorry for the inconvenience")}</span></div>;

  return (
    <div className="detail">
      <div className="detailBackDrop">
        <img src={imgURL.backdrop + detail._id.backdrop_path} alt="backdrop" />
      </div>

      <div className="detailContent">
        {/* Header & Favorite */}
        <div className="topDetailContent">
          <h3>{detail._id.original_title}</h3>
          <button
            className={`btn-favorite ${isFavorite ? "activeFavoriteDetail" : "inactiveFavoriteDetail"}`}
            onClick={handleFavorite}
          >
            <i className="fa-solid fa-heart"></i> {t("Favorite")}
          </button>
        </div>

        {/* Main Detail Content */}
        <div className="centerDetailContent">
          {/* Poster */}
          <div className="leftDetailContent">
            <img className="detailPosterImg" src={imgURL.poster + detail._id.poster_path} alt="poster" />
            <div className="bottomLDContent">
              <div className="rateContainer">
                <svg xmlns="http://www.w3.org/2000/svg" className="circleRate">
                  <circle fill="transparent" className="fillCircle" />
                  <circle fill="transparent" className="barCircleRate" style={{ "--voteRate": detail._id.vote_average.toFixed(1) }} />
                </svg>
                <p className="detailRate">{detail._id.vote_average.toFixed(1)}</p>
              </div>
              <p>{detail.vote_count} <span>{t("Ratings")}</span></p>
            </div>
          </div>

          {/* Info */}
          <div className="rightDetailContent">
            <h1 className="detailTitle">{detail.title}</h1>
            <div className="detailGenres">{genres.map((g, i) => <span key={i}>{t(g)}</span>)}</div>
            <p className="detailDate"><span>{t("Release Date")}:</span> {detail._id.release_date}</p>
            <p className="detailRuntime"><span>{t("Runtime")}:</span> {convertRunTime(detail._id.runtime)}</p>
            <div className="detailOverview">
              <p>{t("Overview")} {!detail.overview && <span>({t("No Overview")})</span>}</p>
              <span>{detail.overview}</span>
            </div>

            {/* Trailer */}
            <div className="trailerDetailContainer">
              <p>{t("Trailer")} {detail.video.length === 0 && <span>({t("No Trailer")})</span>}</p>
              <div className="slideTDContainer">
                <div className="slideTD" onMouseDown={(e) => DragScrolling(e, "slideTDContainer") }>
                  {detail.video.map((key, i) => (
                    <button key={i} className="buttonShowTrailer" onClick={() => { setShowTrailer(true); setTrailerKey(key); }}>
                      <img src={imgURL.trailer(key)} width={150} height={90} alt="trailer" />
                      <i className="fa-solid fa-caret-right"></i>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cast */}
        <div className="detailActorContainer">
          <p>{t("Cast")}</p>
          <div className="listActorContainer">
            <div className="slideActor" onMouseDown={(e) => DragScrolling(e, "listActorContainer") }>
              {cast.map((c, i) => (
                <div className="actorCard" key={i}>
                  <img src={c.avatar ? imgURL.actor + c.avatar : imgURL.fallback} alt="actor" />
                  <p>{c.name}</p>
                  <p>{c.character}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comment */}
        <div className="comment-container">
          <p>{t("Comment")}</p>
          <div className="yourCmtCrad">
            <textarea placeholder={t("Write Comment")} className="comment-textarea" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
            <button onClick={handleComment}><i className="fa-regular fa-paper-plane"></i></button>
          </div>
          {comments.length === 0 ? <h3>{t("No Comment")}</h3> : comments.map((c, i) => (
            <div className="card" key={i}>
              <div className="author">
                <div className="image">
                  <img src={c.idUser.avatar || imgURL.fallback} alt="author" />
                </div>
                <div className="infor">
                  <h3>{c.idUser.name || c.author}</h3>
                  <p>{new Date(c.createdAt).toLocaleString()}</p>
                </div>
                {user && c.idUser._id === user.id && (
                  <button className="action" onClick={() => handleDeleteComment(c._id)}><MdDeleteForever /></button>
                )}
              </div>
              <div className="content">{c.content}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trailer Popup */}
      {showTrailer && (
        <div className="trailerContainer showTrailer">
          <YouTube videoId={trailerKey} className="trailerMovie" onReady={(event) => videoRef.current = event} />
          <button className="buttonHiddenTrailer" onClick={() => {
            videoRef.current?.target?.stopVideo();
            setShowTrailer(false);
            setTrailerKey(null);
          }}>+</button>
        </div>
      )}
    </div>
  );
}

export default Detail;
