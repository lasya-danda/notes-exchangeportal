import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiFile, FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function DragDropUpload({ onUpload, loading }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const { darkMode } = useTheme();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !title || !subject) return;
    onUpload({ file, title, subject });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-2xl shadow-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}
    >
      <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Upload New Note
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={`p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800'} focus:ring-2 focus:ring-indigo-500`}
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className={`p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800'} focus:ring-2 focus:ring-indigo-500`}
          />
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 mb-4 text-center cursor-pointer transition-colors ${isDragActive ? 'border-indigo-500 bg-indigo-50' : `${darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'}`}`}
        >
          <input {...getInputProps()} />
          <FiUploadCloud className={`mx-auto mb-3 ${isDragActive ? 'text-indigo-500' : 'text-gray-400'}`} size={48} />
          {isDragActive ? (
            <p className="text-indigo-500">Drop the file here</p>
          ) : (
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Drag & drop a PDF/DOC file here, or click to select
            </p>
          )}
        </div>

        {file && (
          <div className={`flex items-center justify-between p-3 mb-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-3">
              <FiFile className="text-indigo-500" />
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{file.name}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="text-red-500 hover:text-red-600"
            >
              <FiX size={18} />
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !file || !title || !subject}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-70"
        >
          {loading ? 'Uploading...' : 'Upload Note'}
        </button>
      </form>
    </motion.div>
  );
}
