import { Alert, Box, Snackbar, TextField, Typography } from '@mui/material';
import useForm from '../hooks/useForm';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Fragment, useContext, useState } from 'react';
import { UserContext } from '../contexts/UserProvider';
import LoadingButton from '@mui/lab/LoadingButton';

const validationSchema = yup.object({
  email: yup.string().email('Email must be valid').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});

const initialValues = {
  email: '',
  password: '',
};

export default function LoginPage() {
  const { input, handleSubmit } = useForm(initialValues, onSubmit, validationSchema);
  const { login, loading, error, clearError, user } = useContext(UserContext);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(values) {
    const data = await login(values);
    if (data) {
      setSuccess(true);

      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }

  if (!loading && user && !success) {
    return (
      <Box className='w-full mt-24 rounded-2xl bg-white p-6 lg:p-12 lg:w-2/3 xl:w-1/2 mx-auto'>
        <Typography variant='h4' className='!mb-5'>
          You are already logged in
        </Typography>

        <Link to={'/'}>Back to home</Link>
      </Box>
    );
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
        onClose={clearError}>
        <Alert onClose={clearError} severity='error' sx={{ width: '100%' }}>
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
          Successfully logged in
        </Alert>
      </Snackbar>
      <div className='container '>
        <Box className='w-full mt-24 rounded-2xl bg-white p-6 lg:p-12 lg:w-2/3 xl:w-1/2 mx-auto'>
          <Typography variant='h4' className='!mb-5'>
            Login
          </Typography>

          <form onSubmit={handleSubmit} className='w-full space-y-4' autoComplete='off'>
            <TextField {...input('email', 'email')} className='w-full' />
            <TextField {...input('password', 'password')} className='w-full' />

            <LoadingButton loading={loading} type='submit' variant='contained'>
              Login
            </LoadingButton>

            <Typography>
              Don&apos;t have an account? <Link to='/register'>Register</Link>
            </Typography>

            <Typography variant='caption'>
              By logging in, you agree to our <Link to='#'>Terms of Service</Link> and{' '}
              <Link to='#'>Privacy Policy</Link>
            </Typography>
          </form>
        </Box>
      </div>
    </Fragment>
  );
}
