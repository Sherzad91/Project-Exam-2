import { Skeleton } from '@mui/material';
import { Fragment } from 'react';

export default function MyBookingsSkeleton() {
  return (
    <Fragment>
      <div className=''>
        <div className='flex items-center  gap-10'>
          <Skeleton height={300} className='w-[25%]' />

          <div className='flex flex-1  flex-col gap-5'>
            <Skeleton />
            <Skeleton />
            <Skeleton width='50%' />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
