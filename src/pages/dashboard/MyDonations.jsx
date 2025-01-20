import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const MyDonations = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useContext(AuthContext);
  console.log(user)
  // Fetch donations for the logged-in user
  const { data: donations = [], isLoading, refetch } = useQuery({
    queryKey: ["myDonations", user?.email],
    queryFn: async () => {
      const response = await axiosPrivate.get(
        `/payments/my-donations?email=${user.email}` );
        console.log(response.data)
        return response.data; // Ensure your API returns donation details
     
    },
  });

  // Refund donation
  const handleRefund = async (donationId) => {
    try {
      const response = await axiosPrivate.delete(
        `/payments/refund/${donationId}`
      );
      if (response.status === 200) {
        Swal.fire("Success!", "Your donation has been refunded.", "success");
        refetch(); // Refresh the data
      }
    } catch (error) {
      Swal.fire("Error!", "Unable to refund the donation. Try again later.", "error");
    }
  };

  if (isLoading) return <p>Loading donations...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Donations</h2>
      {donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Pet Image</th>
              <th className="px-4 py-2">Pet Name</th>
              <th className="px-4 py-2">Donated Amount</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id} className="border-t border-gray-200">
                <td className="px-4 py-2">
                  <img
                    src={donation.petImage}
                    alt={donation.petName}
                    className="h-16 w-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">{donation.petName}</td>
                <td className="px-4 py-2">${donation.donationAmount}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleRefund(donation._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Refund
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyDonations;
