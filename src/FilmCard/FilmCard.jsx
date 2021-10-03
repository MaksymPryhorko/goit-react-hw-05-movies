export default function FilmCard({ film }) {
  return (
    <div>
      <h2>{film.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${film.backdrop_path}`}
        alt={film.title}
      />
      <p>Vote average: {film.vote_average}</p>
      <h3>Overview</h3>
      <p>{film.overview}</p>
      <h3>Genres</h3>
      <p>
        {film.genres.reduce((allGenres, genre) => {
          return allGenres.concat(" ", genre.name);
        }, "")}
      </p>
    </div>
  );
}
