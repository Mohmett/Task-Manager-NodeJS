import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import AdminRoute from './components/auth/AdminRoute';
import ProtectedRoutes from './components/auth/ProtectedRoutes';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Admin from './pages/dashboard/Admin';
import DashboardPage from './pages/dashboard/DashboardPage';

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
    </>
  )
}

export default App
