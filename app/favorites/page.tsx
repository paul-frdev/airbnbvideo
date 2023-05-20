import getCurrentUser from '../actions/getCurrentUser';
import { getFavoritesListings } from '../actions/getFavoritesListings';
import { EmptyState } from '../components/EmptyState';
import { FavoritesComponent } from '../components/favorites/FavoritesComponent';

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const safeFavorites = await getFavoritesListings();

  if (safeFavorites?.length === 0) {
    return (
      <EmptyState
        title='No favorites found'
        subtitle='Looks like you have no favorite listings'
      />
    );
  }
  return (
    <FavoritesComponent favorites={safeFavorites} currentUser={currentUser} />
  );
};

export default FavoritesPage;
