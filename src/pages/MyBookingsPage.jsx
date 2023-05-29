import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../services/bookings';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import { Fragment } from 'react';
import { Typography } from '@mui/material';
import MyBookingsSkeleton from '../components/Bookings/MyBookingsSkeleton';
import MyBookingsList from '../components/Bookings/MyBookingsList';

export default function MyBookingsPage() {
  const user = useIsLoggedIn();

  const { data, isLoading } = useQuery(['bookings'], () => getBookings(user?.name));

  return (
    <Fragment>
      <div className='container my-6'>
        <Typography variant='h4' className='!mb-4'>
          My Bookings
        </Typography>

        {isLoading ? <MyBookingsSkeleton /> : <MyBookingsList bookings={data} />}
      </div>
    </Fragment>
  );
}
