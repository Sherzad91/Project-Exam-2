import { Skeleton } from '@mui/material';
import { Fragment } from 'react';

export default function VenuesListSkeleton() {
  return (
    <Fragment>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
        {[1, 2, 3, 4].map((index) => (
          <div key={`skeletpn${index}`}>
            <Skeleton height={250} />
            <Skeleton />
            <Skeleton />
            <Skeleton width='50%' />
          </div>
        ))}
      </div>
    </Fragment>
  );
}
