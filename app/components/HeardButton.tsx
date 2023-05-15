'use client';
import React from 'react';
import { SafeUser } from '../types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useFavorites from '../hooks/useFavorites';

interface HeardButtonProps {
  listingId: string;
  currentUser: SafeUser | null;
}
export const HeardButton: React.FC<HeardButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorites({
    listingId,
    currentUser,
  });
  console.log('currentUser', currentUser);

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
