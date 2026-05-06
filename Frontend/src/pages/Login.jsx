import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", form);

      localStorage.setItem("userId", res.data.user._id);

      alert("Login Success");
      navigate("/movies");
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
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;