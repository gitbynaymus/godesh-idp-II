import React from 'react';
import { Briefcase, Languages, Compass } from 'lucide-react';
import Heading from './shared/Heading';
import SubHeading from './shared/SubHeading';

const TravelTips = () => {
  const tips = [
    {
      icon: <Briefcase size={40} className="mb-4 text-accent" />,
      title: 'Pack Light',
      description: 'Packing light is always a good idea. It will save you money on baggage fees and make it easier to get around.',
    },
    {
      icon: <Languages size={40} className="mb-4 text-accent" />,
      title: 'Learn a Few Local Phrases',
      description: 'Learning a few local phrases will go a long way in making friends and getting help when you need it.',
    },
    {
      icon: <Compass size={40} className="mb-4 text-accent" />,
      title: 'Be Flexible',
      description: 'Things don\'t always go as planned when you\'re traveling. Be flexible and go with the flow.',
    },
  ];

  return (
    <div className="bg-gray-50 py-10 md:py-15">
      <div className="mx-auto w-11/12 max-w-[1440px]">
        <Heading>Travel Tips</Heading>
        <SubHeading>Your guide to a seamless journey</SubHeading>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="transform rounded-lg bg-white p-8 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <div className="mb-4 flex items-center justify-center">
                {tip.icon}
              </div>
              <h3 className="mb-2 text-center text-xl font-bold">
                {tip.title}
              </h3>
              <p className="text-center text-gray-700">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelTips;
