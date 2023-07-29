import s from "@/app/shop/[id]/id.module.scss";
import Link from "next/link";
import Image from "next/image";

const sizes = [
    {size: 'XS', inStock: true},
    {size: 'S', inStock: false},
    {size: 'M', inStock: true},
    {size: 'L', inStock: false},
    {size: 'XL', inStock: false},
]
export const ProductInformation = ({product}) => {
    return <div className={s.product_information}>
        <div className={s.product_name}>
            {product.name}
        </div>
        <div className={s.product_price}>
            {product.price} ₴
        </div>
        <div className={s.size_guide}>
            SIZE GUIDE
        </div>
        <div className={s.choose_size_block}>
            <div className={s.list_sizes}>
                {sizes.map((size, index) => (
                    <Size size={size} key={index}/>
                ))}
            </div>
            <div className={s.add_to_card_btn}>
                ADD TO CART
            </div>
        </div>
        <div className={s.product_description}>
            <OutputDescription description={product.description}/>
        </div>
        <Link href={'/shop'} className={s.back_btn}>
            {'< '}BACK TO SHOP
        </Link>
    </div>
}
export const ImgForAlbum = ({src}) => {
    return<Image
            src={src}
            alt={''}
            width={800}
            height={800}
            className={s.image_size}
        />

}
const Size = ({size}) => {
    return <>
        {size.inStock
            ? <div className={s.size}> {size.size}</div>
            : <div className={s.not_size}>{size.size}</div>
        }
    </>
}
const OutputDescription = ({description}) => {
    const arrDescription = description?.split('\\');
    return <>
        {arrDescription?.map((des, index) => (
            <div key={index} className={s.piece}>
                <span>\</span> {des} <span className={s.slash}>\</span>
            </div>
        ))}
    </>
}