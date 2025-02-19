import React, { useState, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const Profile = () => {
    const { user } = useContext(AuthContext); // Get user info from context

    // States for user profile details
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // Handle profile update
    const handleUpdate = (e) => {
        e.preventDefault();
        setIsEditing(false);

        // SweetAlert Success Message
        Swal.fire({
            title: 'Success!',
            text: 'Profile Updated Successfully!',
            icon: 'success',
            confirmButtonColor: '#28a745',
        });
    };

    return (
        <div className="container mx-auto mt-5 p-6 bg-green-100 shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-black text-center mb-6">Profile Page</h2>

            {/* User Profile Section */}
            <div className="flex flex-col items-center">
                {/* Profile Image */}
                <img
                    src={user?.photoURL || 'https://via.placeholder.com/150'}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-green-500 shadow-md"
                />

                {/* User Details */}
                <div className="mt-4 text-center">
                    <h3 className="text-xl font-semibold text-gray-800">{user?.displayName || 'User Name'}</h3>
                    <p className="text-gray-600">{user?.email || 'Email not available'}</p>
                </div>
            </div>

            {/* Editable Profile Form */}
            <form className="mt-6 space-y-4 flex flex-col items-center" onSubmit={handleUpdate}>
                <div className="w-3/4 md:w-1/2">
                    <label className="block text-lg font-medium text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')} // Remove non-numeric characters
                        className="w-full bg-white text-black border border-green-500 p-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                        required
                        disabled={!isEditing}
                    />
                </div>

                <div className="w-3/4 md:w-1/2">
                    <label className="block text-lg font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-white text-black border border-green-500 p-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                        required
                        disabled={!isEditing}
                    />
                </div>

                {/* Update Button */}
                {isEditing ? (
                    <button
                        type="submit"
                        className="w-3/4 md:w-1/2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        Save Changes
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="w-3/4 md:w-1/2 bg-green-500 text-black py-2 rounded-lg hover:bg-green-100 transition duration-300"
                    >
                        Edit Profile
                    </button>
                )}
            </form>
        </div>
    );
};

export default Profile;
