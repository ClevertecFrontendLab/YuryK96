import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { Error } from '../../common/error';
import { Pending } from '../../common/pending';
import {
    getBooksStatus,
    getBookStatus,
    getCategoriesStatus
} from '../../redux-toolkit/books/books-selectos';
import { getCategories } from '../../redux-toolkit/books/books-thunks';
import { StatusRequestEnum } from '../../redux-toolkit/books/books-type';
import { AppDispatch } from '../../redux-toolkit/store';
import { Footer } from '../footer';
import { Header } from '../header';

import s from './layout.module.scss';
import { useIsAuth } from '../../hooks/is-auth-hook';


export const Layout = () => {
    const status = useSelector(getBooksStatus)
    const categoriesStatus = useSelector(getCategoriesStatus)
    const booksStatus = useSelector(getBookStatus)
    const dispatch = useDispatch<AppDispatch>()
    const isAuth = useIsAuth()
    const navigate = useNavigate()


    useEffect( ()=>{
        if(isAuth === false){
            navigate('/auth')
        }
    },[isAuth,navigate] )

    useEffect( ()=>{
        if ( localStorage.getItem('token')) {
            dispatch(getCategories())
        }
    },[dispatch] )


    return  <section className={s.Layout}>


      { status === StatusRequestEnum.Pending && <Pending/> || booksStatus === StatusRequestEnum.Pending && <Pending/>|| categoriesStatus === StatusRequestEnum.Pending && <Pending/>}
      {status === StatusRequestEnum.Error && <Error/> || categoriesStatus === StatusRequestEnum.Error && <Error/> }
        <Header />

        <div className={s.wrapperContent}>
            <Outlet />
        </div>
        <Footer />
    </section>
}
