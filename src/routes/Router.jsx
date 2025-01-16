import { createBrowserRouter } from "react-router";
import MainLayout from "../main/MainLayout";
import Home from "../pages/Home";
import PetListing from "../pages/PetListing";
import DonationCampaigns from "../pages/DonationCampaigns";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";
import AddPet from "../pages/dashboard/AddPet";
import MyAddedPets from "../pages/dashboard/MyAddedPets";
import AdoptionRequest from "../pages/dashboard/AdoptionRequest";
import CreateDonationCampaign from "../pages/dashboard/CreateDonationCampaign";
import MyDonationCampaigns from "../pages/dashboard/MyDonationCampaigns";
import MyDonations from "../pages/dashboard/MyDonations";
import UpdatePet from "../pages/dashboard/UpdatePet";





export const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout></MainLayout>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/pet-listing',
                element:<PrivateRoute><PetListing></PetListing></PrivateRoute>
            },
            {
                path:'/donation-campaigns',
                element:<DonationCampaigns></DonationCampaigns>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            }
        ]
    },

    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
          {
            path: 'add-pet',
            element: <AddPet></AddPet>
          },

          {
            path: 'my-added-pets',
            element: <MyAddedPets></MyAddedPets>
          },
          {
            path: 'adoption-request',
            element: <AdoptionRequest></AdoptionRequest>
          },
          {
            path: 'create-donation-campaign',
            element: <CreateDonationCampaign></CreateDonationCampaign>
          },
          {
            path: 'my-donation-campaigns',
            element: <MyDonationCampaigns></MyDonationCampaigns>
          },
          {
            path: 'my-donations',
            element: <MyDonations></MyDonations>
          },
          {
            path: 'update-pet/:id',
            element: <UpdatePet></UpdatePet>,
            loader: ({params})=> fetch(`http://localhost:5000/pets/${params.id}`)
          }

        ]

    }
  ]);