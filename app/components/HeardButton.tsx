'use client';
import { Listing } from '@prisma/client';
import React from 'react';
import { SafeUser } from '../types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface HeardButtonProps {
  dataId: string;
  currentUser: SafeUser | null | undefined;
}
export const HeardButton: React.FC<HeardButtonProps> = ({
  dataId,
  currentUser,
}) => {
  const hasFavorited = false;
  const toggleFavorite = () => {};
  return (
    <div
      onClick={toggleFavorite}
      className='relative cursor-pointer transition hover:opacity-80'
    >
      <AiOutlineHeart size={28} className='fill-white' />
      <AiFillHeart
        size={24}
        className={` absolute right-[2px] top-[2px] ${
          hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'
        }`}
      />
    </div>
  );
};
