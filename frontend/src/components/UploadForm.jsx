import { motion } from 'framer-motion';
import { FiUpload, FiFileText } from 'react-icons/fi';

export default function UploadForm({ title, subject, file, loading, onTitleChange, onSubjectChange, onFileChange, onSubmit }) {
  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 border border-blue-100"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <FiUpload className="text-blue-600" />
        Upload New Note
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Title Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={onTitleChange}
            required
            className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Subject Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={onSubjectChange}
            required
            className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* File Input */}
        <div className="relative">
          <label className="cursor-pointer block">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 hover:border-blue-500 transition bg-white flex items-center gap-2">
              <FiFileText className="text-gray-400" />
              <span className="text-gray-600 truncate text-sm">
                {file ? file.name : 'Choose File'}
              </span>
            </div>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={onFileChange}
              required
              className="hidden"
            />
          </label>
          <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
        </div>

        {/* Upload Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiUpload className="w-5 h-5" />
          {loading ? 'Uploading...' : 'Upload'}
        </motion.button>
      </div>
    </motion.form>
  );
}