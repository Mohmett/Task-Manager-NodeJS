import useAuthStore from '@/lib/store/authStore';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';

const AdminRoute = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { token, student, setAuth, clearAuth, isAuthenticated } = useAuthStore();

    if (!token || !isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    if (student.role != 'admin') {
        return <div className='flex flex-col justify-center items-center text-center h-screen'><h5 className='text-2xl font-bold'>Mr. <span>{student?.name}</span></h5>
                <p>You're not an Admin</p>
            </div>
        // return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children;
}

export default AdminRoute