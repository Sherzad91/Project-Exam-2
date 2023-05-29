import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import { getSimilarVenues } from '../../services/venues';
import VenueCard from './VenueCard';

export default function SimilarVenues({ id }) {
  const { data, isLoading } = useQuery(['similarvenues', id], getSimilarVenues);

  if (isLoading) return <Fragment />;

  return (
    <Fragment>
      <Typography variant='h5' fontWeight={700}>
        Similar Venues
      </Typography>

      {data
        ?.filter((venue) => venue.id !== id)
        .map((venue) => (
          <VenueCard key={venue?.id} venue={venue} />
        ))}
    </Fragment>
  );
}
