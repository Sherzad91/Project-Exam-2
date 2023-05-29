import { useQuery } from '@tanstack/react-query';
import useIsVenueManager from '../hooks/useIsVenueManager';
import { getVenuesByProfile } from '../services/venues';
import { Fragment } from 'react';
import { Typography } from '@mui/material';
import VenuesListSkeleton from '../components/Venues/VenuesListSkeleton';
import VenuesList from '../components/Venues/VenuesList';

export default function MyVenuesPage() {
  const user = useIsVenueManager('/');
  const { data, isLoading } = useQuery(['venues', user?.venueManager], () => getVenuesByProfile(user?.name), {
    enabled: !!user,
  });

  return (
    <Fragment>
      <div className='container my-6'>
        <Typography variant='h4'>{user?.name} Venues</Typography>

        {isLoading ? <VenuesListSkeleton /> : <VenuesList owner venues={data} />}
      </div>
    </Fragment>
  );
}
