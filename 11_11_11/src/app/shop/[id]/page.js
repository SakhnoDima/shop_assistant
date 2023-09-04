'use client'
import {usePathname} from "next/navigation";
import {useEffect} from "react";
import s from "./id.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "@/store/slices/soloProduct-slice";
import {ProductInformation} from "@/components/ProductPage/ProductPage";
import {ImgForAlbum} from "@/components/ProductPage/ProductPageComponent";

const ProductPage = () => {
    const id = usePathname().split("/").pop();
    const dispatch = useDispatch();
    const {product, isLoading} = useSelector(state => state.product);

    useEffect(() => {
        dispatch(getProduct({id}))
    }, []);

    return <div className={s.product_page}>
        <div className={s.photo_album}>
            {product.images?.map((img, index) => (
                <ImgForAlbum src={img} key={index}/>
            ))}
        </div>
        <div className={s.product_information_container}>
            <ProductInformation product={product}/>
        </div>
    </div>
}
export default ProductPage;