'use client';
import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import React, { FC } from 'react';
import { IconType } from 'react-icons';
import { Avatar } from '../Avatar';
import { ListingCategory } from './ListingCategory';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../Map'), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser;
  category:
    | {
        icon: IconType | undefined;
        label: string;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}
export const ListingInfo: FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2 text-xl font-semibold'>
          <div>Hosted by {user?.name}</div>
          <Avatar scr={user?.image} />
        </div>
        <div className='flex items-center gap-4 font-light text-neutral-500'>
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon as IconType}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <p className='text-lg font-light text-neutral-500'>{description}</p>
      <hr />
      <Map center={coordinates as number[]} />
    </div>
  );
};
