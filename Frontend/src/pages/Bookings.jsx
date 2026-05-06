import { useEffect, useState } from "react";
import API from "../api";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchBookings = () => {
    API.get("/bookings")
      .then(res => {
        const allBookings = res.data.data || [];
        setBookings(allBookings.filter(b => b.user?._id === userId));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchBookings();
  }, [userId]);

  const cancelBooking = async (id) => {
    try {
      const res = await API.post("/cancel-booking", {
        bookingId: id
      });

      alert(`Refund Amount: ₹${res.data.refundAmount} (${res.data.refundPercent}%)`);

      fetchBookings();
    } catch (err) {
      alert("Cancel failed: " + (err.response?.data?.message || err.message));
    }
  };

  if (!userId) {
    return (
      <div className="page page-list">
        <h2>My Bookings</h2>
        <p>Please login to view your booked movies.</p>
      </div>
    );
  }

  return (
    <div className="page page-list">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="movie-card">
          <p>No booked movies yet.</p>
        </div>
      ) : bookings.map((b) => (
        <div key={b._id} className="movie-card">
          <h3>{b.movie?.title || b.movie?.name}</h3>
          <p><strong>Show:</strong> {new Date(b.showDate).toLocaleString()}</p>
          <p><strong>Seats:</strong> {b.seats}</p>
          <p><strong>Status:</strong> {b.status}</p>
          <p><strong>Total:</strong> ₹{b.totalAmount}</p>
          {b.status !== "cancelled" ? (
            <button className="btn-cancel" onClick={() => cancelBooking(b._id)}>Cancel Booking</button>
          ) : (
            <p><strong>Refund:</strong> ₹{b.refundAmount}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Bookings;