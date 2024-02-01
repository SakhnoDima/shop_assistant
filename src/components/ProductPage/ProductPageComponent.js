import Image from "next/image";
import s from "@/app/shop/[id]/id.module.scss";

export const ImgForAlbum = ({src}) => {
    return<Image
        src={src}
        alt={''}
        width={680}
        height={680}
        className={s.image_size}
    />
}

export const Size = ({size, setSizeAddToBag}) => {
    return <>
        {size?.amountSize > 0
            ? <div className={s.size} onClick={() => setSizeAddToBag(size.sizeName)}> {size.sizeName}</div>
            : <div className={s.not_size}>{size.sizeName}</div>
        }
    </>
}

export const SizeShop = ({size}) => {
    return <>
        {size?.amountSize > 0
            ? <div className={s.sizeShop}> {size.sizeName}</div>
            : <div className={s.not_sizeShop}>{size.sizeName}</div>
        }
    </>
}

export const OutputDescription = ({description}) => {
    const arrDescription = description?.split('\\');
    return <>
        {arrDescription?.map((des, index) => (
            <div key={index} className={s.piece}>
                <span>\</span> {des} <span className={s.slash}>\</span>
            </div>
        ))}
    </>
}
