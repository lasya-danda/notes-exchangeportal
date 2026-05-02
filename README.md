# 📚 Notes Exchange Portal

A full-stack web application for managing and sharing notes with secure authentication, file uploads, and a modern responsive UI.

---


---

## 📌 Project Overview

This project allows students to upload, manage, and share notes efficiently. It includes authentication, file upload support, and a user-friendly dashboard.

---

## 🚀 Features

* 🔐 User Authentication (JWT-based login/signup)
* 📝 Create, Read, Update, Delete Notes (CRUD)
* 📂 Drag & Drop File Upload (Cloudinary)
* 📱 Fully Responsive UI (React + Tailwind CSS)
* 🔔 Real-time Notifications (Toast)
* 🛡️ Rate Limiting & Security Middleware
* 👨‍💼 Admin Role Support

---

## 🛠️ Tech Stack

### 🔙 Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Cloudinary
* Multer
* bcryptjs

### 🎨 Frontend

* React (Vite)
* Tailwind CSS
* React Router
* Axios
* React Dropzone
* Framer Motion
* React Toastify

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/lasya-danda/notes-exchange-portal.git
cd notes-portal-final
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
PORT=5000
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🌐 Run Project

* Frontend: http://localhost:5173
* Backend: http://localhost:5000

---

---

## 📸 Screenshots

*Add your UI screenshots here (Dashboard, Login, Upload, etc.)*

---

## 📡 API Endpoints

### Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`
* POST `/api/auth/logout`

### Notes

* GET `/api/notes`
* POST `/api/notes`
* PUT `/api/notes/:id`
* DELETE `/api/notes/:id`

---

## 📂 Project Structure

```
notes-portal-final/
├── backend/
├── frontend/
```

---

## 🔮 Future Scope

* 📊 Analytics Dashboard
* 📁 Folder-based note organization
* 📱 Mobile App version

---

## 📜 License

This project is licensed under the MIT License.

---
