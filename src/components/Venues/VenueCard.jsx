import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GradeIcon from '@mui/icons-material/Grade';
import PeopleIcon from '@mui/icons-material/People';
import { Button, Chip, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { deleteVenue } from '../../services/venues';

export default function VenueCard({ venue, owner }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(['venues', venue?.id], () => deleteVenue(venue?.id), {
    enabled: false,
    onSuccess: () => {
      queryClient.invalidateQueries('venues');
    },
  });

  return (
    <Fragment>
      <div className='relative'>
        {owner && (
          <div className='flex gap-2 z-10 absolute left-4 top-4'>
            <Button color='error' variant='contained' size='small' onClick={mutate}>
              Delete
            </Button>
            <Link to={`/update-venue/${venue?.id}`}>
              <Button color='warning' variant='contained' size='small'>
                Update
              </Button>
            </Link>
          </div>
        )}

        <Link to={`/venues/${venue?.id}`} className='flex h-full flex-col rounded-md group bg-white overflow-hidden'>
          <div className='h-[50vw] sm:h-[300px] md:h-[210px] lg:h-[200px] xl:h-[220px] 2xl:h-[200px] w-full overflow-hidden'>
            <img
              src={venue?.media[0]}
              className=' group-hover:scale-105 transition pointer-events-none h-full w-full object-cover'
            />
          </div>
          <div className='p-4 flex flex-col  flex-1'>
            <Typography className='line-clamp-1' fontWeight={600}>
              {venue.name}
            </Typography>
            <Typography className='line-clamp-3 text-gray-600 !mb-2'>{venue?.description}</Typography>

            <div className='flex gap-2 mt-auto'>
              <Chip
                icon={<AttachMoneyIcon />}
                className='font-bold'
                variant='outlined'
                color='success'
                label={venue?.price}
              />
              <Chip icon={<GradeIcon />} className='font-bold' label={venue?.rating} />
              <Chip icon={<PeopleIcon />} className='font-bold' label={venue?.maxGuests} />
            </div>
          </div>
        </Link>
      </div>
    </Fragment>
  );
}
