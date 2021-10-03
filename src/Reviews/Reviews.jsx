import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFilmReviews } from "../services/FilmsApi";

export default function Reviews() {
  const [filmReviews, setFilmReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    fetchFilmReviews(movieId).then(setFilmReviews);
  }, [movieId]);

  return (
    <>
      {filmReviews.length === 0 ? (
        <p>We dont`t have any reviews for this movie.</p>
      ) : (
        <ul>
          {filmReviews.map((review) => (
            <li key={review.id}>
              Author: {review.author}
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
