import getCurrentUser from '../actions/getCurrentUser';
import { getReservations } from '../actions/getReservations';
import { EmptyState } from '../components/EmptyState';

import React from 'react';
import { TripsComponent } from '../components/trips/TripsComponent';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ userId: currentUser?.id });

  if (!currentUser || reservations.length === 0) {
    return !currentUser ? (
      <EmptyState title='Unauthorized' subtitle='Please, login' />
    ) : (
      <EmptyState
        title='No found trips'
        subtitle="Looks like you haven't reserved any trips"
      />
    );
  }

  return (
    <TripsComponent currentUser={currentUser} reservations={reservations} />
  );
};

export default TripsPage;
