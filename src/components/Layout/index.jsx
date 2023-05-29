import { Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <Fragment>
      <Header />
      <main className='min-h-[800px]'>
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  );
}
