'use client'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setLocIdProducts} from "@/store/slices/bagProducts-slice";

const BagQuantity = () => {
    const {locIdProducts} = useSelector(state => state.bagProducts)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setLocIdProducts(JSON.parse(localStorage.getItem('bag')) || []))
    }, [])

    return <>
        [{locIdProducts?.length ?? 0}]
    </>
}

export default BagQuantity;
