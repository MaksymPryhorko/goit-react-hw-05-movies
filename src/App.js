import { Route, Switch } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { fetchPopularFilms } from "./services/FilmsApi";
import Navigation from "./Navigation";

const HomePage = lazy(() =>
  import("./HomePage" /*webpackChunkName: "HomePage"*/)
);

const MoviesPage = lazy(() =>
  import("./MoviesPage" /*webpackChunkName: "MoviesPage"*/)
);
const MovieDetailsPage = lazy(() =>
  import("./MovieDetailsPage" /*webpackChunkName: "MovieDetailsPage"*/)
);

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
      <Suspense fallback={<h1>Loading</h1>}>
        <Switch>
          <Route path="/" exact>
            {films && <HomePage films={films} />}
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          {/* <Route>
          <NotFoundViews />
        </Route> */}
        </Switch>
      </Suspense>
    </>
  );
}
