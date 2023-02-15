/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCategories } from "../../../redux-toolkit/books/books-selectos";
import s from './bread-crumbs.module.scss';
import { useParams } from "react-router-dom";




export const BreadCrumbs: React.FC<BreadCrumbsType> = ({title,categoryBook}) => {
    const { category } = useParams();
    const categories = useSelector(getCategories)
    const [categoryName, setCategoryName ]= useState<string>()
    useEffect( ()=>{

        if (categories) {
            const foundCategory = categories.find(item => item.path === category);
            foundCategory ?  setCategoryName(foundCategory.name) : setCategoryName("Все книги")
        }
            else {
            setCategoryName("Все книги");
        }
    },[category, categories] )

   return <div className={s.breadCrumbs}>
        <p>{categoryName} / {title}</p>
    </div>
}

type BreadCrumbsType = {
    title: string

    categoryBook: string[]
}
