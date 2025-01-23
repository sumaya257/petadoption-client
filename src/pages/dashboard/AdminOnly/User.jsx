import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';


const User = () => {
    const axiosPrivate = useAxiosPrivate();

    // Fetch users data using react-query
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPrivate.get('/users'); // Get all users
            return res.data; 
        }
    });

    const handleMakeAdmin = user =>{
        axiosPrivate.patch(`/users/admin/${user._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">User List ({users.length})</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 dark:text-black">
                            <th className="border border-gray-300 px-4 py-2">Profile Picture</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Role</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="text-center">
                                <td className="border border-gray-300 px-4 py-2">
                                    <img
                                        src={user.photo || 'https://via.placeholder.com/50'}
                                        alt={user.name}
                                        className="w-10 h-10 rounded-full mx-auto"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-300 px-4 py-2 capitalize">
                                    {user.role || 'user'}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {user.role !== 'admin' ? (
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            onClick={() => handleMakeAdmin(user)}
                                        >
                                            Make Admin
                                        </button>
                                    ) : (
                                        <span className="text-green-600 font-bold">Admin</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;
