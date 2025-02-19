import React from 'react';
import Banner from '../components/Banner';
import PetsCategory from '../components/PetsCategory';
import CallToAction from '../components/CallToAction';
import AboutUs from '../components/AboutUs';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import { Helmet } from 'react-helmet';
import FeaturedPets from '../components/FeaturedPets';
import Contact from '../components/ContactUs';

const Home = () => {
    return (
        <div>
            <Helmet><title>Home</title></Helmet>
            <Banner></Banner>
            <PetsCategory></PetsCategory>
            <FeaturedPets></FeaturedPets>
            <CallToAction></CallToAction>
            <AboutUs></AboutUs>
            <Testimonials></Testimonials>
            <Contact></Contact>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;