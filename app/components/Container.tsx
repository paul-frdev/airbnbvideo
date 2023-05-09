'use client';
import React from 'react';

interface Props {
  children: React.ReactNode;
}
export const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className='max-auto max-w-[2120px] px-4 sm:px-2 md:px-10 xl:px-20'>
      {children}
    </div>
  );
};
