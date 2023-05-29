import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='bg-gray-200 py-4'>
      <div className='container flex flex-col items-center lg:flex-row lg:justify-between'>
        <Typography>&copy; Copyright Holidaze, all rights reserved</Typography>

        <Link to='#'>Terms and Conditions</Link>
      </div>
    </footer>
  );
}
