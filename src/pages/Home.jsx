import React from 'react';
import Banner from '../components/Banner';
import PetsCategory from '../components/PetsCategory';
import CallToAction from '../components/CallToAction';
import AboutUs from '../components/AboutUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PetsCategory></PetsCategory>
            <CallToAction></CallToAction>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;