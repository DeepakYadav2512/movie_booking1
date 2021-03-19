import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./Home.css";

const Home = (props) => {
  const [movies, setMovies] = useState([]);
  const [newMovies, setNewMovies] = useState({ Movie_type: "Comedy" });
  const [currentMovie, setCurrentMovie] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [movieModal, setMovieModal] = useState(false);
  const [user, setUser] = useState(props.user.email);

  useEffect(async () => {
    fetchMovies();
  }, []);

  async function saveMovie(e) {
    e.preventDefault();
    const url = `http://localhost:3000/addMovies`;
    const response = await axios.post(url, newMovies); // creating new movie
    if (response.status === 200) {
      setShowModal(false);
      fetchMovies();
    } else {
      alert("Could not add movie. Please try again");
    }
  }

  async function fetchMovies() {
    const data = await fetch("http://localhost:3000/movies"); // hitting api at 3000/movies
    const movies = await data.json();
    setMovies(movies);
  }
  console.log("props", movies);

  async function deleteMovie(movieId) {
    console.log("movieId", movieId);
    const url = `http://localhost:3000/deletemovie/${movieId}`;
    const response = await axios.delete(url);
    if (response.status === 200) {
      fetchMovies();
    } else {
      alert("Could not delete movie. Please try again");
    }
  }
  console.log("props.user.email", props.user.email);

  return (
    <>
      <div className="m-4  h-100">
        <div className="d-flex flex-row flex-wrap">
          {movies.map((movie) => {
            return (
              <div className="m-3  shadow-lg border border-danger">
                {props.user && props.user.isAdmin ? (
                  <div className="d-flex justify-content-end">
                    <button
                      className="bg-danger"
                      type="button"
                      onClick={() => deleteMovie(movie.Movie_id)}
                    >
                      <img
                        className="bg-danger mb-1"
                        src="https://img.icons8.com/metro/26/000000/delete-sign.png"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </button>
                  </div>
                ) : null}

                <div
                  className="Movie"
                  onClick={() => {
                    setCurrentMovie(movie);
                    setMovieModal(true);
                  }}
                >
                  <div className="w-100 h-50 ">
                    <img
                      className="w-100 h-100"
                      src={movie.Movie_poster_link}
                    />
                  </div>
                  <h4 className="mt-2 mb-2">{movie.Movie_name}</h4>
                  <div className="d-flex flex-row mt-2">
                    <p className="mb-2">Type {movie.Movie_type}</p>
                    <p className="mb-2"> Language {movie.Movie_language}</p>
                    <p className="mb-2"> Rating {movie.Movie_rating}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div
            className="m-3 addMovie shadow-lg border border-danger"
            onClick={() => setShowModal(true)}
          >
            <div className="w-100 h-50 ">
              <h1>ADD MOVIE</h1>
            </div>
            <h3 className="mt-2 mb-2">Click to add movie</h3>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="react-modal-content"
      >
        <div>
          <h3 style={{ textAlign: "center" }}>ADD MOVIE</h3>
          <div className="container mt-2" style={{ width: "500px" }}>
            <form onSubmit={(e) => saveMovie(e)}>
              <div className="ml-2 mt-2 row">
                <p className="col-sm">Name</p>
                <input
                  className="ml-5 mb-3 col-sm"
                  type="text"
                  placeholder="Enter name"
                  onChange={(e) =>
                    setNewMovies({ ...newMovies, movie_name: e.target.value })
                  }
                  required
                ></input>
              </div>
              <div className="ml-2 mt-2 row">
                <p className="col-sm">Language</p>
                <input
                  className="ml-5 mb-3 col-sm"
                  type="text"
                  placeholder="Enter language"
                  onChange={(e) =>
                    setNewMovies({
                      ...newMovies,
                      movie_language: e.target.value,
                    })
                  }
                  required
                ></input>
              </div>
              <div className="ml-2 mt-2 row">
                <p className="col-sm">Rating</p>
                <input
                  className="ml-5 mb-3 col-sm"
                  type="float"
                  placeholder="Enter rating"
                  onChange={(e) =>
                    setNewMovies({ ...newMovies, movie_rating: e.target.value })
                  }
                  required
                ></input>
              </div>
              <div className="ml-2 mt-2 row">
                <p className="col-sm">Price</p>
                <input
                  className="ml-5 mb-3 col-sm"
                  type="number"
                  placeholder="Enter price"
                  onChange={(e) =>
                    setNewMovies({ ...newMovies, price: e.target.value })
                  }
                  required
                ></input>
              </div>
              <div className="ml-2 mt-2 row">
                <p className="col-sm">Movie Type</p>
                <select
                  className="ml-5 mb-3 col-sm"
                  id="cars"
                  onChange={(e) =>
                    setNewMovies({ ...newMovies, movie_type: e.target.value })
                  }
                >
                  <option value="Comedy">Comedy</option>
                  <option value="Sport">Sport</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Romance">Romance</option>
                  <option value="Gangster">Gangster</option>
                </select>
              </div>
              <div className="ml-2 mt-2 row">
                <p className="col-sm">Summary</p>
                <input
                  className="ml-5 mb-3 col-sm"
                  type="text"
                  maxLength="255"
                  placeholder="Enter summary"
                  onChange={(e) =>
                    setNewMovies({
                      ...newMovies,
                      movie_summary: e.target.value,
                    })
                  }
                  required
                ></input>
              </div>
              <div className="ml-2 mt-2 row">
                <p className="col-sm">Poster url</p>
                <input
                  className="ml-5 mb-3 col-sm"
                  type="url"
                  maxLength="255"
                  placeholder="Enter url"
                  onChange={(e) =>
                    setNewMovies({
                      ...newMovies,
                      movie_poster_link: e.target.value,
                    })
                  }
                  required
                ></input>
              </div>
              <div className="ml-2 mt-2 row d-flex justify-content-center">
                <button type="submit" className="w-25 btn btn-success">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={movieModal}
        onRequestClose={() => setMovieModal(false)}
        className="react-modal-content"
      >
        <div style={{ width: "500px" }}>
          <div className="w-100 h-25">
            <img
              style={{ width: "500px", height: "300px" }}
              src={currentMovie.Movie_poster_link}
            />
          </div>
          <div className="text-info d-flex flex-row justify-content-around">
            <h2>{currentMovie.Movie_name}</h2>
            <h2>Rating: {currentMovie.Movie_rating}</h2>
          </div>
          <p>{currentMovie.movie_summary}</p>
          <div className="ml-2 mt-2 row d-flex justify-content-center">
            <button
              type="submit"
              className="w-100 btn btn-success"
              onClick={() =>
                props.history.push({
                  pathname: `/bookmovies/${currentMovie.Movie_id}`,
                  data: { ...currentMovie, user },
                })
              }
            >
              BOOK TICKETS
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Home;
