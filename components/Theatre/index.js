import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import "./Theatre.css";
import axios from 'axios';

const Theatre = (props) => {
    const [theatre, setTheatre] = useState([]);
    const [newTheatre, setNewTheatre] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [movies, setMovies] = useState([]);


    useEffect(async () => {
        fetchTheatres();

        const response = await fetch("http://localhost:3000/adminMovieSelectionForTheatres");
        const movies = await response.json();
        setMovies(movies);
        setNewTheatre({theatre_movie:movies[0].Movie_name});
    }, []);

    async function fetchTheatres() {
        const data = await fetch("http://localhost:3000/allTheatres");
        const theatre = await data.json();
        setTheatre(theatre);
    }

    async function saveTheatre(e) {
        e.preventDefault();
        const url = `http://localhost:3000/saveTheatre`;
        const response = await axios.post(url, newTheatre); // creating new theatre
        console.log('response',response)
        if (response.status === 200) {
            setShowModal(false);
            fetchTheatres();
        } else {
            alert('Could not add theatre. Please try again');
        }
    }

    async function deleteTheatre(theatreName) {
        const url = `http://localhost:3000/deleteTheatre/${theatreName}`;
        const response = await axios.delete(url);
        if (response.status === 200) {
            fetchTheatres();
        } else {
            alert('Could not delete theatre. Please try again');
        }
    }

    return (
        <>
            <div className="m-4  h-100">
                <div className="d-flex flex-row flex-wrap">
                    {theatre.map((theatre) => {
                        return (
                            <div className="m-3 Movie shadow-lg border border-danger">
                                <div className="d-flex justify-content-end">
                                    <button className="bg-danger" type="button" onClick={() => deleteTheatre(theatre.theatre_name)}>
                                        <img className="bg-danger mb-1" src="https://img.icons8.com/metro/26/000000/delete-sign.png" style={{ width: '20px', height: '20px' }} />
                                    </button>
                                </div>
                                <div className="w-100 h-50 ">
                                    <img className="w-100 h-100" src={theatre.theatre_poster_link} />
                                </div>
                                <h4 className="mt-2 mb-2">{theatre.theatre_name}</h4>
                            </div>
                        );
                    })}
                    <div className="m-3 addMovie shadow-lg border border-danger" onClick={() => setShowModal(true)}>
                        <div className="w-100 h-50 ">
                            <h1>ADD THEATRE</h1>
                        </div>
                        <h3 className="mt-2 mb-2">Click to add theatre</h3>
                    </div>
                </div>

            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                className="react-modal-content"
            >
                <div>
                    <h3 style={{ textAlign: 'center' }}>ADD THEATRE</h3>
                    <div className="container mt-2" style={{ width: '500px' }}>
                        <form onSubmit={(e) => saveTheatre(e)}>
                            <div className="ml-2 mt-2 row">
                                <p className="col-sm">
                                    Name
                            </p>
                                <input className="ml-5 mb-3 col-sm" type="text" placeholder="Enter name" onChange={(e) => setNewTheatre({ ...newTheatre, theatre_name: e.target.value })} required></input>
                            </div>
                            <div className="ml-2 mt-2 row">
                                <p className="col-sm">
                                    Movie
                            </p>
                                <select className="ml-5 mb-3 col-sm" name="movies" id="movies" placeholder="Select a movie" onChange={(e) => setNewTheatre({ ...newTheatre, theatre_movie: e.target.value })}>
                                    {movies.map(movie => (<option value={`${movie.Movie_name}`}>{movie.Movie_name}</option>))}
                                </select>
                            </div>
                            <div className="ml-2 mt-2 row">
                                <p className="col-sm">
                                    City
                            </p>
                                <input className="ml-5 mb-3 col-sm" type="float" placeholder="Enter city name of theatre" onChange={(e) => setNewTheatre({ ...newTheatre, theatre_movie_city: e.target.value })} required></input>
                            </div>
                            <div className="ml-2 mt-2 row">
                                <p className="col-sm">
                                    Time
                            </p>
                                <input className="ml-5 mb-3 col-sm" type="time" placeholder="Enter time" onChange={(e) => setNewTheatre({ ...newTheatre, show_time: e.target.value })} required></input>
                            </div>
                            <div className="ml-2 mt-2 row">
                                <p className="col-sm">
                                    Date
                            </p>
                                <input className="ml-5 mb-3 col-sm" type="date" placeholder="Enter date" onChange={(e) => setNewTheatre({ ...newTheatre, show_date: e.target.value })} required></input>
                            </div>
                            <div className="ml-2 mt-2 row">
                                <p className="col-sm">
                                    Total seats
                            </p>
                                <input className="ml-5 mb-3 col-sm" type="number" placeholder="Enter number of seats" onChange={(e) => setNewTheatre({ ...newTheatre, total_seats: e.target.value })} required></input>
                            </div>
                            <div className="ml-2 mt-2 row">
                                <p className="col-sm">
                                    Theatre area
                            </p>
                                <input className="ml-5 mb-3 col-sm" type="float" placeholder="Enter area" onChange={(e) => setNewTheatre({ ...newTheatre, theatre_location: e.target.value })} required></input>
                            </div>
                            <div className="ml-2 mt-2 row d-flex justify-content-center">
                                <button type="submit" className="w-25 btn btn-success" >Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Theatre;
