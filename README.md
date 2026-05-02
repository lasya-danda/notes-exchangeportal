# Notes Portal

A full-stack web application for managing personal notes with user authentication, drag-and-drop file uploads, and a modern UI.

## Features

- **User Authentication**: Secure login and registration using JWT tokens.
- **Note Management**: Create, read, update, and delete notes.
- **File Uploads**: Drag-and-drop support for uploading images and files to notes, stored on Cloudinary.
- **Responsive Design**: Built with React and Tailwind CSS for a mobile-friendly experience.
- **Real-time Notifications**: Toast notifications for user feedback.
- **Rate Limiting**: Protects against abuse with Express rate limiting.
- **Admin Middleware**: Role-based access control for administrative features.

## Tech Stack

### Backend
- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for API development.
- **MongoDB**: NoSQL database with Mongoose ODM.
- **JWT**: JSON Web Tokens for authentication.
- **Cloudinary**: Cloud storage for file uploads.
- **Multer**: Middleware for handling file uploads.
- **bcryptjs**: Password hashing.
- **CORS**: Cross-origin resource sharing.

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework.
- **React Router**: Client-side routing.
- **Axios**: HTTP client for API requests.
- **React Dropzone**: Drag-and-drop file upload component.
- **Framer Motion**: Animation library for smooth transitions.
- **React Toastify**: Notification system.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- Cloudinary account for file storage

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd notes-portal-final
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the backend directory with the following variables:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     PORT=5000
     ```
   - Start the backend server:
     ```bash
     npm run dev
     ```

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

4. **Access the Application**:
   - Open your browser and go to `http://localhost:5173` for the frontend.
   - The backend will be running on `http://localhost:5000`.

## Usage

- **Register**: Create a new account on the registration page.
- **Login**: Log in with your credentials.
- **Dashboard**: View and manage your notes.
- **Create Notes**: Add new notes with text and file attachments.
- **Upload Files**: Drag and drop files into the upload area.
- **Edit/Delete Notes**: Modify or remove existing notes.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Log in a user.
- `POST /api/auth/logout` - Log out a user.

### Notes
- `GET /api/notes` - Get all notes for the authenticated user.
- `POST /api/notes` - Create a new note.
- `PUT /api/notes/:id` - Update a note.
- `DELETE /api/notes/:id` - Delete a note.

## Project Structure

```
notes-portal-final/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   └── services/
    ├── package.json
    ├── vite.config.js
    └── index.html
```

## Contributing

1. Fork the repository.
2. Create a new branch for your feature.
3. Make your changes and commit them.
4. Push to your fork and submit a pull request.

## License

This project is licensed under the MIT License.