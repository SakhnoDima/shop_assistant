import Image from "next/image";
import s from './HomeListBrands.module.scss';
import Link from "next/link";


const HomeListBrands = ({brand}) => {

    return <div className={s.home_list_brand}>
        <Image
            src={brand.img}
            alt={brand.title}
            className={s.brand_img}

        />


        <div className={s.brand_title}>
            {brand.title}
        </div>
        <div className={s.brand_text}>
            {brand.text}
        </div>
        <Link
            className={s.brand_link}
            href={'/brand'}
        >
            MORE...
        </Link>
    </div>

}

export default HomeListBrands;