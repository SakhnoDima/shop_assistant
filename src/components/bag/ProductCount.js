import {useSelector} from "react-redux";
import {useState} from "react";
import {getBagProducts, setLocIdProducts} from "@/store/slices/bagProducts-slice";
import s from "@/app/my-bag/myBag.module.scss";

export const ProductCount = ({productCount, id, sizeName, dispatch}) => {
    const {locIdProducts} = useSelector(state => state.bagProducts)
    const [count, setCount] = useState(productCount)

    const minusOne = () => {
        if (count !== 1) {
            setCount(count - 1);

            const newBag = [...locIdProducts].map(product => {
                if (product.id === id && product.sizeName === sizeName) {
                    return {...product, count: product.count - 1}
                }
                return product;

            })
            localStorage.setItem('bag', JSON.stringify(newBag));
            dispatch(setLocIdProducts(newBag));
            dispatch(getBagProducts());
        }
    }


    const plusOne = () => {
        setCount(count + 1)

        const newBag = [...locIdProducts].map(product => {
            if (product.id === id && product.sizeName === sizeName) {
                return {...product, count: product.count + 1}
            }
            return product;

        })
        localStorage.setItem('bag', JSON.stringify(newBag));
        dispatch(setLocIdProducts(newBag));
        dispatch(getBagProducts());
    }

    return <div className={s.count_block}>
        <div onClick={minusOne} className={s.countChange}>-</div>
        <div>{count}</div>
        <div onClick={plusOne} className={s.countChange}>+</div>
    </div>
}