import { createBrowserRouter } from "react-router";
import MainLayout from "../main/MainLayout";
import Home from "../pages/Home";
import PetListing from "../pages/PetListing";
import DonationCampaigns from "../pages/DonationCampaigns";




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
                path:'/donation-campaigns',
                element:<DonationCampaigns></DonationCampaigns>
            }
        ]
    }
  ]);