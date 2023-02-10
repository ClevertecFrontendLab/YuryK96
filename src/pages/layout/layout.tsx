import { Outlet, useLocation } from 'react-router-dom';

import { Footer } from '../footer';
import { Header } from '../header';

import s from './layout.module.scss';

export const Layout = () => (
  <section className={s.Layout}>
    <Header />

    <div className={s.wrapperContent}>
      <Outlet />
    </div>
    <Footer />
  </section>
);
