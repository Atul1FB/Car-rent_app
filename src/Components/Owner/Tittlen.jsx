import React from 'react';

const Tittlen = ({title,subTitle}) => {
  return (
    <>
    <h1 className='font-medium text-3xl'>{title}</h1>
    <p className='text-sm md:text-base text-gray-500/90 mt_2
    max-w-156'>{subTitle}</p>
      
    </>
  );
}

export default Tittlen;
