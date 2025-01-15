import { createBrowserRouter } from "react-router";
import MainLayout from "../main/MainLayout";
import Home from "../pages/Home";
import PetListing from "../pages/PetListing";
import DonationCampaigns from "../pages/DonationCampaigns";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";




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
    }
  ]);