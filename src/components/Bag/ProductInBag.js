import {useDispatch, useSelector} from "react-redux";
import s from "@/app/my-bag/myBag.module.scss";
import Image from "next/image";
import Link from "next/link";
import {GrClose} from "react-icons/gr";
import {getBagProducts, setLocIdProducts} from "@/store/slices/bagProducts-slice";
import {Loader} from "@/components/loader/Loader";
import {ProductCount} from "@/components/Bag/ProductCount";

export const ProductInBag = ({product}) => {
    const {locIdProducts, isLoading} = useSelector(state => state.bagProducts)
    const dispatch = useDispatch()

    const deleteProductInBag = (id, size) => {
        const newBag = locIdProducts.filter(del => del.id !== id || del.sizeName !== size);
        localStorage.setItem('bag', JSON.stringify(newBag));
        dispatch(setLocIdProducts(newBag));
        dispatch(getBagProducts());

    }
    return <div className={s.product_in_bag}>

        <div className={s.main_content}>

            <div className={s.img_block}>
                <Image
                    src={product.product?.header_image[0]}
                    alt={'product'}
                    width={140}
                    height={140}
                />
                <Link href={`shop/${product?.id}`} className={s.product_name}>
                    {product.product?.name}
                </Link>
            </div>

            <div className={s.inf_block}>
                <div className={s.product_count}>
                    <ProductCount productCount={product.count} id={product.id} sizeName={product.sizeName}
                                  dispatch={dispatch}/>

                </div>
                <div className={s.product_size}>
                    size: {product?.sizeName}
                </div>
                <div className={s.price}>
                    {product.product?.price} ₴
                </div>
                <div className={s.delete_btn} onClick={() => deleteProductInBag(product.id, product.sizeName)}>
                    <GrClose/>
                </div>
            </div>
        </div>
        {product.totalCount >= product.count
            ? ''
            : <div className={s.remark_block}>
                This item in your cart is no longer available in this quantity.
                You cannot proceed with your order until the quantity is adjusted.
            </div>
        }

        {isLoading
            ? <Loader/>
            : ''
        }
    </div>

}