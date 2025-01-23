import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { AuthContext } from '../../providers/AuthProvider';
import { Helmet } from 'react-helmet';

const AdoptionRequest = () => {
    const axiosPrivate = useAxiosPrivate();
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();

    // Fetch adoption requests for the logged-in user
    const { data: adoptionRequests = [], isLoading, error } = useQuery({
        queryKey: ['adoptionRequests', user?.email],
        queryFn: async () => {
            const response = await axiosPrivate.get(`/adopt-pet?email=${user.email}`);
            return response.data;
        },
    });

    // Mutation for accepting the request
    const acceptMutation = useMutation({
        mutationFn: async (requestId) => {
            const response = await axiosPrivate.patch(`/adopt-pet/${requestId}`, { action: 'accept' });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['adoptionRequests', user?.email]); // Refetch adoption requests after success
            Swal.fire('Success!', 'Request accepted!', 'success');
        },
        onError: (error) => {
            console.error('Error accepting request:', error);
            Swal.fire('Error!', 'Failed to accept the request.', 'error');
        },
    });

    // Mutation for rejecting the request
    const rejectMutation = useMutation({
        mutationFn: async (requestId) => {
            const response = await axiosPrivate.patch(`/adopt-pet/${requestId}`, { action: 'reject' });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['adoptionRequests', user?.email]); // Refetch adoption requests after success
            Swal.fire('Success!', 'Request rejected!', 'success');
        },
        onError: (error) => {
            console.error('Error rejecting request:', error);
            Swal.fire('Error!', 'Failed to reject the request.', 'error');
        },
    });

    if (isLoading) return <p>Loading adoption requests...</p>;
    if (error) return <p>Error loading adoption requests!</p>;

    return (
        <div className="p-6">
            <Helmet><title>Adoption-Request</title></Helmet>
            <h2 className="text-xl font-bold mb-4">Adoption Requests</h2>
            {adoptionRequests.length > 0 ? (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className='dark:text-black'>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Name</th>
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
                                    {request.status === 'accepted' ? (
                                        <button className="bg-green-600 text-white px-3 py-1 rounded" disabled>
                                            Accepted
                                        </button>
                                    ) : request.status === 'rejected' ? (
                                        <button className="bg-red-600 text-white px-3 py-1 rounded" disabled>
                                            Rejected
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                                onClick={() => acceptMutation.mutate(request._id)}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                                onClick={() => rejectMutation.mutate(request._id)}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
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
