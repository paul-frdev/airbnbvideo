'use client';
import React from 'react';

interface MenuItemProps {
  onClick: () => void;
  label: string;
}
export const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className='px-4 py-3 font-semibold transition transition duration-300 hover:bg-neutral-100'
    >
      {label}
    </div>
  );
};
