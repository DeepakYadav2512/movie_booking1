import axios from "axios";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const BookMovie = (props) => {
  const [movie, setMovie] = useState(props.location.data);
  const [data, setData] = useState({});
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [theatres, setTheatres] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState({});
  const [cities, setCities] = useState([]);

  useEffect(async () => {
    let data = await fetch("http://localhost:3000/cities");
    const cities = await data.json();
    setCities(cities);
    setData({ ...data, city: cities[0].city_name });
  }, []);

  useEffect(async () => {
    if ((data.city, data.date)) {
      fetchTheatres();
    }
  }, [data.city && data.date]);

  async function bookTicket(e) {
    e.preventDefault();
    const body = {
      reference_number: Math.floor(Math.random() * Math.floor(100000)),
      status: "complete",
      mail: props.user.email,
      payee_contact: Math.floor(Math.random() * Math.floor(1000000000)),
    };
    const url = `http://localhost:3000/payments`;
    const options = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(url, options); // creating new movie
    const bookTicketResponse = await response.json();
  }

  async function fetchTheatres() {
    let url = `http://localhost:3000/theatres`;
    const theatres = await axios.post(url, {
      city_name: data.city,
      Movie_name: movie.Movie_name,
      show_date: data.date,
    });
    setTheatres(theatres.data);
    setSelectedTheatre(theatres.data[0]);
    setData({ ...data, theatre: theatres.data[0].theatre_name });
  }

  async function onPay(e) {
    e.preventDefault();
    const date = new Date();
    let url = `http://localhost:3000/payments`;
    const payment = await axios.post(url, {
      movieName: movie.Movie_name,
      showTime: selectedTheatre.show_time,
      showDate: data.date,
      reference_number: Math.floor(Math.random() * Math.floor(10000000)),
      status: "success",
      mail: props.user.email ? props.user.email : "vishal@gmail.com",
      payment_date: `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`,
      payee_contact: Math.floor(Math.random() * Math.floor(1000000000)),
      seats: data.seatNumber,
      theatreId: selectedTheatre.theatre_id,
    });
    if (payment.status === 200) {
      setBookingConfirmed(true);
    }
  }

  return (
    <>
      <div className="m-4  h-100">
        <div className="d-flex flex-row">
          <div className="w-50 h-25 p-3 ml-5">
            <img
              style={{ width: "300px", height: "200px" }}
              src={movie.Movie_poster_link}
            />
          </div>
          <div className="d-flex flex-column mt-3">
            <h3 className="mt-2">Name: {movie.Movie_name}</h3>
            <h4>Rating: {movie.Movie_rating}</h4>
            <p className="mb-0">{movie.movie_summary}</p>
          </div>
        </div>
        <div className="container">
          <div className="ml-2 mt-2 row">
            <p className="col-sm-3">Select City</p>
            {cities.length > 1 ? (
              <select
                className="ml-5 mb-3 col-sm-3"
                name="movies"
                id="movies"
                placeholder="Select a movie"
                defaultValue={cities[0].city_name}
                onChange={(e) => setData({ ...data, city: e.target.value })}
              >
                {cities.map((city) => (
                  <option value={`${city.city_name}`}>{city.city_name}</option>
                ))}
              </select>
            ) : null}
          </div>
          <div className="ml-2 mt-2 row">
            <p className="col-sm-3">Select Date</p>
            <input
              className="ml-5 mb-3 col-sm-3"
              type="date"
              placeholder="Enter date"
              onChange={(e) => setData({ ...data, date: e.target.value })}
              required
            ></input>
          </div>

          {data.city && data.date && theatres ? (
            <div className="ml-2 mt-2 row">
              <p className="col-sm-3">Select Theater</p>
              <select
                className="ml-5 mb-3 col-sm-3"
                name="movies"
                id="movies"
                placeholder="Select a movie"
                defaultValue={data.theatre ? data.theatre : null}
                onChange={(e) => {
                  const selected = theatres.find(
                    (theatre) => theatre.theatre_name === e.target.value
                  );
                  console.log("slected", selected);
                  setSelectedTheatre(selected);
                  setData({ ...data, theatre: e.target.value });
                }}
              >
                {theatres.map((theatre) => (
                  <option value={`${theatre.theatre_name}`}>
                    {theatre.theatre_name}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          {selectedTheatre ? (
            <>
              <div className="ml-2 mt-2 row">
                <p className="col-sm-3">Show Time</p>
                <input
                  className="ml-5 mb-3 col-sm-3"
                  type="data"
                  value={selectedTheatre.show_time}
                ></input>
              </div>
              <div className="ml-2 mt-2 row">
                <p className="col-sm-3">Select Number of seats</p>
                <input
                  className="ml-5 mb-3 col-sm-3"
                  type="number"
                  placeholder="Enter number of seats"
                  onChange={(e) =>
                    setData({ ...data, seatNumber: e.target.value })
                  }
                  required
                ></input>
              </div>
            </>
          ) : null}

          <div className="ml-2 mt-2 row d-flex justify-content-right">
            <button
              className="m-3 pl-3 pr-3 btn btn-success"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Go For Billing
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={() => {
          setBookingConfirmed(false);
          setShowModal(false);
        }}
        className="react-modal-content"
      >
        <div>
          {!bookingConfirmed ? (
            <div style={{ width: "500px" }}>
              <form onSubmit={(e) => onPay(e)}>
                <div style={{ width: "500px" }}>
                  <div className="d-flex flex-row">
                    <div className="w-50 h-25">
                      <img
                        style={{ width: "200px", height: "200px" }}
                        src={movie.Movie_poster_link}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <h4 className="mt-2">Name: {movie.Movie_name}</h4>
                      <h4>Rating: {movie.Movie_rating}</h4>
                      <h4>City: {data.city}</h4>
                      <h4>Date: {data.date}</h4>
                      <h4>Total price: Rs {data.seatNumber * movie.price}</h4>
                    </div>
                  </div>
                </div>

                <div className="ml-2 mt-2 row d-flex justify-content-center">
                  <button type="submit" className="w-25 btn btn-success">
                    Pay
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div style={{ width: "700px" }}>
              <div className="d-flex flex-row">
                <div className="h-25" style={{ width: "250px" }}>
                  <img
                    style={{ width: "200px", height: "200px" }}
                    src={movie.Movie_poster_link}
                  />
                </div>
                <div className="d-flex flex-column">
                  <h4 className="mt-2">Name: {movie.Movie_name}</h4>
                  <h4>City: {data.city}</h4>
                  <h4>Date: {data.date}</h4>
                  <h4>Total price: Rs {data.seatNumber * movie.price}</h4>
                </div>
                <img
                  className="m-4"
                  style={{ width: "150px", height: "150px" }}
                  src={
                    "https://image.freepik.com/free-vector/paid-stamp_1017-8234.jpg"
                  }
                ></img>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default BookMovie;
