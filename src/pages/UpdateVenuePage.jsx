import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import useIsVenueManager from '../hooks/useIsVenueManager';
import * as yup from 'yup';
import { Fragment, useCallback, useState } from 'react';

import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import useForm from '../hooks/useForm';
import { getVenue, putVenue } from '../services/venues';
import Close from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';

const validationSchema = yup.object({
  name: yup.string().required('Name is required').max(255, 'Name must be at most 255 characters'),
  description: yup.string().required('Description is required').max(500, 'Description must be at most 500 characters'),
  media: yup.array().of(yup.string().url('Media must be a valid URL')).required('Media is required'),
  price: yup.number().required('Price is required').min(0, 'Price must be at least 0'),
  maxGuests: yup
    .number()
    .required('Max guests is required')
    .min(1, 'Max guests must be at least 1')
    .max(100, 'Max guests must be at most 100'),
});

export default function UpdateVenuePage() {
  useIsVenueManager();
  const { id } = useParams();
  const { data: existingVenue, isLoading: existingLoading, isError } = useQuery(['venues', id], () => getVenue(id));
  const { input, handleSubmit, values, setValues, checkbox } = useForm(existingVenue || {}, onSubmit, validationSchema);
  const { mutate, isLoading } = useMutation(['venues', 'post'], () => putVenue(values), {
    onSuccess: () => {
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        navigate('/venues/' + existingVenue.id);
      }, 2000);
    },
    onError: (e) => {
      setError(e?.response?.data?.errors?.[0].message);
    },
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function onSubmit(values) {
    mutate(values);
  }

  if (existingLoading) {
    return <div>Loading...</div>;
  }

  if (!existingLoading && isError) {
    navigate('/404');
    return <Fragment></Fragment>;
  }

  if (!existingVenue) {
    return <div></div>;
  }

  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(false)}>
        <Alert onClose={() => setError(false)} severity='error' sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity='success' sx={{ width: '100%' }}>
          Successfully Updated
        </Alert>
      </Snackbar>
      <div className='container '>
        <Box className='w-full my-12 rounded-2xl bg-white p-6 lg:p-12 lg:w-3/4 xl:w-2/3 mx-auto'>
          <Typography variant='h4' className='!mb-5'>
            Update Venue
          </Typography>

          <form onSubmit={handleSubmit} className='w-full space-y-4' autoComplete='off'>
            <TextField {...input('name')} className='w-full' />
            <TextField {...input('description')} className='w-full' />
            <Images values={values} setValues={setValues} />
            <div className='grid grid-cols-2 gap-4'>
              <TextField {...input('price', 'number')} className='w-full' />
              <TextField {...input('maxGuests', 'number', 'Max Guests')} className='w-full' />
            </div>

            <div className='grid grid-cols-2 gap-x-4'>
              <FormControlLabel {...checkbox('meta.wifi', 'Wifi')} className='!block' control={<Checkbox />} />
              <FormControlLabel {...checkbox('meta.parking', 'Parking')} className='!block' control={<Checkbox />} />
              <FormControlLabel {...checkbox('meta.pets', 'Pets')} className='!block' control={<Checkbox />} />
              <FormControlLabel
                {...checkbox('meta.breakfast', 'Breakfast')}
                className='!block'
                control={<Checkbox />}
              />
            </div>

            <hr color='#ebebeb' />

            <TextField {...input('location.address', 'text', 'Address')} className='w-full' />
            <div className='grid grid-cols-2 gap-4'>
              <TextField {...input('location.city', 'text', 'City')} className='w-full' />
              <TextField {...input('location.zip', 'text', 'Zip Code')} className='w-full' />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <TextField {...input('location.country', 'text', 'Country')} className='w-full' />
              <TextField {...input('location.continent', 'text', 'Continent')} className='w-full' />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <TextField {...input('location.lng', 'text', 'Longitude')} disabled className='w-full' />
              <TextField {...input('location.lat', 'text', 'Latitude')} disabled className='w-full' />
            </div>

            <Map lat={values?.location?.lat || 0} lng={values?.location?.lng || 0} setValues={setValues} />
            <LoadingButton loading={isLoading} type='submit' variant='contained'>
              Submit
            </LoadingButton>
          </form>
        </Box>
      </div>
    </Fragment>
  );
}

const Images = ({ values, setValues }) => {
  const [image, setImage] = useState('');

  const handleAddImage = useCallback(() => {
    if (!image) return;
    setValues((values) => {
      return {
        ...values,
        media: [...values.media, image],
      };
    });
    setImage('');
  }, [image, setValues]);

  const handleRemoveImage = useCallback(
    (index) => {
      setValues((values) => {
        return {
          ...values,
          media: values.media.filter((_, i) => i !== index),
        };
      });
    },
    [setValues]
  );

  return (
    <div className='space-y-4'>
      <div className='flex space-x-4'>
        <TextField
          value={image}
          onChange={(e) => setImage(e.target.value)}
          label='Image URL'
          variant='outlined'
          className='flex-grow'
        />

        <Button onClick={handleAddImage} variant='contained'>
          Add Image
        </Button>
      </div>
      <Typography variant='caption'>First image will become thumbnail</Typography>
      <div className='grid grid-cols-3 gap-4'>
        {values?.media?.map((image, index) => (
          <div key={index} className='relative'>
            <img src={image} alt='' className='w-full bg-red-300 ' />

            <IconButton
              onClick={() => handleRemoveImage(index)}
              aria-label='delete'
              className='!absolute top-0 !border-none right-0 !bg-red-500  !text-white rounded-full w-8 h-8 flex justify-center items-center'>
              <Close />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
};

const Map = ({ lat, lng, setValues }) => {
  return (
    <MapContainer
      style={{
        height: '500px',
        width: '100%',
        overflow: 'hidden',
      }}
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={13}
      scrollWheelZoom={false}>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <LocationMarker setPosition={setValues} position={{ lat, lng }} />
    </MapContainer>
  );
};

function LocationMarker({ setPosition, position }) {
  useMapEvents({
    click(e) {
      setPosition((values) => {
        return {
          ...values,
          location: {
            ...values.location,
            lat: e.latlng.lat,
            lng: e.latlng.lng,
          },
        };
      });
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
