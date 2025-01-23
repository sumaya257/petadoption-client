import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center p-6 bg-white shadow-xl rounded-lg">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Not Found</h1>
                <p className="text-gray-600 mb-6">
                    Sorry, the page you are looking for does not exist.
                </p>
                <button
                    onClick={handleGoHome}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
