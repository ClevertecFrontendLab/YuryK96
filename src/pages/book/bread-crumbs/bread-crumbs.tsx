import React from 'react';

import s from './bread-crumbs.module.scss';



export const BreadCrumbs: React.FC<BreadCrumbsType> = ({title,categories}) => (

    <div className={s.breadCrumbs}>
        <p>{`${categories ? categories[0] : '' } / `}{title}</p>
    </div>
)

type BreadCrumbsType = {
    title: string
    categories: string[]
}
