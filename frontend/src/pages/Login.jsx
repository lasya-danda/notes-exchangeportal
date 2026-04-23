
import {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API, { getApiErrorMessage } from '../services/api';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiBook } from 'react-icons/fi';

export default function Login(){
 const [d,setD]=useState({email:'',password:''});
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
 const login=async(e)=>{
  e.preventDefault();
  setLoading(true);
  try {
   const r=await API.post('/auth/login',d);
   toast.success(r.data.message);
   navigate('/dashboard');
  } catch (err) {
   toast.error(getApiErrorMessage(err, 'Login failed'));
  } finally {
   setLoading(false);
  }
 };
 return(
  <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 flex items-center justify-center p-4 relative overflow-hidden">
   {/* Animated Background Elements */}
   <motion.div className="absolute top-10 left-10 w-40 h-40 bg-white opacity-10 rounded-full" animate={{y: [0, 20, 0]}} transition={{duration: 4, repeat: Infinity}} />
   <motion.div className="absolute bottom-10 right-10 w-60 h-60 bg-white opacity-10 rounded-full" animate={{y: [0, -20, 0]}} transition={{duration: 5, repeat: Infinity}} />
   
   <Toaster />
   <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="relative z-10 w-full max-w-md">
    <motion.div initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.2}} className="text-center mb-8">
     <motion.div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 mb-4">
      <FiBook className="text-white w-5 h-5" />
      <span className="text-white font-semibold">Notes Portal</span>
     </motion.div>
     <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
     <p className="text-blue-100">Login to access your academic notes</p>
    </motion.div>
    
    <form onSubmit={login} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
     {/* Email Input */}
     <div className="mb-5">
      <label className="block text-white text-sm font-semibold mb-2">Email Address</label>
      <div className="relative">
       <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-200 w-5 h-5" />
       <input
        value={d.email}
        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-blue-100 focus:outline-none focus:border-white focus:ring-2 focus:ring-blue-300 transition"
        placeholder="your.email@example.com"
        type="email"
        required
        onChange={e=>setD({...d,email:e.target.value})}
       />
      </div>
     </div>
     
     {/* Password Input */}
     <div className="mb-6">
      <label className="block text-white text-sm font-semibold mb-2">Password</label>
      <div className="relative">
       <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-200 w-5 h-5" />
       <input
        value={d.password}
        type="password"
        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-blue-100 focus:outline-none focus:border-white focus:ring-2 focus:ring-blue-300 transition"
        placeholder="••••••••"
        required
        onChange={e=>setD({...d,password:e.target.value})}
       />
      </div>
     </div>
     {/* Submit Button */}
     <motion.button
      type="submit"
      disabled={loading}
      whileHover={{scale: 1.02}}
      whileTap={{scale: 0.98}}
      className="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
     >
      {loading ? (
       <motion.span animate={{opacity: [1, 0.5, 1]}} transition={{duration: 1.5, repeat: Infinity}}>
        Logging in...
       </motion.span>
      ) : (
       'Login'
      )}
     </motion.button>
     
     {/* Register Link */}
     <p className="mt-6 text-center text-blue-100">
      Don't have an account?{' '}
      <Link to="/register" className="text-white font-semibold hover:text-blue-200 transition">
       Sign up here
      </Link>
     </p>
    </form>
   </motion.div>
  </div>
 );
}
