import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import { getVenues } from '../services/venues';
import VenuesList from '../components/Venues/VenuesList';
import VenuesListSkeleton from '../components/Venues/VenuesListSkeleton';

export default function HomePage() {
  const { data, isLoading } = useQuery(['venues'], getVenues);

  return (
    <Fragment>
      <div className='container my-6'>
        <Typography variant='h4'>Venues</Typography>

        {isLoading ? <VenuesListSkeleton /> : <VenuesList venues={data} />}
      </div>
    </Fragment>
  );
}
