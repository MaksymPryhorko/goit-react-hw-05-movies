import { useParams, Route, useRouteMatch, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchFilmById } from "../../services/FilmsApi";
import FilmCard from "../../FilmCard";
import Cast from "../../Cast";
import Reviews from "../../Reviews";
import s from "./FilmDetailsView.module.css";

export default function FilmDetailsView() {
  const { movieId } = useParams();
  const [film, setFilm] = useState(null);
  const { url, path } = useRouteMatch();

  useEffect(() => {
    fetchFilmById(movieId).then(setFilm);
  }, [movieId]);

  return (
    <>
      {film && <FilmCard film={film} />}

      <hr></hr>
      <h3>Additional information</h3>
      <NavLink
        to={`${url}/cast`}
        className={s.link}
        activeClassName={s.activeLink}
      >
        Cast
      </NavLink>

      <Route path={`${path}/cast`}>
        <Cast />
      </Route>

      <NavLink
        to={`${url}/reviews`}
        className={s.link}
        activeClassName={s.activeLink}
      >
        Reviews
      </NavLink>

      <Route path={`${path}/reviews`}>
        <Reviews />
      </Route>
      <hr></hr>
    </>
  );
}
