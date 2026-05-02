import { motion } from 'framer-motion';
import { FiDownload, FiEdit, FiTrash2, FiHeart, FiStar, FiFileText, FiCalendar } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function NoteCard({ note, onEdit, onDelete, onLike, onRate, onDownload, isAdmin }) {
  const { darkMode } = useTheme();

  const getInitials = (name) => name ? name.charAt(0).toUpperCase() : '?';

  const avgRating = note.ratings?.length
    ? (note.ratings.reduce((acc, r) => acc + r.rating, 0) / note.ratings.length).toFixed(1)
    : null;

  const fileType = note.file?.split('.').pop()?.toUpperCase() || 'DOC';

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl p-[2px] bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className={`group h-full rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-5">
          {/* Header with file type badge and date */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs font-bold rounded bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                {fileType}
              </span>
              <span className={`flex items-center gap-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <FiCalendar size={12} />
                {formatDate(note.createdAt)}
              </span>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
              {note.user?.name || 'Unknown'}
            </div>
          </div>

          {/* Title and Subject */}
          <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${darkMode ? 'text-white group-hover:text-indigo-400' : 'text-gray-800 group-hover:text-indigo-600'} transition-colors`}>
            {note.title}
          </h3>
          <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {note.subject}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-4 mb-5">
            {/* Likes */}
            <button
              onClick={() => onLike(note._id)}
              className="flex items-center gap-1.5 text-sm hover:scale-110 transition-transform"
            >
              <FiHeart className={`${note.likes?.includes(note._id) ? 'fill-red-500 text-red-500' : 'text-red-400'}`} size={16} />
              <span className="text-gray-600 dark:text-gray-400">{note.likes?.length || 0}</span>
            </button>

            {/* Downloads */}
            <div className="flex items-center gap-1.5 text-sm text-blue-500">
              <FiDownload size={16} />
              <span className="text-gray-600 dark:text-gray-400">{note.downloads || 0}</span>
            </div>

            {/* Rating */}
            {avgRating && (
              <div className="flex items-center gap-1 text-sm text-yellow-500">
                <FiStar className="fill-yellow-400" size={16} />
                <span className="text-gray-600 dark:text-gray-400">{avgRating}</span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={() => onLike(note._id)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              <FiHeart size={14} />
              Like
            </button>

            <select
              onChange={(e) => {
                if (e.target.value) {
                  onRate(note._id, e.target.value);
                  e.target.value = '';
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer
                ${darkMode ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' : 'bg-gray-50 border-gray-300 hover:bg-gray-100'} transition-colors`}
            >
              <option value="">⭐ Rate</option>
              {[1,2,3,4,5].map(r => <option key={r} value={r}>{r} Star{r>1?'s':''}</option>)}
            </select>

            <button
              onClick={() => onDownload(note._id)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <FiDownload size={14} />
              Download
            </button>

            <button
              onClick={() => onEdit(note)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <FiEdit size={14} />
              Edit
            </button>

            {isAdmin && (
              <button
                onClick={() => onDelete(note._id)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors ml-auto"
              >
                <FiTrash2 size={14} />
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
