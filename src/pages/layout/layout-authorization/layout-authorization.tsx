import { Outlet } from 'react-router-dom';
import s from './layout-authorization.module.scss';


export const LayoutAuthorization = () => (

    <section className={s.layoutAuthorization}>
        <h1 className={s.title}>Cleverland</h1>
     <Outlet/>
    </section>
);
