'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import LogoImage from '../../public/images/logo.png';

export const Logo = () => {
  const router = useRouter();
  return (
    <Image
      src={LogoImage}
      alt='logo'
      className='hidden cursor-pointer md:block'
      width={100}
      height={100}
    />
  );
};
