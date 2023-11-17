import s from "./СhoiceСategory.module.scss"
import {useDispatch} from "react-redux";
import {changesInCategories, getProducts, setCategory} from "@/store/slices/products-slice";
const category = ['T-SHIRTS' ,'SHIRT', 'SNEAKERS', 'SHORTS', 'POLOS', 'JACKETS', "SWEATSGIRT", "KNITS", 'HATS', 'BEANIES']
const ChoiceCategory = () => {
    const dispatch = useDispatch()

    const ChoiceCategory = (name) => {
        dispatch(changesInCategories());
        dispatch(setCategory(name));
        dispatch(getProducts());

    }
    return <div className={s.categorys_list}>
        <div onClick={()=> ChoiceCategory(null)}>SHOP ALL</div>
        {category.map((name, index) => (
            <div key={index} onClick={()=> ChoiceCategory(name)}>{name}</div>
        ))}
    </div>
}

export default ChoiceCategory;