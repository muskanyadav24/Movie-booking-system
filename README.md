# 🎬 Movie Booking System

I built a **Full Stack Movie Booking Application** using **React (Frontend)**, **Node.js + Express (Backend)**, and **MongoDB (Database)**.

This project simulates a real-world movie ticket booking system where users can register, login, browse movies, book tickets, and cancel bookings with a dynamic refund system.

---

## 🔥 Key Features

### 👤 User Authentication
- Register & Login functionality  
- Secure password hashing using **bcrypt**

---

### 🎬 Movies Module
- Add Movies  
- View all available movies in a dynamic **React UI**

---

### 🎟️ Booking System
- Book movie tickets through UI  
- View all bookings in real time  
- Cancel bookings with confirmation  

---

## 🧠 Refund Logic

Refund depends on how early the user cancels the ticket:

| Time Before Show | Refund |
| ---------------- | ------ |
| ≥ 24 hours       | 80%    |
| ≥ 12 hours       | 60%    |
| ≥ 8 hours        | 50%    |
| ≥ 6 hours        | 40%    |
| ≥ 4 hours        | 30%    |
| ≥ 3 hours        | 20%    |
| < 3 hours        | 0%     |

---

## 🧠 Tech Stack

### Frontend
- React.js  
- Axios  
- React Router  
- CSS / Tailwind  

### Backend
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- bcrypt  
- dotenv  

---

## ⚙️ What I Learned
- Full Stack MERN architecture  
- API development & integration  
- Authentication & password security  
- Frontend-backend communication using Axios  
- Real-world booking system logic  
- Refund calculation logic based on time  

---

## 💡 Project Highlights
- ✔️ Fully functional React UI  
- ✔️ RESTful APIs  
- ✔️ Real-time booking flow  
- ✔️ Clean component-based frontend  
- ✔️ Database integration with MongoDB  
- ✔️ MVC structured backend  

---

## ✅ Implemented Features

* 👤 User Registration (with validation & unique email/username)
* 🔐 User Login (with password hashing using bcrypt)
* 🎬 Add Movie API
* 📄 Get All Movies
* 🎟️ Book Movie Tickets
* ❌ Cancel Booking
* 💰 Dynamic Refund System based on cancellation time
* 🔗 MongoDB integration using Mongoose
* 📦 RESTful API structure (MVC pattern)

---

## 👨‍💻 Author
Muskan Yadav  

---

📌 This project helped me understand how real-world booking systems work and strengthened my full stack development skills.
