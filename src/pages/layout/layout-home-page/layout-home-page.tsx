// eslint-disable-next-line dirnames/match-kebab-case
import { Outlet } from 'react-router-dom';

import { Navigation } from '../../navigation';

import s from './layout-home-page.module.scss';

export const LayoutHomePage = () => (
  <section className={s.LayoutHomePage}>
    <div className={s.wrapperNavigation}>
      <Navigation
        idContract='navigation-contract'
        idTerms='navigation-terms'
        idBooks='navigation-books'
        idShowcase='navigation-showcase'
      />
    </div>
    <Outlet />
  </section>
);
