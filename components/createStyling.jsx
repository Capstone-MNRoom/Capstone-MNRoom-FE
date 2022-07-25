import React from 'react';
import Image from 'next/image';
import Room from '../assets/room.png';

const CreateStyling = (props) => {

    return (
        <div className="style absolute inset-1 m-auto min-w-full max-w-full min-h-full max-h-full mr-12 mb-32">
        <img className="" src={Room}/>
      </div>
    )
  
}

export default CreateStyling;
