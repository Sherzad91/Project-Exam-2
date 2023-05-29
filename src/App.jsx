import { Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SingleVenuePage from './pages/SingleVenuePage';
import CreateVenuePage from './pages/CreateVenuePage';
import NotFoundPage from './pages/NotFoundPage';
import MyVenuesPage from './pages/MyVenuesPage';
import UpdateVenuePage from './pages/UpdateVenuePage';
import MyBookingsPage from './pages/MyBookingsPage';

export default function App() {
  return (
    <Fragment>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/venues/:id' element={<SingleVenuePage />} />
          <Route path='/create-venue' element={<CreateVenuePage />} />
          <Route path='/update-venue/:id' element={<UpdateVenuePage />} />
          <Route path='/my-venues' element={<MyVenuesPage />} />
          <Route path='/my-bookings' element={<MyBookingsPage />} />

          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Fragment>
  );
}
