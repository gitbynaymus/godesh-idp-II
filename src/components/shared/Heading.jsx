import React from 'react';

const Heading = ({children}) => {
    return (
      <h2 className="mb-2 text-center text-2xl font-bold lg:text-3xl">
        {children}
      </h2>
    );
};

export default Heading;