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
import User from "../pages/dashboard/AdminOnly/User";
import AllPets from "../pages/dashboard/AdminOnly/AllPets";
import AllDonations from "../pages/dashboard/AdminOnly/AllDonations";
import ErrorPage from "../pages/ErrorPage";
import Blog from "../components/Blog";
import Profile from "../pages/dashboard/Profile";
import DashboardOverview from "../pages/dashboard/DashBoardOverView";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
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
              loader: ({params})=> fetch(`https://petadoption-server-roan.vercel.app/pet-listing/${params.id}`)
            },
            {
              path:'/donation-details/:id',
              element:<DonationDetails></DonationDetails>,
              loader: ({params})=> fetch(`https://petadoption-server-roan.vercel.app/donation-details/${params.id}`)
            },
            {
                path:'/donation-campaigns',
                element:<DonationCampaigns></DonationCampaigns>
            },
            {
              path:'/blogs',
              element:<Blog></Blog>
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
            index: true,
            element: <DashboardOverview></DashboardOverview>
          },

          {
            path: 'profile',
            element: <Profile></Profile>
          },

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
            element:<MyDonations></MyDonations>,
          },
          //admin only
          {
            path: 'all-users',
            element: <User></User>
          },
          {
            path: 'all-pets',
            element: <AllPets></AllPets>
          },
          {
            path: 'all-donations',
            element: <AllDonations></AllDonations>
          },
          {
            path: 'update-pet/:id',
            element: <UpdatePet></UpdatePet>,
            loader: ({params})=> fetch(`https://petadoption-server-roan.vercel.app/pets/${params.id}`)
          },
          {
            path: 'update-donation/:id',
            element: <UpdateDonation></UpdateDonation>,
            loader: ({params})=> fetch(`https://petadoption-server-roan.vercel.app/donations/${params.id}`)
          },

        ]

    }
  ]);