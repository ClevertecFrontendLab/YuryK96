import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { Footer } from '../footer';
import { Header } from '../header';
import { Pending } from "../../common/pending";
import { Error } from "../../common/error";

import { AppDispatch, AppStateType } from "../../redux-toolkit/store";
import { getBooks, getCategories, StatusRequestEnum } from "../../redux-toolkit/books-reducer";
import { getBooksStatus } from "../../redux-toolkit/books-selectos";

import s from './layout.module.scss';


export const Layout = () => {
    const status = useSelector(getBooksStatus)
    const dispatch = useDispatch<AppDispatch>()

    useEffect( ()=>{
        dispatch(getBooks())
        dispatch(getCategories())
    },[dispatch] )

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
