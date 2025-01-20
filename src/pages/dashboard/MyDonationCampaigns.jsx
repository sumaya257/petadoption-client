import React, { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyDonationCampaigns = () => {
    const [donators, setDonators] = useState([]);
    const [totalDonation, setTotalDonation] = useState();
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const { user } = useContext(AuthContext);

    const queryClient = useQueryClient();

    // Fetch campaigns for the logged-in user
    const { data: campaigns = [], isLoading } = useQuery({
        queryKey: ["myDonations", user?.email],
        queryFn: async () => {
            const response = await axiosPrivate.get(
                `/donations/my-campaigns?email=${user.email}`
            );
            console.log(response.data)
            return response.data;
        },
    });

    // Mutation for toggling pause/unpause
    const pauseMutation = useMutation({
        mutationFn: async (id) => {
            const response = await axiosPrivate.put(`/dashboard/update-donation/${id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["myDonations", user?.email]);
        },
    });

    // Fetch donators for a specific campaign
    const fetchDonators = async (campaignId) => {
        try {
            const response = await axiosPrivate.get(`/donations/${campaignId}/donators`);
            const totalDonation = response.data.totalDonation
            setDonators(response.data.donators|| []);
            setTotalDonation(response.data.totalDonation || 0);
            setSelectedCampaign(campaignId);
            setModalOpen(true);
            console.log (donators)
        }catch (error) {
            console.error("Error fetching donators:", error);
            Swal.fire({
                icon: "error",
                title: "Failed to fetch donators",
                text: "Please try again later.",
            });
        }
    };

    if (isLoading) return <p>Loading campaigns...</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">My Donation Campaigns</h2>

            <table className="table-auto w-full  border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-2">Campaign Name</th>
                        <th className="px-4 py-2">Max Donation</th>
                        <th className="px-4 py-2">Donation Progress</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map((campaign) => (
                        <tr key={campaign._id} className="border-t border-gray-200">
                            <td className="px-4 py-2">{campaign.name}</td>
                            <td className="px-4 py-2">${campaign.maxDonation}</td>
                            <td className="px-4 py-2">
                                <div className="relative w-full h-4 bg-gray-200 rounded">
                                    <div
                                        className="h-4 bg-green-500 rounded"
                                        style={{
                                            width: `${Math.min(
                                                (campaign.totalDonation / campaign.maxDonation) * 100,
                                                100
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                                <span className="text-sm">
                                    ${campaign.totalDonation} / ${campaign.maxDonation}
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                {/* Pause/Unpause button */}
                                <button
                                    onClick={() => pauseMutation.mutate(campaign._id)}
                                    className={`px-3 py-1 rounded ${campaign.paused ? "bg-yellow-500" : "bg-red-500"
                                        } text-white mr-2`}
                                >
                                    {campaign.paused ? "Unpause" : "Pause"}
                                </button>

                                {/* Edit button */}
                                <Link to={`/dashboard/update-donation/${campaign._id}`}>
                                <button className="px-3 py-1 bg-blue-500 text-white rounded mr-2">
                                    Edit
                                </button>
                                </Link>

                                {/* View Donators button */}
                                <button
                                    onClick={() => fetchDonators(campaign.campaignId)}
                                    className="px-3 py-1 bg-green-500 text-white rounded"
                                >
                                    View Donators
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for viewing donators */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h3 className="text-lg font-bold mb-4">Donators for the Campaign, Total: ${totalDonation}</h3>
                        <ul className="list-disc pl-5">
                            {donators.length > 0 ? (
                                donators.map((donator, index) => (
                                    <li key={index}>
                                        {donator.name} donated ${donator.amount}
                                    </li>
                                ))
                            ) : (
                                <p>No donations conducted.</p>
                            )}
                        </ul>
                        <button
                            onClick={() => setModalOpen(false)}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyDonationCampaigns;