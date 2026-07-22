import api from '@/lib/api/apiClient';
import useAuthStore from '@/lib/store/authStore';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import React, { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router';

const ProtectedRoutes = ({ children }) => {


    const navigate = useNavigate();
    const location = useLocation();
    const { token, student, setAuth, clearAuth, isAuthenticated } = useAuthStore();

    // ⬇️WHY USING USEQUERY from Tanstack: Cause this is fetching Data. Whenever you wanna fetch data from database or Local Storage you have to use USEQUERY from tanstack. Rather than Creating, deleting, updating use USEMUTATION from Tanstack.

    // UseQuery have built in useStates like ( data, isLoading, isError, error, isSuccess) instead declaring anything from scratch.
    const { data, isError, error, isSuccess, isLoading} = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const response = await api.get('/auth/profile');
            return response.data;
            
        },
        retry: 2,
    })
    // Error Case
    useEffect(() => {
        if (isError) {
            clearAuth();
        }
    }, [isError, error, clearAuth]);

    // Success Case
    useEffect(() => {
        if (isSuccess && data) {
        setAuth(data, token);
     }
    }, [isSuccess, data, setAuth, token]);

    if(isLoading){
        return (
            <div className='flex justify-center items-center h-screen'>
                <Loader className='animate-spin font-medium text-2xl text-orange-500' size={25} />
            </div>
        )
    }

    if(!student || !token || !isAuthenticated || isError){
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children;
}

export default ProtectedRoutes