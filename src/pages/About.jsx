import React from 'react';
import { Faqs } from '../components/Faqs';

const About = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 md:ml-8">
          <h1 className="text-4xl font-bold mb-4">About SK Real Estate</h1>
          <p className="text-gray-700 mb-4">
            SK Real Estate is a trusted name in the real estate industry, committed to providing
            exceptional services to our clients. With years of experience, we have successfully
            helped individuals and families find their dream homes.
          </p>
          <p className="text-gray-700 mb-4">
            Our mission is to exceed customer expectations by delivering top-notch real estate
            solutions. Whether you're buying, selling, or investing in properties, SK Real Estate
            is your reliable partner throughout the journey.
          </p>
          <p className="text-gray-700 mb-4">
            Key Features:
            <ul className="list-disc pl-6">
              <li>Expert real estate agents with in-depth market knowledge.</li>
              <li>Wide range of residential and commercial property listings.</li>
              <li>Personalized guidance for buyers, sellers, and investors.</li>
              <li>Transparent and honest communication throughout the process.</li>
              <li>Committed to making your real estate experience smooth and successful.</li>
            </ul>
          </p>
        </div>

      </div>
      <Faqs />
    </div>
  );
};

export default About;
