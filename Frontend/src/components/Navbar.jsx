// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function Navbar() {
//   const { user, logout } = useAuth();

//   return (
//     <nav className="navbar">
//       <Link to="/movies">Movies</Link>
//       {user && <Link to="/bookings">Bookings</Link>}
//       {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
//       {!user ? (
//         <>
//           <Link to="/login">Login</Link>
//           <Link to="/register">Register</Link>
//         </>
//       ) : (
//         <button onClick={logout}>Logout</button>
//       )}
//     </nav>
//   );
// }

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // ✅ redirect after logout
  };

  return (
    <nav className="navbar">
      <Link to="/movies">Movies</Link>

      {user && <Link to="/bookings">Bookings</Link>}
      {user?.role === 'admin' && <Link to="/admin">Admin</Link>}

      {!user ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
}

export default Navbar;