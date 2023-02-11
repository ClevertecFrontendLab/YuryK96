import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

import { Footer } from '../footer';
import { Header } from '../header';

import s from './layout.module.scss';
import { Pending } from "../../common/pending";
import { Error } from "../../common/error";

import { AppStateType } from "../../redux-toolkit/store";
import { StatusRequestEnum } from "../../redux-toolkit/books-reducer";

export const Layout = () => {
    const status = useSelector((state:AppStateType) => state.booksBranch.status)



  return  <section className={s.Layout}>

      { status === StatusRequestEnum.Pending && <Pending/>}
      {status === StatusRequestEnum.Error && <Error/> }
        <Header />

        <div className={s.wrapperContent}>
            <Outlet />
        </div>
        <Footer />
    </section>
}
