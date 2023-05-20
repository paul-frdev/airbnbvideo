'use client'
import { SafeListing, SafeUser } from '@/app/types';
import React, { FC } from 'react';
import { Container } from '../Container';
import { Heading } from '../Heading';
import { ListingCard } from '../listings/ListingCard';

interface FavoritesComponentProps {
  favorites: SafeListing[] | null;
  currentUser?: SafeUser | null;
}
export const FavoritesComponent: FC<FavoritesComponentProps> = ({
  favorites,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title='Favorites' subtitle='List of places you have liked!' />
      <div className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {favorites?.map((favorite: SafeListing) => (
          <ListingCard
            key={favorite.id}
            currentUser={currentUser}
            data={favorite}
          />
        ))}
      </div>
    </Container>
  );
};
