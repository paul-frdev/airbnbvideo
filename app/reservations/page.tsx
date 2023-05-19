import React from 'react';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { getReservations } from '@/app/actions/getReservations';
import { EmptyState } from '../components/EmptyState';
import { ReservationsComponent } from '../components/reservations/ReservationsComponent';

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ authorId: currentUser?.id });

  if (!currentUser || reservations.length === 0) {
    return !currentUser ? (
      <EmptyState title='Unauthorized' subtitle='Please, login' />
    ) : (
      <EmptyState
        title='No reservations found'
        subtitle='Looks like you have no reservations on your property'
      />
    );
  }
  return (
    <ReservationsComponent
      currentUser={currentUser}
      reservations={reservations}
    />
  );
};

export default ReservationsPage;
