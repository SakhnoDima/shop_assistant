import s from "./Product.module.scss"
import Image from "next/image";
import Link from "next/link";

const Product = ({info}) => {
    return <Link href={`shop/${info.id}`} className={s.product} key={info.id}>
        <Image
            src={info['header_image'][0]}
            alt={''}
            className={s.product_photo}
            width={452}
            height={452}
            placeholder={'blur'}
            blurDataURL={'nothingtosay322.pythonanywhere.com'}

        />
            <h2 className={s.product_name}>
                {info.name}
            </h2>
            <p className={s.product_price}>
                ₴{info.price}
            </p>
    </Link>
}
export default Product;