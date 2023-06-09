import { Listing, Reservation, User } from '@prisma/client';

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeListing = Omit<Listing, 'createdAt'> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  'createdAt' | 'endDate' | 'startDate' | 'listing'
> & {
  createdAt: string;
  endDate: string;
  startDate: string;
  listing: SafeListing;
};

export interface IParams {
  listingId?: string;
}

export interface IListingsParams {
  userId?: string;
  roomsCount?: number;
  guestsCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}
