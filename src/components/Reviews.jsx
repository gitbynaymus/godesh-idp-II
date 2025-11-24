import React from 'react';
import { Star } from 'lucide-react';
import Heading from './shared/Heading';
import SubHeading from './shared/SubHeading';

const Reviews = () => {
  const reviews = [
    {
      name: "Jannatul Ferdous",
      review:
        "I had an amazing time on my trip to Cox's Bazar. The tour guide was very knowledgeable and friendly.",
      image:
        "https://worldfellows.yale.edu/wp-content/uploads/2024/11/Rayhan-Asat-686x686.jpg",
      rating: 5,
    },
    {
      name: "Razu Ahmmed",
      review:
        "The Sundarbans is a beautiful place. I would recommend this tour to anyone who loves nature.",
      image: "https://pbs.twimg.com/media/DWDpnXOU8AAJaEm.jpg",
      rating: 4,
    },
    {
      name: "Imran Hossain",
      review:
        "Sajek Valley is a must-see destination. The views are breathtaking.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShMb_cLUGqAoG6wCkumLDHS4CE4-7ELUjZNg&s",
      rating: 5,
    },
  ];

  return (
    <div className="">
      <div className="mx-auto w-11/12 max-w-[1440px]">
        <Heading>What Our Customers Say</Heading>
        <SubHeading>Real experiences from our travelers</SubHeading>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="transform rounded-lg bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 lg:p-6"
            >
              <div className="mb-4 flex items-center">
                <img
                  src={review.image}
                  alt={review.name}
                  className="mr-4 h-16 w-16 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold">{review.name}</h3>
                  <div className="flex items-center">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-current text-yellow-500"
                      />
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-current text-gray-300"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
