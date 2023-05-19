'use client';
import { SafeReservation, SafeUser } from '@/app/types';
import React, { FC, useCallback, useState } from 'react';
import { Container } from '../Container';
import { Heading } from '../Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ListingCard } from '../listings/ListingCard';

interface TripsComponentProps {
  currentUser?: SafeUser | null;
  reservations: SafeReservation[];
}
export const TripsComponent: FC<TripsComponentProps> = ({
  currentUser,
  reservations,
}) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled');
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title='Trips'
        subtitle='Where you have been and where you are going'
        center
      />
      <div className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {reservations.map((reservation: SafeReservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel='Cancel reservation'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
