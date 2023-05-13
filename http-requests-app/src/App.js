import React, { useEffect } from "react";

import "./App.css";
import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";

function App() {
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetchMovies = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://react-http-5845d-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong while connect to the server!");
      }
      const jsonResponse = await response.json();
      const data = Object.keys(jsonResponse).map((key) => ({
        ...jsonResponse[key],
        id: key,
      }));

      setMovies(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  async function addMovieHandler(movie) {
    try {
      const response = await fetch(
        "https://react-http-5845d-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Error while saving the data");
      console.log(response);
      fetchMovies();
    } catch (err) {
      console.log(err);
    }
  }

  let content = <p>No movies found.</p>;

  if (movies.length > 0) content = <MoviesList movies={movies} />;
  if (error) content = <p>{error}</p>;
  if (isLoading) content = <p>Loading...</p>;

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
