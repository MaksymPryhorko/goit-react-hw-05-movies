import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { fetchFilmCredits } from "../../services/FilmsApi";

export default function Cast() {
  const [filmCredits, setFilmCredits] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    fetchFilmCredits(movieId).then(setFilmCredits);
  }, [movieId]);

  return (
    <>
      <ul>
        {filmCredits &&
          filmCredits.map((credit) => (
            <li key={credit.id}>
              <img
                width="100px"
                src={
                  credit.profile_path &&
                  `https://image.tmdb.org/t/p/w500${credit.profile_path}`
                }
                alt={credit.name}
              />
              {credit.name}
            </li>
          ))}
      </ul>
    </>
  );
}
