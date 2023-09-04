"use client"
import s from "./myBag.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getBagProducts} from "@/store/slices/bagProducts-slice";
import {ProductInBag} from "@/components/Bag/ProductInBag";
import TotalInfo from "@/components/Bag/TotalInfo";

const MyBag = () => {
    const {locIdProducts, bagProducts} = useSelector(state => state.bagProducts)
    const dispatch = useDispatch()
    let productPrice = 0;
    let shippingPrice = 120
    bagProducts?.map(product => {
        productPrice = productPrice + product.count * product.product.price;
    })
    useEffect(() => {
        dispatch(getBagProducts())
    }, [])

    return <div className={s.myBag_page}>
        <div className={s.title}>
            CART CONTENTS[{locIdProducts?.length ?? 0}]
        </div>
        <div className={s.main}>
            <div className={s.list_products}>
                {bagProducts?.map((product, index) => (
                    <ProductInBag key={index} product={product}/>
                ))}
            </div>
           <TotalInfo productPrice={productPrice} shippingPrice={shippingPrice} bagProducts={bagProducts}/>
        </div>

    </div>
}

export default MyBag;