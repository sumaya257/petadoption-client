import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation()

    if (loading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <Skeleton height={24} width={300} count={3} className="mb-4 rounded-md" />
          </div>
        );
      }
      

    if (user) {
        return children;
    }
    
    return <Navigate to="/login" state={{from:location}} replace />;
};

export default PrivateRoute;
