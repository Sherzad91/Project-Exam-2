import { Button, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { deleteBooking } from '../../services/bookings';

export default function MyBookingCard({ booking }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(['bookings', booking?.id], () => deleteBooking(booking?.id), {
    enabled: false,
    onSuccess: () => {
      queryClient.invalidateQueries('venues');
    },
  });

  return (
    <Fragment>
      <div className='relative'>
        <div
          to={`/bookings/${booking?.id}`}
          className='flex h-full flex-col lg:flex-row rounded-md group bg-white overflow-hidden'>
          <div className='h-[50vw] sm:h-[300px] md:h-[210px] lg:h-[200px] xl:h-[220px] 2xl:h-[200px]  overflow-hidden'>
            <img
              src={booking?.venue?.media[0]}
              className=' group-hover:scale-105 transition pointer-events-none h-full w-full object-cover'
            />
          </div>
          <div className='p-4 flex flex-col  flex-1'>
            <Typography variant='h4' className='line-clamp-1' fontWeight={600}>
              {booking?.venue?.name}
            </Typography>
            <Typography className='line-clamp-2 !mb-2' variant='body1'>
              {booking?.venue?.description}
            </Typography>

            <div className='flex font-bold'>
              Booked from {new Date(booking?.dateFrom).toLocaleDateString()} to{' '}
              {new Date(booking?.dateTo).toLocaleDateString()}
            </div>

            <div className='flex gap-2 mt-auto justify-end'>
              <Button color='error' variant='contained' onClick={mutate}>
                Delete
              </Button>

              <Link to={`/venues/${booking?.venue?.id}`}>
                <Button color='primary' variant='contained'>
                  View Venue
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
