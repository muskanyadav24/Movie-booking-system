// import { useState } from "react";
// import API from "../api";

// function Admin() {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     showtime: "",
//     price: ""
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post("/add-movie", form);
//       alert("Movie added successfully");
//       setForm({ title: "", description: "", showtime: "", price: "" });
//     } catch (err) {
//       alert(err.response?.data?.message || err.message || "Error");
//     }
//   };

//   return (
//     <div className="page">
//       <h2>Admin Panel - Add Movie</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           placeholder="Title"
//           name="title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           required
//         />
//         <input
//           placeholder="Description"
//           name="description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           required
//         />
//         <input
//           name="showtime"
//           type="datetime-local"
//           placeholder="Showtime"
//           value={form.showtime}
//           onChange={(e) => setForm({ ...form, showtime: e.target.value })}
//           required
//         />
//         <input
//           name="seats"
//           type="number"
//           placeholder="Number of seats"
//           value={form.seats}
//           onChange={(e) => setForm({ ...form, seats: e.target.value })}
//           required
//         />
//         <input
//           name="image"
//           type="text"
//           placeholder="Image url"
//           value={form.image}
//           onChange={(e) => setForm({ ...form, image: e.target.value })}
//           required
//         />
//         <input
//           name="price"
//           type="number"
//           placeholder="Price"
//           value={form.price}
//           onChange={(e) => setForm({ ...form, price: e.target.value })}
//           required
//         />
//         <input
//           type="datetime-local"
//           placeholder="Showtime"
//           value={form.showtime}
//           onChange={(e) => setForm({ ...form, showtime: e.target.value })}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Number of seats"
//           value={form.seats}
//           onChange={(e) => setForm({ ...form, seats: e.target.value })}
//           required
//         />
//         <input
//           type="text"
//           name="image"
//           placeholder="Image url"
//           value={form.image}
//           onChange={(e) => setForm({ ...form, image: e.target.value })}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={form.price}
//           onChange={(e) => setForm({ ...form, price: e.target.value })}
//           required
//         />
//         <button type="submit">Add Movie</button>
//       </form>
//     </div>
//   );
// }

// export default Admin;


import { useState } from "react";
import API from "../api";

function Admin() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    showtime: "",
    price: "",
    image: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/add-movie", form);

      alert("Movie added successfully");

      setForm({
        title: "",
        description: "",
        showtime: "",
        price: "",
        image: ""
      });

    } catch (err) {
      alert(err.response?.data?.message || err.message || "Error");
    }
  };

  return (
    <div className="page">
      <h2>Admin Panel - Add Movie</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <input
          type="datetime-local"
          value={form.showtime}
          onChange={(e) => setForm({ ...form, showtime: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default Admin;