'use client';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import React, { FC, useCallback, useState } from 'react';
import { Container } from '../Container';
import { Heading } from '../Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ListingCard } from '../listings/ListingCard';

interface PropertiesComponentProps {
  currentUser?: SafeUser | null;
  listings: SafeListing[];
}
export const PropertiesComponent: FC<PropertiesComponentProps> = ({
  currentUser,
  listings,
}) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('listing deleted');
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
        title='Properties'
        subtitle='List of your properties'
        center
      />
      <div className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {listings.map((listing: SafeListing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel='Delete property'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
