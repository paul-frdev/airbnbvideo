'use client';
import Image from 'next/image';
import React from 'react';
import AvatarImage from '../../public/images/avatar.jpeg';

interface AvatarProps {
  scr: string | null | undefined;
}
export const Avatar = ({ scr }: AvatarProps) => {
  return (
    <Image
      src={scr || AvatarImage}
      className='rounded-full'
      height={30}
      width={30}
      alt='Avatar'
    />
  );
};
