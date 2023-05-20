import React from 'react';
import getCurrentUser from '../actions/getCurrentUser';
import { EmptyState } from '../components/EmptyState';

import { getListings } from '../actions/getListings';
import { PropertiesComponent } from '../components/properties/PropertiesComponent';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getListings({ userId: currentUser?.id });

  if (!currentUser || listings?.length === 0) {
    return !currentUser ? (
      <EmptyState title='Unauthorized' subtitle='Please, login' />
    ) : (
      <EmptyState
        title='No properties found'
        subtitle="Looks like you have no properties"
      />
    );
  }

  return (
    <PropertiesComponent currentUser={currentUser} listings={listings} />
  );
};

export default PropertiesPage;
