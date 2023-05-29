import {
  Alert,
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Fragment, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getVenue } from '../services/venues';
import SimilarVenues from '../components/Venues/SimilarVenues';
import { UserContext } from '../contexts/UserProvider';
import LoginIcon from '@mui/icons-material/Login';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GradeIcon from '@mui/icons-material/Grade';
import PeopleIcon from '@mui/icons-material/People';
import { BookOnline, CarRepair, Egg, Pets, Wifi } from '@mui/icons-material';
import useBookVenue from '../hooks/useBookVenue';
import { LoadingButton } from '@mui/lab';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import dayjs from 'dayjs';

export default function SingleVenuePage() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(['venue', id], () => getVenue(id), { enabled: !!id });
  const {
    closeModal,
    isModalOpen,
    input,
    values,
    setValues,
    mutate,
    isLoading: isBookingLoading,
    success,
    error: bookingError,
    openModal,
    clearFeedback,
  } = useBookVenue(id);

  const { user } = useContext(UserContext);

  if (isLoading)
    return (
      <div className='container text-center mt-12'>
        <Typography variant='h4'>Loading...</Typography>
      </div>
    );

  if (!isLoading && (error || !data)) {
    return (
      <div className='container text-center mt-12'>
        <Typography variant='h4'>No venue found</Typography>
      </div>
    );
  }

  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={!!bookingError}
        autoHideDuration={6000}
        onClose={clearFeedback}>
        <Alert onClose={clearFeedback} severity='error' sx={{ width: '100%' }}>
          {bookingError}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={!!success}
        autoHideDuration={6000}
        onClose={clearFeedback}>
        <Alert onClose={clearFeedback} severity='success' sx={{ width: '100%' }}>
          Successfully booked
        </Alert>
      </Snackbar>

      {/* BOOKING MODAL */}
      <Dialog maxWidth open={isModalOpen} onClose={closeModal}>
        <DialogTitle>Book Venue</DialogTitle>
        <DialogContent>
          <TextField fullWidth className='!mb-4 !mt-2' {...input('guests', 'number')} variant='outlined' />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangeCalendar
              shouldDisableDate={(day) => {
                const dates = data?.bookings?.reduce((acc, booking) => {
                  const start = dayjs(booking.dateFrom);
                  const end = dayjs(booking.dateTo);
                  const diff = end.diff(start, 'day');
                  const bookingDates = Array.from({ length: diff + 1 }, (_, i) => start.add(i, 'day'));
                  return [...acc, ...bookingDates];
                }, []);

                return dates.some((disabledDate) => dayjs(day).isSame(disabledDate, 'day'));
              }}
              className='flex !flex-col lg:!flex-row'
              value={[values.dateFrom, values.dateTo]}
              minDate={
                // new dayjs date
                dayjs(new Date())
              }
              onChange={(val) =>
                setValues({
                  ...values,
                  dateFrom: val[0],
                  dateTo: val[1],
                })
              }
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <LoadingButton loading={isBookingLoading} onClick={mutate}>
            Book
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <div className='container grid grid-cols-2 lg:grid-cols-3 gap-16 my-12'>
        <div className='lg:col-span-2 flex flex-col gap-4'>
          <Typography variant='h5' fontWeight={700}>
            {data?.name}
          </Typography>

          {typeof data?.media === 'string' ? (
            <img src={data?.media} className='w-full h- rounded-md object-cover' />
          ) : (
            <div className='flex flex-col gap-4'>
              <img src={data?.media[0]} className='w-full h- rounded-md object-cover' />
              <div className='grid grid-cols-5 gap-3'>
                {data?.media.slice(1, 4).map((image, i) => (
                  <a key={`image${i}`} href={image} target='_blank' rel='noreferrer'>
                    <img src={image} className='w-full h- rounded-md object-cover' />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* OWNER */}
          <div className='flex items-center justify-between gap-2'>
            <div className='flex gap-2 items-center'>
              <Avatar
                alt={data?.owner?.name}
                src={data?.owner?.avatar}
                sx={{
                  width: 48,
                  height: 48,
                }}
              />

              <div className='flex flex-col'>
                <Typography>{data.owner.name}</Typography>
                <Typography variant='caption' className='text-gray-600'>
                  {data.owner.email}
                </Typography>
              </div>
            </div>

            <div className='flex gap-2 mt-auto'>
              <Chip
                icon={<AttachMoneyIcon />}
                className='font-bold'
                variant='outlined'
                color='success'
                label={data?.price}
              />
              <Chip icon={<GradeIcon />} className='font-bold' label={data?.rating} />
              <Chip icon={<PeopleIcon />} className='font-bold' label={data?.maxGuests} />
            </div>
          </div>

          {/* META */}
          <div className='flex items-center gap-4'>
            <Chip icon={<Wifi />} label={data?.meta?.wifi ? 'Yes' : 'No'} />
            <Chip icon={<CarRepair />} label={data?.meta?.parking ? 'Yes' : 'No'} />
            <Chip icon={<Pets />} label={data?.meta?.pets ? 'Yes' : 'No'} />
            <Chip icon={<Egg />} label={data?.meta?.breakfast ? 'Yes' : 'No'} />
          </div>

          {/* BOOKING AREA */}
          {user ? (
            !user?.venueManager ? (
              <div>
                <Button size='large' startIcon={<BookOnline />} color='success' variant='contained' onClick={openModal}>
                  Book Venue
                </Button>
              </div>
            ) : data?.bookings?.length > 0 && data?.owner?.name === user?.name ? (
              <div className='my-6'>
                <Typography variant='h6'>Bookings</Typography>
                {data?.bookings.map((booking) => (
                  <div className='bg-gray-200 p-4 rounded-2xl' key={booking?.id}>
                    <div className='flex items-center gap-2'>
                      <span>From</span>
                      <Typography fontWeight={700}>{dayjs(booking?.dateFrom).format('DD MMM YYYY')}</Typography>
                      <span>To</span>
                      <Typography fontWeight={700}>{dayjs(booking?.dateTo).format('DD MMM YYYY')}</Typography>

                      <Chip
                        variant='outlined'
                        icon={<PeopleIcon />}
                        className='font-bold !bg-gray-100'
                        label={booking?.guests + ' Guest(s)'}
                      />
                    </div>

                    <Typography variant='caption'>
                      Booked on {dayjs(booking?.createdAt).format('DD MMM YYYY')}
                    </Typography>
                  </div>
                ))}
              </div>
            ) : (
              <Fragment />
            )
          ) : (
            <div>
              <Link to='/login'>
                <Button variant='outlined' endIcon={<LoginIcon />}>
                  Login to book venue
                </Button>
              </Link>
            </div>
          )}

          <Typography variant='body1'>{data?.description}</Typography>
        </div>

        <div className='hidden lg:flex flex-col gap-6'>
          <SimilarVenues id={id} />
        </div>
      </div>
    </Fragment>
  );
}
