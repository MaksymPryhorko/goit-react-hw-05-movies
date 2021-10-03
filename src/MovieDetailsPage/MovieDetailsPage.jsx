import {
  useParams,
  Route,
  useRouteMatch,
  NavLink,
  useLocation,
  useHistory,
} from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { fetchFilmById } from "../services/FilmsApi";
import FilmCard from "../FilmCard";
import s from "./MovieDetailsPage.module.css";

const Cast = lazy(() => import("../Cast" /*webpackChunkName: "Cast"*/));
const Reviews = lazy(() =>
  import("../Reviews" /*webpackChunkName: "Reviews"*/)
);

export default function MovieDetailsPage() {
  const location = useLocation();
  const history = useHistory();
  const { movieId } = useParams();
  const [film, setFilm] = useState(null);
  const { url, path } = useRouteMatch();
  const locationMoviesPage = location.state.from;

  useEffect(() => {
    fetchFilmById(movieId).then(setFilm);
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? "/");
  };

  return (
    <>
      <button type="button" onClick={onGoBack}>
        Go back
      </button>
      {film && <FilmCard film={film} />}

      <h3>Additional information</h3>
      <NavLink
        to={{
          pathname: `${url}/cast`,
          state: { from: locationMoviesPage },
        }}
        className={s.link}
        activeClassName={s.activeLink}
      >
        Cast
      </NavLink>

      <Suspense fallback={<h1>Loading</h1>}>
        <Route path={`${path}/cast`}>
          <Cast />
        </Route>
      </Suspense>

      <NavLink
        to={{
          pathname: `${url}/reviews`,
          state: { from: locationMoviesPage },
        }}
        className={s.link}
        activeClassName={s.activeLink}
      >
        Reviews
      </NavLink>

      <Suspense fallback={<h1>Loading</h1>}>
        <Route path={`${path}/reviews`}>
          <Reviews />
        </Route>
      </Suspense>
    </>
  );
}
