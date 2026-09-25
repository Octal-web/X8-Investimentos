import React, { useRef } from 'react';

import { HeroBanner } from '@/Components/Sections/HeroBanner';

import DefaultLayout from '@/Layouts/DefaultLayout';
import { GrowthChart, StartingPoint, Disciplines, Method, Plans, Implementation, Brands, Testimonials, NextStep, Contact, Doubts } from '@/Components/Sections/Home';
import { useHomeAnimations } from '@/hooks/useHomeAnimations';

const Page = () => {
    const root = useRef(null);
    useHomeAnimations(root);
    return (
        <DefaultLayout>
            <div className="home-page" ref={root}>
                <HeroBanner />
                <GrowthChart />
                <StartingPoint />
                <Disciplines />
                <Method />
                <Plans />
                <Implementation />
                <Brands />
                <Testimonials />
                <NextStep />
                <Contact />
                <Doubts />
            </div>
        </DefaultLayout>
    );
};

export default Page;
