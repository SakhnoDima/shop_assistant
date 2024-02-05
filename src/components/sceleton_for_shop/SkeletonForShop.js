import s from "./SkeletonForShop.module.scss"

const SkeletonForShop = ({count = 1}) => {

    return <>
        {[...Array(count)].map((_, index) => (
            <div key={index} className={s.skeleton_block}>
                <div  className={s.skeleton_img}></div>
                <div className={s.skeleton_name}></div>
                <div className={s.skeleton_price}></div>
            </div>

        ))}
    </>
}

export default SkeletonForShop;