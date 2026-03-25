import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC = () => {
    const { token, loading } = useAuth();

    if (loading) {
        return <div className="loading-spinner">Loading authentication...</div>;
    }

    // if i put a random token in the localstorage i may pass this i think
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    console.log("PASSED")

    return <Outlet />;
};

export default ProtectedRoute;
