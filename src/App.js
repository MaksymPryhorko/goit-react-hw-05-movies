import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
// import NotFoundViews from "./Views/NotFoundViews";
import PopularFilmsOnStartPage from "./Views/PopularFilmsOnStartPage";
import { fetchPopularFilms } from "./services/FilmsApi";
import FilmDetailsView from "./Views/FilmDetailsView";
import MoviesPage from "./MoviesPage";
import Navigation from "./Navigation";

export default function App() {
  const [films, setFilms] = useState(null);

  useEffect(() => {
    if (!films) {
      fetchPopularFilms().then(setFilms);
    }
  }, []);

  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/" exact>
          {films && <PopularFilmsOnStartPage films={films} />}
        </Route>

        <Route path="/movies" exact>
          <MoviesPage />
        </Route>

        <Route path="/movies/:movieId">
          <FilmDetailsView />
        </Route>

        {/* <Route>
          <NotFoundViews />
        </Route> */}
      </Switch>
    </>
  );
}
