import { motion } from 'framer-motion';
import { FiDownload, FiEdit2, FiTrash2, FiHeart, FiStar } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';

export default function NoteCard({ note, onEdit, onDelete, onLike, onRate, onDownload, isEditing, editData, onEditChange, onSave, onCancel }) {
  const avgRating = note.ratings.length > 0 ? (note.ratings.reduce((acc, r) => acc + r.rating, 0) / note.ratings.length).toFixed(1) : 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {isEditing ? (
        <div className="p-6">
          <input
            value={editData.title}
            onChange={(e) => onEditChange({ ...editData, title: e.target.value })}
            placeholder="Title"
            className="w-full border-2 border-blue-300 rounded p-2 mb-3 focus:outline-none focus:border-blue-500"
          />
          <input
            value={editData.subject}
            onChange={(e) => onEditChange({ ...editData, subject: e.target.value })}
            placeholder="Subject"
            className="w-full border-2 border-blue-300 rounded p-2 mb-4 focus:outline-none focus:border-blue-500"
          />
          <div className="flex gap-2">
            <button
              onClick={() => onSave(note._id)}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800 mb-1">{note.title}</h3>
            <p className="text-sm text-blue-600 font-medium mb-2">{note.subject}</p>
            <p className="text-xs text-gray-500">By {note.user.name}</p>
          </div>

          {/* Stats */}
          <div className="flex gap-3 mb-4 text-sm text-gray-600 border-y border-gray-200 py-3">
            <div className="flex items-center gap-1">
              <AiFillHeart className="text-red-500" />
              <span>{note.likes.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiStar className="text-yellow-500" />
              <span>{avgRating}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiDownload className="text-green-500" />
              <span>{note.downloads}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => onLike(note._id)}
              className="flex items-center gap-1 flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-medium transition"
            >
              <FiHeart className="w-4 h-4" />
              Like
            </button>
            <select
              onChange={(e) => onRate(note._id, e.target.value)}
              defaultValue=""
              className="flex-1 bg-yellow-50 border border-yellow-300 text-yellow-700 px-3 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Rate</option>
              <option value="1">⭐ 1</option>
              <option value="2">⭐ 2</option>
              <option value="3">⭐ 3</option>
              <option value="4">⭐ 4</option>
              <option value="5">⭐ 5</option>
            </select>
            <button
              onClick={() => onDownload(note._id)}
              className="flex items-center gap-1 flex-1 bg-green-50 hover:bg-green-100 text-green-600 px-3 py-2 rounded-lg text-sm font-medium transition"
            >
              <FiDownload className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={() => onEdit(note._id)}
              className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition"
            >
              <FiEdit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(note._id)}
              className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-medium transition"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}