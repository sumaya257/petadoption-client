import React from 'react';
import Banner from '../components/Banner';
import PetsCategory from '../components/PetsCategory';
import CallToAction from '../components/CallToAction';
import AboutUs from '../components/AboutUs';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PetsCategory></PetsCategory>
            <CallToAction></CallToAction>
            <AboutUs></AboutUs>
            <Testimonials></Testimonials>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;