import React from 'react';

const Loader = () => {
  return (
    <div className='flex justify-center itmes-center h-[80vh]'>
      <div className='animate-spin rounded-full h-14 w-14 border-4 border-yellow-300
      border-t-primary'></div>
    </div>
  );
}

export default Loader;
