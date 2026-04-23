import { FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function SearchBar({ search, onChange }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-6"
    >
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="🔍 Search by title or subject..."
          value={search}
          onChange={onChange}
          className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500 transition text-gray-700"
        />
      </div>
    </motion.div>
  );
}