import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { AuthContext } from '../../providers/AuthProvider';

const AdoptionRequest = () => {
    const axiosPrivate = useAxiosPrivate();
    const { user } = useContext(AuthContext);

    // Fetch adoption requests for the logged-in user
    const { data: adoptionRequests = [], isLoading, refetch } = useQuery({
        queryKey: ["adoptionRequests", user?.email],
        queryFn: async () => {
            const response = await axiosPrivate.get(`/adopt-pet?email=${user.email}`);
            return response.data; // Ensure your API returns adoption request details
        },
    });

    // Handle accept request
    const handleAccept = async (requestId) => {
        try {
            await axiosPrivate.patch(`/adopt-pet/${requestId}/accept`);
            refetch();
            alert("Request accepted!");
        } catch (error) {
            console.error("Error accepting request:", error);
        }
    };

    // Handle reject request
    const handleReject = async (requestId) => {
        try {
            await axiosPrivate.patch(`/adopt-pet/${requestId}/reject`);
            refetch();
            alert("Request rejected!");
        } catch (error) {
            console.error("Error rejecting request:", error);
        }
    };

    if (isLoading) return <p>Loading adoption requests...</p>;

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Adoption Requests</h2>
            {adoptionRequests.length > 0 ? (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Pet Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Phone</th>
                            <th className="border border-gray-300 px-4 py-2">Location</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adoptionRequests.map((request) => (
                            <tr key={request._id}>
                                <td className="border border-gray-300 px-4 py-2">{request.petName}</td>
                                <td className="border border-gray-300 px-4 py-2">{request.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{request.phone}</td>
                                <td className="border border-gray-300 px-4 py-2">{request.address}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                        onClick={() => handleAccept(request._id)}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleReject(request._id)}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No adoption requests found.</p>
            )}
        </div>
    );
};

export default AdoptionRequest;
