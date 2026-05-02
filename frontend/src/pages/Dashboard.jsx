import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import DashboardCards from '../components/DashboardCards';
import NoteCard from '../components/NoteCard';
import DragDropUpload from '../components/DragDropUpload';
import { FiSearch, FiPlus, FiGrid, FiList } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [stats, setStats] = useState({ total: 0, uploads: 0, downloads: 0 });
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const fetchNotes = useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const r = await API.get(`/notes?page=${p}&search=${search}`);
      setNotes(r.data.notes);
      setTotalPages(r.data.pages);
      setPage(p);
      setStats(prev => ({ ...prev, total: r.data.total }));
    } catch (err) {
      toast.error('Failed to load notes');
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchNotes();
  }, [search, fetchNotes]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const r = await API.get('/auth/me');
        setUser(r.data.user);
      } catch (err) {
        navigate('/');
      }
    };
    fetchUser();
  }, [navigate]);

  const handleUpload = async ({ file, title, subject }) => {
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('title', title);
      fd.append('subject', subject);
      fd.append('file', file);
      await API.post('/notes', fd);
      toast.success('Note uploaded successfully!');
      fetchNotes();
    } catch (err) {
      toast.error('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (note) => {
    try {
      await API.put(`/notes/${note._id}`, { title: editing.title, subject: editing.subject });
      toast.success('Note updated!');
      fetchNotes();
      setEditing(null);
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await API.delete(`/notes/${id}`);
      toast.success('Note deleted!');
      fetchNotes();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleLike = async (id) => {
    try {
      await API.post(`/notes/${id}/like`);
      fetchNotes();
    } catch (err) {
      toast.error('Like failed');
    }
  };

  const handleRate = async (id, rating) => {
    try {
      await API.post(`/notes/${id}/rate`, { rating });
      toast.success('Rated successfully!');
      fetchNotes();
    } catch (err) {
      toast.error('Rating failed');
    }
  };

  const handleDownload = async (id) => {
    try {
      const r = await API.get(`/notes/${id}/download`);
      window.open(r.data.url, '_blank');
    } catch (err) {
      toast.error('Download failed');
    }
  };

  const handleLogout = async () => {
    try {
      await API.post('/auth/logout');
      localStorage.removeItem('userRole');
      navigate('/');
    } catch (err) {
      navigate('/');
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200'}`}>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Welcome back, <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{user?.name}</span>
          </h1>
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your study notes efficiently
          </p>
        </motion.div>

        {/* Stats Cards */}
        <DashboardCards
          totalNotes={stats.total}
          totalUploads={notes.filter(n => n.user?._id === user?._id).length}
          totalDownloads={notes.reduce((acc, n) => acc + (n.downloads || 0), 0)}
        />

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <DragDropUpload onUpload={handleUpload} loading={loading} />
        </motion.div>

        {/* Search and View Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"
        >
          <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border flex-1 max-w-md ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <FiSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search notes by title or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`flex-1 bg-transparent outline-none ${darkMode ? 'text-white placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'}`}
            />
          </div>
          <div className={`flex items-center gap-2 p-1 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              <FiGrid />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              <FiList />
            </button>
          </div>
        </motion.div>

        {/* Edit Modal */}
        <AnimatePresence>
          {editing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setEditing(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-md p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}
              >
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Edit Note</h3>
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full p-3 mb-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={editing.subject}
                  onChange={(e) => setEditing({ ...editing, subject: e.target.value })}
                  className="w-full p-3 mb-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  placeholder="Subject"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => handleUpdate(editing)}
                    className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notes Grid/List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            <motion.div
              className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <AnimatePresence>
                {notes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onEdit={setEditing}
                    onDelete={handleDelete}
                    onLike={handleLike}
                    onRate={handleRate}
                    onDownload={handleDownload}
                    isAdmin={user?.role === 'admin'}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {notes.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center py-20 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                <p className="text-xl">No notes found</p>
                <p className="mt-2">Upload your first note to get started!</p>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center gap-2 mt-8 pb-8"
              >
                <button
                  onClick={() => fetchNotes(page - 1)}
                  disabled={page === 1}
                  className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'} border disabled:opacity-50 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => fetchNotes(p)}
                    className={`px-4 py-2 rounded-lg transition-all ${p === page ? 'bg-indigo-600 text-white' : `${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'} border hover:bg-indigo-50 dark:hover:bg-gray-700`}`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => fetchNotes(page + 1)}
                  disabled={page === totalPages}
                  className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'} border disabled:opacity-50 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors`}
                >
                  Next
                </button>
              </motion.div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
