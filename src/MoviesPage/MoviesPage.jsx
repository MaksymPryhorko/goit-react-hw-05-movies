import { useState } from "react";
import { fetchFilmQuery } from "../services/FilmsApi";
import { Link, NavLink, useRouteMatch, Route } from "react-router-dom";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [films, setFilms] = useState(null);
  const { url } = useRouteMatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetchFilmQuery(query);
    setFilms(response);
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
        {/* <NavLink to={`${url}?query=${query}`}> */}
        <button type="submit">Search</button>
        {/* </NavLink> */}
      </form>

      {films && (
        <section>
          <ul>
            {films.map((film) => (
              <li key={film.id}>
                <Link to={`${url}/${film.id}`}>{film.original_title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
