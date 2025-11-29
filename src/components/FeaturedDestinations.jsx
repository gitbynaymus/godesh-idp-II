import React from "react";
import Heading from "./shared/Heading";
import SubHeading from "./shared/SubHeading";

const FeaturedDestinations = () => {
  const destinations = [
    {
      name: "Cox's Bazar",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/e2/f8/43/longest-sea-beach-in.jpg?w=1100&h=1100&s=1",
    },
    {
      name: "Sundarbans",
      image:
        "https://www.ri.org//content/uploads/2019/08/bangladesh-story-1608192-iv.jpg",
    },
    {
      name: "Sajek Valley",
      image:
        "https://whatson.guide/wp-content/uploads/2018/02/171782_185994668099908_100000681295465_502955_3502055_o.jpg",
    },
    {
      name: "Kuakata Beach",
      image:
        "https://t4.ftcdn.net/jpg/05/00/53/83/360_F_500538377_ncVaP1DeFYxL6IedTi8MNr1B5JRQTLnD.jpg",
    },
  ];

  return (
    <div className="mx-auto w-11/12 max-w-[1440px]">
      <Heading>Featured Destinations</Heading>
      <SubHeading>
        Explore the beauty of Bangladesh
      </SubHeading>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {destinations.map((destination, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg bg-white shadow-lg"
          >
            <img
              src={destination.image}
              alt={destination.name}
              className="h-64 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="mb-2 text-xl font-bold">{destination.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDestinations;
