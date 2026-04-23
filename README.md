# 📚 Student Notes Exchange Portal
A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that allows students to securely register, login, and exchange academic notes. Features JWT authentication, file uploads, search functionality, and a responsive UI.
![MERN Stack](https://img.shields.io/badge/MERN-Stack-green) ![React](https://img.shields.io/badge/React-18.3.1-blue) ![Node.js](https://img.shields.io/badge/Node.js-22.21.0-green) ![MongoDB](https://img.shields.io/badge/MongoDB-8.5.0-green) ![JWT](https://img.shields.io/badge/JWT-Authentication-orange)

## ✨ Features

### 🔐 Authentication & Security
- User registration and login with JWT authentication
- Password hashing using bcrypt
- HTTP-only cookies for secure token storage
- Protected routes and middleware
- Rate limiting and input validation

### 📁 File Management
- Upload academic notes (PDF, DOC, DOCX files only)
- File size limit (5MB maximum)
- Secure file storage with Multer
- Download tracking and file serving

### 🎯 Core Functionality
- **CRUD Operations**: Create, read, update, delete notes
- **Search & Filter**: Search notes by title or subject
- **Pagination**: Efficient data loading (10 items per page)
- **Like System**: Users can like/unlike notes
- **Rating System**: Rate notes 1-5 stars
- **User Ownership**: Users can only edit/delete their own notes

### 🎨 User Interface
- Responsive design with Tailwind CSS
- Smooth animations with Framer Motion
- Toast notifications for user feedback
- Loading indicators and error handling
- Clean, modern UI with hover effects

### 🛡️ Security Features
- Express Validator for input sanitization
- CORS configuration
- File type and size restrictions
- SQL injection prevention with Mongoose
- XSS protection

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Hot Toast** - Notification system
- **Vite** - Build tool

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **express-validator** - Input validation
- **express-rate-limit** - Rate limiting
- **cookie-parser** - Cookie handling
- **CORS** - Cross-origin resource sharing

### DevOps
- **Nodemon** - Auto-restart for development
- **Dotenv** - Environment variable management

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** - Either:
  - Local installation [Download](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas (cloud) [Sign up](https://www.mongodb.com/atlas)
- **Git** - [Download](https://git-scm.com/)

### Verify Installation
```bash
node --version
npm --version
```

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/student-notes-portal.git
cd student-notes-portal
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Environment Configuration

#### Backend (.env)
Create a `.env` file in the `backend` directory:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/notesdb
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:5174
```

#### MongoDB Setup
- **MongoDB Atlas**: Create a cluster, get connection string
- **Local MongoDB**: Use `mongodb://localhost:27017/notesdb`

### 5. Start the Application

#### Backend (Terminal 1)
```bash
cd backend
npm run dev
```
Server will run on `http://localhost:5001`

#### Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
App will run on `http://localhost:5174`

## 📖 Usage

### User Registration
1. Navigate to the registration page
2. Fill in name, email, and password
3. Click "Register"
4. You'll be redirected to login

### User Login
1. Enter your email and password
2. Click "Login"
3. You'll be redirected to the dashboard

### Dashboard Features
- **Upload Notes**: Fill title, subject, select file, click upload
- **Search**: Use the search bar to find notes
- **Like/Rate**: Click heart icon to like, select rating
- **Edit/Delete**: Click edit to modify, delete to remove (your notes only)
- **Download**: Click download link to get files
- **Pagination**: Navigate through pages of notes

### File Upload Guidelines
- **Allowed formats**: PDF, DOC, DOCX
- **Maximum size**: 5MB
- **Naming**: Files are automatically renamed with timestamp

## 🔌 API Endpoints

### Authentication
```
POST /api/auth/register  - User registration
POST /api/auth/login     - User login
POST /api/auth/logout    - User logout
```

### Notes Management
```
GET  /api/notes          - Get all notes (with pagination & search)
POST /api/notes          - Upload new note
PUT  /api/notes/:id      - Update note (owner only)
DELETE /api/notes/:id    - Delete note (owner only)
POST /api/notes/:id/like - Like/unlike note
POST /api/notes/:id/rate - Rate note
GET  /api/notes/:id/download - Download note file
```

### Request/Response Examples

#### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Upload Note
```bash
POST /api/notes
Content-Type: multipart/form-data

{
  title: "Mathematics Notes",
  subject: "Calculus",
  file: [file]
}
```

## 📁 Project Structure

```
student-notes-portal/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── noteController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── admin.js
│   │   └── upload.js
│   ├── models/
│   │   ├── User.js
│   │   └── Note.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── noteRoutes.js
│   ├── uploads/          # File storage
│   ├── .env              # Environment variables
│   ├── server.js         # Main server file
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── vercel.json       # Deployment config
│   └── package.json
└── README.md
```

## 🔧 Environment Variables

### Backend
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/notesdb` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key_here` |
| `PORT` | Server port | `5001` |
| `NODE_ENV` | Environment mode | `development` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5174` |

## 🚢 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Update `vercel.json` with your backend URL

### Backend (Render)
1. Create new Web Service on Render
2. Connect GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy

### Environment Variables for Production
```env
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
PORT=10000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Test API endpoints with Postman
- Ensure responsive design
- Add proper error handling

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT.io](https://jwt.io/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

If you have any questions or issues, please open an issue on GitHub or contact the maintainers.

