import { Fragment } from 'react';
import MyBookingCard from './MyBookingCard';

export default function MyBookingsList({ bookings }) {
  return (
    <Fragment>
      <div className='grid grid-cols-1 gap-6'>
        {bookings.length > 0 ? (
          bookings.map((booking) => <MyBookingCard key={booking?.id} booking={booking} />)
        ) : (
          <div className='text-center col-span-full'>
            <p>No bookings found</p>
          </div>
        )}
      </div>
    </Fragment>
  );
}
