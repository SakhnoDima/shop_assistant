"use client"
import {useCallback, useEffect, useState} from "react";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import FilterIcon from "@/../public/filterIcon.png"
import Product from "@/components/Product/Product";
import {getProducts, setFetching} from "@/store/slices/products-slice";
import s from "./shop.module.scss";


const Shop = () => {
    const dispatch = useDispatch();
    const {products, currentPage, isFetching, totalCount} = useSelector(state => state.products);

    useEffect(() => {
        if (isFetching) {
            dispatch(getProducts());
        }
    }, [isFetching])

    const scrollHandle = useCallback(e => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 400
            && products.length < totalCount
        ) {
            dispatch(setFetching(true))
        }
    }, [products, totalCount])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandle);

        return function () {
            document.removeEventListener('scroll', scrollHandle)
        }
    }, [scrollHandle])

    // console.log(products)
    return <div className={s.shop_page}>
        <div className={s.sort_and_filter_btn}>
            <div className={s.filter_btn}>
                <Image
                    src={FilterIcon}
                    alt='FilterIcon'
                    width={30}
                />
                FILTER:
            </div>
            <div className={s.sort_btn}>
                SORT
            </div>
        </div>
        <div className={s.products}>
            {products.map(product => (
                <div key={product.id}>
                    <Product info={product}/>
                </div>
            ))}
        </div>
    </div>
}

export default Shop;