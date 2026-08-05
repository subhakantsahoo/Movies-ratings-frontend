import React, { useContext } from 'react';
import authContext from './authContext';

const MyComponent = () => {
  const { user } = useContext(authContext);

  // Access the user value
  console.log(user);

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};

export default MyComponent;
