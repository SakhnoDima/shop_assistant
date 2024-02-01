"use client"
import {useCallback, useEffect, useState} from "react";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import FilterIcon from "@/../public/filterIcon.png"
import Product from "@/components/Product/Product";
import {getProducts, setFetching} from "@/store/slices/products-slice";
import s from "./shop.module.scss";
import Filter from "@/components/filter/Filter";
import SkeletonForShop from "@/components/SceletonForShop/SkeletonForShop";
import ChoiceCategory from "@/components/ChoiceCategory/ChoiceCategory";


const Shop = () => {
    const dispatch = useDispatch();
    const {products, isFetching, totalCount, isLoading} = useSelector(state => state.products);
    const [showFilter, setShowFilter] = useState(false)

    const closeFilter = () => {
        setShowFilter(!showFilter)
    }

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

    return <div className={s.shop_page}>
        <div className={s.sort_and_filter_btn}>
            <div className={s.filter_btn} onClick={closeFilter}>
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
        <ChoiceCategory/>
        <div className={s.products}>
            {products.map(product => (
                <div key={product.id}>
                    <Product info={product}/>
                </div>
            ))}
            {isLoading ? <SkeletonForShop count={totalCount ? 5 : 10}/> : ''}
        </div>
        {/*{showFilter && <Filter closeFilter={closeFilter} showFilter={showFilter}/>}*/}
        <Filter closeFilter={closeFilter} showFilter={showFilter}/>

    </div>
}

export default Shop;