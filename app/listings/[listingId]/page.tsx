import getCurrentUser from '@/app/actions/getCurrentUser';
import { getListingById } from '@/app/actions/getListingById';
import { Container } from '@/app/components/Container';
import { EmptyState } from '@/app/components/EmptyState';
import { ListingItem } from '@/app/components/listings/ListingItem';
import { IParams } from '@/app/types';

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <Container>
        <EmptyState />
      </Container>
    );
  }
  return (
    <Container>
      <ListingItem listing={listing} currentUser={currentUser} />
    </Container>
  );
};

export default ListingPage;
