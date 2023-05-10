import React from "react";

import "./App.css";
import MoviesList from "./components/MoviesList";

function App() {
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    const response = await fetch("https://swapi.dev/api/films/");
    const jsonResponse = await response.json();
    const data = jsonResponse.results.map((movieResp) => ({
      id: movieResp["episode_id"],
      title: movieResp.title,
      releaseDate: movieResp["release_date"],
      openingText: movieResp["opening_crawl"],
    }));

    setMovies(data);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length == 0 && <p>No movies found.</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
