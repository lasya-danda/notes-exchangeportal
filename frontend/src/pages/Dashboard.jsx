
import {useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiLogOut, FiBook, FiDownload, FiHeart } from 'react-icons/fi';
import NoteCard from '../components/NoteCard';
import UploadForm from '../components/UploadForm';
import SearchBar from '../components/SearchBar';

export default function Dashboard(){
 const [notes,setNotes]=useState([]);
 const [f,setF]=useState(null);
 const [title, setTitle] = useState('');
 const [subject, setSubject] = useState('');
 const [search, setSearch] = useState('');
 const [editing, setEditing] = useState(null);
 const [page, setPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);
 const [loading, setLoading] = useState(false);
 const [stats, setStats] = useState({total: 0, likes: 0, downloads: 0});
 const navigate = useNavigate();

 const fetchNotes = async(p=1) => {
  setLoading(true);
  try {
   const r=await API.get(`/notes?page=${p}&search=${search}`);
   setNotes(r.data.notes);
   setTotalPages(r.data.pages);
   setPage(p);
   setStats({
    total: r.data.total,
    likes: r.data.notes.reduce((acc, n) => acc + n.likes.length, 0),
    downloads: r.data.notes.reduce((acc, n) => acc + n.downloads, 0)
   });
  } catch (err) {
   toast.error('Failed to load notes');
  } finally {
   setLoading(false);
  }
 };

 useEffect(()=>{fetchNotes();},[search]);

 const upload=async(e)=>{
  e.preventDefault();
  if(!f || !title || !subject) return toast.error('Please fill all fields');
  setLoading(true);
  try {
   const fd=new FormData();
   fd.append('title',title);
   fd.append('subject',subject);
   fd.append('file',f);
   await API.post('/notes',fd);
   toast.success('Note uploaded successfully! 🎉');
   fetchNotes();
   setF(null);
   setTitle('');
   setSubject('');
  } catch (err) {
   toast.error(err.response?.data?.error || 'Upload failed');
  } finally {
   setLoading(false);
  }
 };

 const updateNote = async(id) => {
  try {
   await API.put(`/notes/${id}`, {title: editing.title, subject: editing.subject});
   toast.success('Note updated!');
   fetchNotes();
   setEditing(null);
  } catch (err) {
   toast.error('Update failed');
  }
 };

 const deleteNote = async(id) => {
  if(!confirm('Are you sure you want to delete this note?')) return;
  try {
   await API.delete(`/notes/${id}`);
   toast.success('Note deleted');
   fetchNotes();
  } catch (err) {
   toast.error('Delete failed');
  }
 };

 const likeNote = async(id) => {
  try {
   await API.post(`/notes/${id}/like`);
   fetchNotes();
  } catch (err) {
   toast.error('Like failed');
  }
 };

 const rateNote = async(id, rating) => {
  if(!rating) return;
  try {
   await API.post(`/notes/${id}/rate`, {rating});
   toast.success('Note rated!');
   fetchNotes();
  } catch (err) {
   toast.error('Rating failed');
  }
 };

 const downloadNote = async(id) => {
  try {
   const r = await API.get(`/notes/${id}/download`);
   window.open(r.data.url, '_blank');
  } catch (err) {
   toast.error('Download failed');
  }
 };

 const logout = async() => {
  try {
   await API.post('/auth/logout');
   toast.success('Logged out');
   navigate('/');
  } catch (err) {
   navigate('/');
  }
 };

 const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
   opacity: 1,
   transition: { staggerChildren: 0.1 }
  }
 };

 const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
   whileHover={{ scale: 1.05 }}
   className={`bg-gradient-to-br ${color} rounded-lg shadow-md p-6 text-white`}
  >
   <div className="flex items-center justify-between">
    <div>
     <p className="text-sm opacity-90">{label}</p>
     <p className="text-3xl font-bold">{value}</p>
    </div>
    <Icon className="w-12 h-12 opacity-30" />
   </div>
  </motion.div>
 );

 return(
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
   <Toaster position="top-right" />

   {/* Header */}
   <motion.div
    initial={{ value: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white shadow-md border-b border-gray-200"
   >
    <div className="max-w-7xl mx-auto px-6 py-6">
     <div className="flex justify-between items-center">
      <motion.div
       whileHover={{ scale: 1.05 }}
       className="flex items-center gap-3"
      >
       <FiBook className="w-8 h-8 text-blue-600" />
       <div>
        <h1 className="text-3xl font-bold text-gray-800">Notes Portal</h1>
        <p className="text-sm text-gray-600">Share and discover academic resources</p>
       </div>
      </motion.div>
      <motion.button
       whileHover={{ scale: 1.05 }}
       whileTap={{ scale: 0.95 }}
       onClick={logout}
       className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-lg transition shadow-md"
      >
       <FiLogOut className="w-5 h-5" />
       Logout
      </motion.button>
     </div>
    </div>
   </motion.div>

   <div className="max-w-7xl mx-auto px-6 py-8">
    {/* Stats */}
    <motion.div
     variants={containerVariants}
     initial="hidden"
     animate="visible"
     className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
    >
     <StatCard
      icon={FiBook}
      label="Total Notes"
      value={stats.total}
      color="from-blue-500 to-blue-600"
     />
     <StatCard
      icon={FiHeart}
      label="Total Likes"
      value={stats.likes}
      color="from-red-500 to-red-600"
     />
     <StatCard
      icon={FiDownload}
      label="Total Downloads"
      value={stats.downloads}
      color="from-green-500 to-green-600"
     />
    </motion.div>

    {/* Upload Form */}
    <UploadForm
     title={title}
     subject={subject}
     file={f}
     loading={loading}
     onTitleChange={(e) => setTitle(e.target.value)}
     onSubjectChange={(e) => setSubject(e.target.value)}
     onFileChange={(e) => setF(e.target.files[0])}
     onSubmit={upload}
    />

    {/* Search Bar */}
    <SearchBar
     search={search}
     onChange={(e) => setSearch(e.target.value)}
    />

    {/* Notes Grid */}
    {loading ? (
     <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1 }}
      className="flex justify-center items-center py-12"
     >
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
     </motion.div>
    ) : notes.length === 0 ? (
     <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-12"
     >
      <FiBook className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <p className="text-xl text-gray-600">No notes found. Upload one to get started! 📝</p>
     </motion.div>
    ) : (
     <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
     >
      {notes.map(n=>(
       <NoteCard
        key={n._id}
        note={n}
        isEditing={editing && editing.id === n._id}
        editData={editing}
        onEdit={(id) => setEditing({id, title: n.title, subject: n.subject})}
        onDelete={deleteNote}
        onLike={likeNote}
        onRate={rateNote}
        onDownload={downloadNote}
        onEditChange={setEditing}
        onSave={updateNote}
        onCancel={() => setEditing(null)}
       />
      ))}
     </motion.div>
    )}

    {/* Pagination */}
    {totalPages > 1 && (
     <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center gap-2 mt-8"
     >
      {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
       <motion.button
        key={p}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={()=>fetchNotes(p)}
        className={`px-4 py-2 rounded-lg font-medium transition ${
         p===page
          ? 'bg-blue-600 text-white shadow-lg'
          : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-600'
        }`}
       >
        {p}
       </motion.button>
      ))}
     </motion.div>
    )}
   </div>
  </div>
 );
}
