import { useQuery } from '@tanstack/react-query';
import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import { Toaster } from 'react-hot-toast';
import ProtectedRoutes from './components/auth/protectedRoutes';
import AdminRoute from './components/auth/AdminRoute';
import Admin from './pages/dashboard/Admin';
import { Toast } from '@base-ui/react';

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        {/* TODOS - protected */}
        <Route path='/dashboard' element={<ProtectedRoutes><DashboardPage /> </ProtectedRoutes> } />
        <Route path='/admin' element={<AdminRoute><Admin/></AdminRoute>} />




        <Route path='/' element={<Navigate to="/login" replace />} />
      </Routes>
      {/* <Toaster
        position="bottom-right"
        reverseOrder={false} /> */}
    </>
  )
}

export default App
