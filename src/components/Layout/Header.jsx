import { Box, Typography } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserProvider';
import HeaderUserArea from './UserArea';
import { Link } from 'react-router-dom';
import { House } from '@mui/icons-material';

export default function Header() {
  const { user, logout, setUser } = useContext(UserContext);

  return (
    <header className='bg-white  py-4'>
      <div className='container flex items-center text-black justify-between'>
        <div className='flex items-center gap-12'>
          <Typography
            variant='h5'
            letterSpacing={-1}
            textTransform='uppercase'
            fontWeight={900}
            className='flex items-center'>
            <House />
            <Link to='/'>Holidaze</Link>
          </Typography>

          {user && user?.venueManager && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: '1rem' }}>
              <Link to='/create-venue'>New Venue</Link>
              <Link to='/my-venues'>My Venues</Link>
            </Box>
          )}

          {user && !user?.venueManager && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: '1rem' }}>
              <Link to='/my-bookings'>My Bookings</Link>
            </Box>
          )}
        </div>

        <div>
          <HeaderUserArea user={user} setUser={setUser} logout={logout} />
        </div>
      </div>
    </header>
  );
}
