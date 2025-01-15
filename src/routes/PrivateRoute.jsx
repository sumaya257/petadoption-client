import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate } from 'react-router';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Skeleton height={100} width={300} count={3} />; // Skeleton loading state, you can customize the size and count
    }

    if (user) {
        return children;
    }
    
    return <Navigate to="/login" />;
};

export default PrivateRoute;
