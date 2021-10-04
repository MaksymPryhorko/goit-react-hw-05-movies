import { Route, Switch } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { fetchPopularFilms } from "./services/FilmsApi";
import Navigation from "./Components/Navigation";

const NotFoundViews = lazy(() =>
  import("./Views/NotFoundViews" /*webpackChunkName: "NotFoundViews"*/)
);

const HomePage = lazy(() =>
  import("./Views/HomePage" /*webpackChunkName: "HomePage"*/)
);

const MoviesPage = lazy(() =>
  import("./Views/MoviesPage" /*webpackChunkName: "MoviesPage"*/)
);
const MovieDetailsPage = lazy(() =>
  import("./Views/MovieDetailsPage" /*webpackChunkName: "MovieDetailsPage"*/)
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
            <HomePage films={films} />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundViews />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}
