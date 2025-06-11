# 🏟️ Turf Booking Web App

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application for users to book sports turfs online and for owners to manage their listings, all with secure authentication.

## 🚀 Features

### 👤 User

- Register/Login (Email/Password or Google)
- Browse available turfs
- Book a turf for fixed time slots
- View upcoming bookings

### 👑 Owner

- Register/Login (Email/Password or Google)
- Create and manage turf listings
- See upcoming bookings and next users
- Edit turf details (price, timing, images)

### 🔐 Authentication

- JWT-based secure login
- Google OAuth using Google Identity Services
- Role-based route protection using React Router + Redux

## 🛠️ Tech Stack

| Frontend                | Backend           | Database | Auth        |
| ----------------------- | ----------------- | -------- | ----------- |
| React + Vite + Tailwind | Node.js + Express | MongoDB  | JWT, Google |

## 📁 Folder Structure

````
server/
├── controllers/
├── init/
├── middleware/
├── models/
├── routes/

client/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── services/
│   ├── utils/
│   └── App.jsx
│   └── Layout.jsx```

---

## 🧪 Key Endpoints

| Method | Route                     | Description                    |
|--------|---------------------------|--------------------------------|
| POST   | /auth/register            | User registration        |
| POST   | /auth/register-owner            | Owner registration        |
| POST   | /auth/login               | Login with email/password      |
| POST   | /auth/google              | Google OAuth login             |
| GET    | /auth/me                  | Get current logged-in user     |
| GET 	 | /turf/           |   Fetch all turfs    |
| GET	 | /turf/:id           |   Fetch a specific turfs    |
| GET	 | /turf/owner/:id           |   View turfs by specific owner    |
| POST   | /turf/              | Owner creates a turf           |
| POST   | /booking/                 | User books a turf              |
| GET    | /booking/user/:id       | User's upcoming bookings       |
| GET    | /booking/:id  | Owner’s upcoming booking info  |
| GET    | /booking/validate/:id  | Check for available slots  |
````

## 🎯 Future Enhancements

- Online payments via Razorpay
- Cancel bookings (with cancellation fee based on timing)
- Google Maps integration to show turf locations
- Turf reviews and ratings
- Notification system (email/SMS)
