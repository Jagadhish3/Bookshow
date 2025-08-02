import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";

import Card from "../../../../components/molecules/card";
import { getAllMovies } from "../../../../apis/movies";
import styles from "./movies.module.scss";

function Movies() {
  const [movieList, setMovieList] = useState([]);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const response = await getAllMovies();
      if (response.status === 200) {
        setMovieList(response.data.result || []);
      } else {
        setMovieList([]);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const convertMinToHour = (duration) => {
    if (!duration || isNaN(duration)) return "Unknown";
    return `${parseInt(duration / 60)}h ${parseInt(duration % 60)}m`;
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <section id="movies" className={styles.container}>
      <header>
        <h2>Now Showing</h2>
        <span>
          View All <Icon icon={"mdi-light:arrow-right"} />
        </span>
      </header>
      <div className={styles.movies}>
        {movieList.length ? (
          movieList.map((movie) => (
            <Card
              key={movie._id}
              title={movie.title}
              genre={Array.isArray(movie.genres) ? movie.genres.join(", ") : movie.genres || "Unknown"}
              year={movie.released ? new Date(movie.released).getFullYear() : "N/A"}
              duration={convertMinToHour(movie.runtime)}
              image={movie.poster}
              rating={"4.5"}
              clickHandler={() => navigate(`/${movie._id}`)}
            />
          ))
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </section>
  );
}

export default Movies;