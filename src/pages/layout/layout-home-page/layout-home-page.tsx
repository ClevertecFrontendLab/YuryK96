import { useDispatch } from "react-redux";
import { Outlet } from 'react-router-dom';
import { useEffect } from "react";
import { getBooks, getCategories } from "../../../redux-toolkit/books-reducer";


import { Navigation } from '../../navigation';
import { AppDispatch } from "../../../redux-toolkit/store";
import s from './layout-home-page.module.scss';


export const LayoutHomePage = () => {

    const dispatch = useDispatch<AppDispatch>()

    useEffect( ()=>{
        dispatch(getBooks())
        dispatch(getCategories())
    },[dispatch] )

    return  <section className={s.LayoutHomePage}>
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
}
