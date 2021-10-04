import { Link, useRouteMatch, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function HomePage({ films }) {
  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <section>
      <h2>Trending films</h2>
      <ul>
        {films.map((film) => (
          <li key={film.id}>
            <Link
              to={{
                pathname: `${url}movies/${film.id}`,
                state: { from: location },
              }}
            >
              {film.original_title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

HomePage.propTypes = {
  films: PropTypes.array.isRequired,
};
