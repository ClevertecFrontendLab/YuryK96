import { Outlet } from 'react-router-dom';
import {  useSelector } from "react-redux";


import { Footer } from '../footer';
import { Header } from '../header';
import { Pending } from "../../common/pending";
import { Error } from "../../common/error";

import { getBooksStatus } from "../../redux-toolkit/books/books-selectos";

import s from './layout.module.scss';
import { StatusRequestEnum } from "../../redux-toolkit/books/books-type";


export const Layout = () => {
    const status = useSelector(getBooksStatus)

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
