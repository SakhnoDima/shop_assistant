import s from "./TotalInfo.module.scss"
import Link from "next/link";
import {useState} from "react";

const TotalInfo = ({bagProducts, shippingPrice, productPrice}) => {
    const [promo, setPromo] = useState('')

    return <div className={s.total_info}>
        <div className={s.first_block}>
            <div>
                <div>[{bagProducts.length}] ITEM</div>
                <div>{productPrice} ₴</div>
            </div>
            <div>
                <div>SHIPPING</div>
                <div>{shippingPrice} ₴</div>
            </div>
        </div>
        <div className={s.second_block}>
            <div className={s.total_price_block}>
                <div className={s.total_title}>TOTAL</div>
                <div className={s.total_price}> {productPrice + shippingPrice} ₴</div>
            </div>
            <div>
                <input
                    className={s.addPromo}
                    value={promo}
                    onChange={e => setPromo(e.target.value)}
                    placeholder={'PROMO CODE'}
                />
                <div className={s.addPromo_btn}>ADD</div>
            </div>
        </div>
        <div className={s.third_block}>
            <Link href={'shop'} className={s.continue_btn}>CONTINUE SHOPPING</Link>
            <div className={s.checkout_btn}>CHECKOUT</div>
        </div>
    </div>
}

export default TotalInfo;