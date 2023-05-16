'use client';
import { categories } from '@/app/constants';
import { SafeListing, SafeUser } from '@/app/types';
import { Reservation } from '@prisma/client';
import React, { useMemo } from 'react';
import { ListingHead } from './ListingHead';
import { ListingInfo } from './ListingInfo';

interface ListingItemProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser: SafeUser | null;
  reservation?: Reservation[];
}
export const ListingItem: React.FC<ListingItemProps> = ({
  listing,
  currentUser,
  reservation,
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <div className='mx-auto max-w-screen-lg'>
      <div className='flex flex-col gap-6'>
        <ListingHead
          title={listing.title}
          imageSrc={listing.imageScr}
          id={listing.id}
          locationValue={listing.locationValue}
          currentUser={currentUser}
        />
        <div className='mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-7'>
          <ListingInfo
            user={listing.user}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathroomCount={listing.bathroomCount}
            locationValue={listing.locationValue}
          />
        </div>
      </div>
    </div>
  );
};
