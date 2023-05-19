'use client';
import { categories } from '@/app/constants';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ListingHead } from './ListingHead';
import { ListingInfo } from './ListingInfo';
import useLoginModal from '@/app/hooks/useLogInModal';
import { useRouter } from 'next/navigation';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ListingReservation } from './ListingReservation';
import { Range } from 'react-date-range';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};
interface ListingItemProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser: SafeUser | null;
  reservations?: SafeReservation[];
}
export const ListingItem: React.FC<ListingItemProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then(() => {
        toast.success('listing reserved!');
        setDateRange(initialDateRange);
        // Redirect to /trips

        router.refresh();
        router.push('/trips');
      })
      .catch((error: any) => {
        console.log('error', error);
        toast.error('something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

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
          <div className='order-first mb-10 md:order-last md:col-span-3'>
            <ListingReservation
              price={listing.price}
              totalPrice={totalPrice}
              onChangeDate={(value) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onCreateReservation}
              disabled={isLoading}
              disabledDates={disabledDates}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
