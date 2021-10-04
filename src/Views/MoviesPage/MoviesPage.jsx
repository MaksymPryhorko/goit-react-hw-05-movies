import { useState, useEffect } from "react";
import { fetchFilmQuery } from "../../services/FilmsApi";
import { Link, useRouteMatch, useHistory, useLocation } from "react-router-dom";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [films, setFilms] = useState(null);
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const searchQuery = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (searchQuery) {
      fetchFilms(searchQuery).then(setFilms);
    }
  }, []);

  const fetchFilms = async (name) => {
    const response = await fetchFilmQuery(name);
    return response;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) {
      return;
    }
    const response = await fetchFilms(query);
    setFilms(response);
    history.push({ ...location, search: `query=${query}` });
    reset();
  };

  const handleChange = (e) => {
    const { value } = e.currentTarget;
    setQuery(value);
  };

  const reset = () => {
    setQuery("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            value={query}
            name="name"
            type="text"
            onChange={handleChange}
          />
        </label>
        <button type="submit">Search</button>
      </form>

      {films && (
        <section>
          <ul>
            {films.map((film) => (
              <li key={film.id}>
                <Link
                  to={{
                    pathname: `${url}/${film.id}`,
                    state: { from: location },
                  }}
                >
                  {film.original_title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
