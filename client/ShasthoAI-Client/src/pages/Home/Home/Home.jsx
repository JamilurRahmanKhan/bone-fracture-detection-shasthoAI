import React from 'react';
import Banner from '../Banner/Banner';
import FeaturesSection from '../FeaturesSection/FeaturesSection';
import HowItWorks from '../HowItWorks/HowItWorks';
import SecuritySection from '../SecuritySection/SecuritySection';
import TestimonialsSection from '../TestimonialsSection/TestimonialsSection';
import CTASection from '../CTASection/CTASection';

const Home = () => {
    return (
        <div>
            <Banner />
            <FeaturesSection />
            <HowItWorks />
            <SecuritySection />
            <TestimonialsSection />
            <CTASection />
        </div>
    );
};

export default Home;