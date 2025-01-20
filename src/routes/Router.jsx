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
import PetDetails from "../pages/PetDetails";
import UpdateDonation from "../pages/dashboard/UpdateDonation";
import DonationDetails from "../pages/DonationDetails";





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
                element:<PetListing></PetListing>
            },
            {
              path:'/pet-listing/:id',
              element:<PetDetails></PetDetails>,
              loader: ({params})=> fetch(`http://localhost:5000/pet-listing/${params.id}`)
            },
            {
              path:'/donation-details/:id',
              element:<DonationDetails></DonationDetails>,
              loader: ({params})=> fetch(`http://localhost:5000/donation-details/${params.id}`)
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
            element: <MyDonationCampaigns></MyDonationCampaigns>,
          },
          {
            path: 'my-donations',
            element: <MyDonations></MyDonations>
          },
          {
            path: 'update-pet/:id',
            element: <UpdatePet></UpdatePet>,
            loader: ({params})=> fetch(`http://localhost:5000/pets/${params.id}`)
          },
          {
            path: 'update-donation/:id',
            element: <UpdateDonation></UpdateDonation>,
            loader: ({params})=> fetch(`http://localhost:5000/donations/${params.id}`)
          },

        ]

    }
  ]);