import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import API from '../services/api';

const ProtectedRoute = ({ children }) => {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    let mounted = true;

    const verifySession = async () => {
      try {
        await API.get('/auth/me');
        if (mounted) {
          setStatus('authenticated');
        }
      } catch (error) {
        if (mounted) {
          setStatus('unauthenticated');
        }
      }
    };

    verifySession();

    return () => {
      mounted = false;
    };
  }, []);

  if (status === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return status === 'authenticated' ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
