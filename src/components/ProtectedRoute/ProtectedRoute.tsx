import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function ProtectedRoute() {
    const { token, loading } = useAuth();

    if (loading) {
        return <div>Loading authentication...</div>;
    }

    if (!import.meta.env.DEV && !token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
