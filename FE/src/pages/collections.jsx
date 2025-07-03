import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import CardMovie from "../component/cardMovie.jsx";
import Pagination from "../component/pagination.jsx";
import LocalStorage from "../utils/localStorage.jsx";
import MoviesService from "../services/movies.jsx";

import { useNotification } from "../component/notification.jsx";

import "../styles/collections.css";

function Collections() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = LocalStorage.getUserInfo();
  const { notify } = useNotification();

  const [dataPage, setDataPage] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [postPerPage] = useState(20);
  const [indexPage, setIndexPage] = useState(1);

   useEffect(() => {
    if (!user) {
      notify({
        type: "alert",
        title: t("Not logged in"),
        message: t("You need to log in to perform this action"),
        titleAccept: t("Sign In"),
        titleCancel: t("Cancel"),
        onCancel: () => navigate("/"),
        onAccept: () => navigate("/login/login"),
      });
      return;
    }

    MoviesService.getMovieByUser(user.id).then((res) => {
      setTotalPages(Math.ceil(res.length / postPerPage));
      setDataPage(res.slice(0, postPerPage));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return null;

  return (
    <div className="commonContainer">
      {dataPage.length ? (
        <>
          <h2>{t("Collections")}</h2>
          <CardMovie method="favorite" data={dataPage} />
          <Pagination
            totalPages={totalPages}
            indexPage={indexPage}
            setIndexPage={setIndexPage}
            showPagination={LocalStorage.getShowPagination()}
          />
        </>
      ) : (
        <div className="emptyCollections">
          <img
            src="https://cdn.glitch.global/f41a9bd0-8a31-41ac-a400-886f727e1815/box.png?v=1684402478245"
            alt="empty collections"
          />
          <h1>{t("There is no data in the collection right now!")}<br/>{t("Let's explore more")}</h1>
          <Link to="/">{t("Back to home")}</Link>
        </div>
      )}
    </div>
  );
}

export default Collections;
