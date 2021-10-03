import { Link, useRouteMatch } from "react-router-dom";

export default function PopularFilmsOnStartPage({ films }) {
  const { url } = useRouteMatch();

  return (
    <section>
      <h2>Trending films</h2>
      <ul>
        {films.map((film) => (
          <li key={film.id}>
            <Link to={`${url}movies/${film.id}`}>{film.original_title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
