import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import * as yup from 'yup';
import useForm from '../../hooks/useForm';
import { updateProfile } from '../../services/profiles';

export default function HeaderUserArea({ user, logout, setUser }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [avatarOpen, setAvatarOpen] = React.useState(false);
  const { input, handleSubmit } = useForm(
    { avatar: user?.avatar || '' },
    async (values) => {
      const data = await updateProfile(user?.name, values);
      setUser((user) => ({ ...user, avatar: data.avatar }));

      setAvatarOpen(false);
    },
    yup.object({
      avatar: yup.string().url('Avatar must be a valid URL'),
    })
  );

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      {user ? (
        <Fragment>
          <Tooltip title='User Settings'>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={user?.name} src={user?.avatar} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: 2 }}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}>
            {!user?.venueManager && (
              <MenuItem>
                <Link to='/my-bookings'>
                  <Typography textAlign='center'>My Bookings</Typography>
                </Link>
              </MenuItem>
            )}
            <MenuItem onClick={() => setAvatarOpen(true)}>
              <Typography textAlign='center'>Update Avatar</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                logout();
                handleCloseUserMenu();
              }}>
              <Typography textAlign='center'>Logout</Typography>
            </MenuItem>
          </Menu>

          <Dialog open={avatarOpen} onClose={() => setAvatarOpen(false)}>
            <DialogTitle>Update Avatar</DialogTitle>
            <DialogContent>
              <TextField {...input('avatar')} className='!mt-4 !w-[350px]' />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAvatarOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>Update</Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      ) : (
        <Fragment>
          <div className='hidden lg:flex gap-2'>
            <Link to='/login'>
              <Button variant='contained' startIcon={<LoginIcon />}>
                Login
              </Button>
            </Link>
            <Link to='/register'>
              <Button variant='' endIcon={<HowToRegIcon />}>
                Register
              </Button>
            </Link>
          </div>

          <div className='block lg:hidden'>
            <Tooltip title='User'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.name} src={user?.avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: 2 }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              <MenuItem onClick={handleCloseUserMenu}>
                <Link to='/login'>
                  <Typography textAlign='center'>Login</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Link to='/register'>
                  <Typography textAlign='center'>Register</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </div>
        </Fragment>
      )}
    </Box>
  );
}
