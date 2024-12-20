import getListingByid from '@/app/actions/getListingByid';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import ListingClient from './ListingClient';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';

interface IParams {
  listingId?: string;
}

const ListingPage = async ({
  params,
}: {
  params: IParams;
}) => {
  const listing = await getListingByid(params);
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
