import React, { useState } from "react";
import axios from "axios";
import './App.css'; 

const OpenComponent = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  // API Key
  const API_KEY = "668994f"; 
  
  const searchMovies = async () => {
    if (query.trim() === "") {
      setError("Please enter a movie name");
      return;
    }

    setError(""); // Clear previous error
    try {
      // API call to OMDB
      const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      
      // Add log to check the response
      console.log(response.data); // This will print the response to the console

      if (response.data.Response === "True") {
        setMovies(response.data.Search); // Set the movies to state
      } else {
        setError(response.data.Error); // Set error if no movie is found
        setMovies([]);
      }
    } catch (err) {
      console.error("Error fetching data from OMDB API", err);
      setError("Failed to fetch data."); // Handle error
    }
  };

  const renderMovies = () => {
    return movies.map((movie) => (
      <div key={movie.imdbID} className="movie">
        <img src={movie.Poster} alt={movie.Title} />
        <h3>{movie.Title}</h3>
        <p>Year: {movie.Year}</p>
      </div>
    ));
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
      />
      <button onClick={searchMovies}>Search</button>

      {error && <p className="error">{error}</p>}

      <div className="movie-list">
        {movies.length > 0 ? renderMovies() : <p>No movies found</p>}
      </div>
    </div>
  );
};

export default OpenComponent;
