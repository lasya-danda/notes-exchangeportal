import { motion } from 'framer-motion';
import { FiFileText, FiUpload, FiDownload } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function DashboardCards({ totalNotes, totalUploads, totalDownloads }) {
  const { darkMode } = useTheme();

  const cards = [
    { title: 'Total Notes', value: totalNotes, icon: <FiFileText size={24} />, color: 'indigo' },
    { title: 'Uploads', value: totalUploads, icon: <FiUpload size={24} />, color: 'purple' },
    { title: 'Downloads', value: totalDownloads, icon: <FiDownload size={24} />, color: 'blue' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-6 rounded-2xl shadow-lg backdrop-blur-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {card.title}
              </p>
              <p className={`text-3xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {card.value}
              </p>
            </div>
            <div className={`p-3 rounded-full bg-${card.color}-100 text-${card.color}-600`}>
              {card.icon}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
