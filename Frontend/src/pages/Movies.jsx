// import { useEffect, useState } from "react";
// import API from "../api";
// import { useAuth } from "../context/AuthContext";

// function Movies() {
//   const { user } = useAuth();
//   const [movies, setMovies] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [bookingData, setBookingData] = useState({});

//   useEffect(() => {
//     // Fetch movies
//     API.get("/movies")
//       .then(res => {
//         const movieList = res.data.movies || [];
//         setMovies(movieList.slice(0, 3)); // Show only 3 movies
//       })
//       .catch(err => console.log(err));

//     // Fetch user's bookings
//     if (user) {
//       API.get("/bookings")
//         .then(res => setBookings(res.data.data))
//         .catch(err => console.log(err));
//     }
//   }, [user]);

//   const handleBookingDataChange = (movieId, field, value) => {
//     setBookingData(prev => ({
//       ...prev,
//       [movieId]: {
//         ...prev[movieId],
//         [field]: value
//       }
//     }));
//   };

//   const bookMovie = async (movieId) => {
//     if (!user) {
//       alert("Please login first");
//       return;
//     }

//     const data = bookingData[movieId] || {};
//     const { seats, showDate } = data;

//     if (!seats || !showDate) {
//       alert("Please enter seats and show date");
//       return;
//     }

//     try {
//       await API.post("/book-movie", {
//         movieId,
//         seats: parseInt(seats),
//         showDate
//       });

//       alert("Movie Booked 🎟️");
//       // Refresh bookings
//       API.get("/bookings")
//         .then(res => setBookings(res.data.data))
//         .catch(err => console.log(err));
//     } catch (err) {
//       alert("Booking failed: " + (err.response?.data?.message || err.message));
//     }
//   };

//   const cancelBooking = async (bookingId) => {
//     try {
//       const res = await API.post("/cancel-booking", { bookingId });
//       alert(`Booking cancelled. Refund: ₹${res.data.refundAmount} (${res.data.refundPercent}%)`);
//       // Refresh bookings
//       API.get("/bookings")
//         .then(res => setBookings(res.data.data))
//         .catch(err => console.log(err));
//     } catch (err) {
//       alert("Cancel failed: " + (err.response?.data?.message || err.message));
//     }
//   };

//   const getBookingForMovie = (movieId) => {
//     return bookings.find(b => b.movie._id === movieId && b.status !== "cancelled");
//   };

//   return (
//     <div className="page page-list">
//       <h2>Movies</h2>
//       <div className="movies-list">
//         {movies.length === 0 ? (
//           <div className="movie-card">
//             <p>No movies available right now.</p>
//           </div>
//         ) : movies.map((m) => {
//           const booking = getBookingForMovie(m._id);
//           const isBooked = !!booking;

//           return (
//             <div key={m._id} className="movie-card">
//               {m.posterUrl ? (
//                 <img className="movie-poster" src={m.posterUrl} alt={m.title || m.name} />
//               ) : (
//                 <div className="movie-poster movie-poster--placeholder">No image</div>
//               )}
//               <h3>{m.title || m.name}</h3>
//               <p><strong>Description:</strong> {m.description}</p>
//               <p><strong>Genre:</strong> {m.genre}</p>
//               <p><strong>Language:</strong> {m.language}</p>
//               <p><strong>Duration:</strong> {m.durationInMinutes} minutes</p>
//               <p><strong>Release Date:</strong> {new Date(m.releaseDate).toLocaleDateString()}</p>
//               <p><strong>Price:</strong> ₹{m.price}</p>

//               {isBooked ? (
//                 <div className="booking-details">
//                   <p><strong>Booked for:</strong> {new Date(booking.showDate).toLocaleString()}</p>
//                   <p><strong>Seats:</strong> {booking.seats}</p>
//                   <button className="btn-cancel" onClick={() => cancelBooking(booking._id)}>Cancel</button>
//                 </div>
//               ) : (
//                 <div className="booking-form">
//                   <input
//                     type="number"
//                     placeholder="Seats"
//                     min="1"
//                     value={bookingData[m._id]?.seats || ""}
//                     onChange={(e) => handleBookingDataChange(m._id, "seats", e.target.value)}
//                   />
//                   <input
//                     type="datetime-local"
//                     value={bookingData[m._id]?.showDate || ""}
//                     onChange={(e) => handleBookingDataChange(m._id, "showDate", e.target.value)}
//                   />
//                   <button className="btn-book" onClick={() => bookMovie(m._id)}>Book Now</button>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Movies;


import { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";

function Movies() {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [bookingData, setBookingData] = useState({});

  useEffect(() => {
    // ✅ FIX: slice hata diya
    API.get("/movies")
      .then(res => {
        const movieList = res.data.movies || [];
        setMovies(movieList); // ⭐ ALL movies show
      })
      .catch(err => console.log(err));

    if (user) {
      API.get("/bookings")
        .then(res => setBookings(res.data.data))
        .catch(err => console.log(err));
    }
  }, [user]);

  const handleBookingDataChange = (movieId, field, value) => {
    setBookingData(prev => ({
      ...prev,
      [movieId]: {
        ...prev[movieId],
        [field]: value
      }
    }));
  };

  const bookMovie = async (movieId) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    const data = bookingData[movieId] || {};
    const { seats, showDate } = data;

    if (!seats || !showDate) {
      alert("Please enter seats and show date");
      return;
    }

    try {
      await API.post("/book-movie", {
        movieId,
        seats: parseInt(seats),
        showDate
      });

      alert("Movie Booked 🎟️");

      API.get("/bookings")
        .then(res => setBookings(res.data.data))
        .catch(err => console.log(err));

    } catch (err) {
      alert("Booking failed: " + (err.response?.data?.message || err.message));
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const res = await API.post("/cancel-booking", { bookingId });

      alert(`Refund: ₹${res.data.refundAmount}`);

      API.get("/bookings")
        .then(res => setBookings(res.data.data))
        .catch(err => console.log(err));

    } catch (err) {
      alert("Cancel failed: " + (err.response?.data?.message || err.message));
    }
  };

  const getBookingForMovie = (movieId) => {
    return bookings.find(
      b => b.movie._id === movieId && b.status !== "cancelled"
    );
  };

  return (
    <div className="page page-list">
      <h2>Movies</h2>

      <div className="movies-list">
        {movies.length === 0 ? (
          <div className="movie-card">
            <p>No movies available right now.</p>
          </div>
        ) : movies.map((m) => {
          const booking = getBookingForMovie(m._id);
          const isBooked = !!booking;

          return (
            <div key={m._id} className="movie-card">

              {/* ✅ IMAGE */}
              {m.posterUrl ? (
                <img
                  className="movie-poster"
                  src={m.posterUrl}
                  alt={m.title}
                />
              ) : (
                <div className="movie-poster movie-poster--placeholder">
                  No image
                </div>
              )}

              <h3>{m.title}</h3>
              <p><strong>Description:</strong> {m.description}</p>
              <p><strong>Release Date:</strong> {new Date(m.releaseDate).toLocaleDateString()}</p>
              <p><strong>Price:</strong> ₹{m.price}</p>

              {isBooked ? (
                <div className="booking-details">
                  <p><strong>Seats:</strong> {booking.seats}</p>
                  <button
                    className="btn-cancel"
                    onClick={() => cancelBooking(booking._id)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="booking-form">
                  <input
                    type="number"
                    placeholder="Seats"
                    min="1"
                    value={bookingData[m._id]?.seats || ""}
                    onChange={(e) =>
                      handleBookingDataChange(m._id, "seats", e.target.value)
                    }
                  />

                  <input
                    type="datetime-local"
                    value={bookingData[m._id]?.showDate || ""}
                    onChange={(e) =>
                      handleBookingDataChange(m._id, "showDate", e.target.value)
                    }
                  />

                  <button
                    className="btn-book"
                    onClick={() => bookMovie(m._id)}
                  >
                    Book Now
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Movies;