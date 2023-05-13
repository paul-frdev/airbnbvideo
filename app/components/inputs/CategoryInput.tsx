'use client';
import React from 'react';
import { IconType } from 'react-icons';

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}
export const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
      flex cursor-pointer flex-col rounded-xl border-2 p-4 transition hover:border-black
      ${selected ? 'border-black' : 'border-x-neutral-200'}
      `}
    >
      <Icon size={30} />
      <div className='font-semibold'>{label}</div>
    </div>
  );
};
