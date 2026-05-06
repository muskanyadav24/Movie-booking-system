// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await login(form.email, form.password);
//       alert("Login Success");
//       navigate("/movies");
//     } catch (err) {
//       alert(err.response?.data?.message || err.message || "Login Failed");
//     }
//   };

//   return (
//     <div className="page page-form">
//       <h2>Login</h2>

//       <form className="auth-form" onSubmit={handleSubmit}>
//         <input
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) =>
//             setForm({ ...form, email: e.target.value })
//           }
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={(e) =>
//             setForm({ ...form, password: e.target.value })
//           }
//         />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login(form.email, form.password);

      // ✅ ROLE BASED REDIRECT
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/movies");
      }

    } catch (err) {
      alert(err.response?.data?.message || err.message || "Login Failed");
    }
  };

  return (
    <div className="page page-form">
      <h2>Login</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          name="email"
          required
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">Login</button>
        <p>New user? <Link to="/register">Register here</Link></p>
      </form>
    </div>
  );
}

export default Login;