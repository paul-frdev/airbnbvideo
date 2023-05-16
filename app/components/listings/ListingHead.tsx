'use client';
import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import React from 'react';
import { Heading } from '../Heading';
import Image from 'next/image';
import { HeardButton } from '../HeardButton';

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}
export const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region} ${location?.label}`}
      />
      <div className='relative h-[60vh] w-full overflow-hidden rounded-xl'>
        <Image
          alt='photo'
          src={imageSrc}
          fill
          className='w-full object-cover'
        />
        <div className='absolute right-5 top-5'>
          <HeardButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};
