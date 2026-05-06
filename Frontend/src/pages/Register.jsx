import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", form);
      alert("Registered Successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Error");
    }
  };

  return (
    <div className="page page-form">
      <h2>Register</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={form.username}
          required
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={form.email}
          required
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          required
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;