import s from "./Filter.module.scss";
import {GrClose} from "react-icons/gr";
import {useDispatch, useSelector} from "react-redux";
import {changesInCategories, deleteFilt, getProducts, setCategory} from "@/store/slices/products-slice";

const SoloFilter = ({filter, filterName}) => {
    const dispatch = useDispatch()
    const deleteFilter = (filt) => {
        dispatch(deleteFilt({category: filterName, name: filt}))
    }

    return <div className={s.filterGroup}>
        {filter.map((filt, index) => {
            return <div
                key={index}
                className={s.soloFilter}
            >
                <GrClose
                    size={14}
                    cursor={'pointer'}
                    onClick={() => deleteFilter(filt)}
                /> {filt}
            </div>

        })}
    </div>
}

const AllFilters = ({filters}) => {
    const keys = Object.keys(filters);
    return <div className={s.allFilters}>
        {keys.map((key, index) => (
            <SoloFilter key={index} filter={filters[key]} filterName={key}/>
        ))}
    </div>
}


const Filter = ({closeFilter, showFilter}) => {
    const {filters} = useSelector(state => state.products);
    const dispatch = useDispatch()
    const loadNewProducts = () => {


    }

    return <div className={`${s.filter_wrapper}` + ' ' + `${showFilter ? s.open_filter_page : ''}`}
                onClick={event => event.target.className === 'Filter_filter_wrapper__Uxg9k Filter_open_filter_page__2zzUE' && dispatch(changesInCategories()) && dispatch(getProducts()) && closeFilter()}>
        {/*<div className={`${s.filter_page}` + ' ' + `${showFilter ? s.open_filter_page : ''}`}>*/}
        <div className={s.filter_page}>
            <div className={s.header_filter}>
                <h2 className={s.header_filter_title}>FILTER</h2>
                <div className={s.clear_filter}>
                    <div className={s.clean_all}>CLEAN ALL</div>
                    <GrClose size={20} cursor={'pointer'} onClick={closeFilter}/>
                </div>
            </div>
            <div className={s.use_filters}>
                <h3 className={s.use_filters_title}>APPLIED FILTERS</h3>
                <AllFilters filters={filters}/>
            </div>
        </div>
    </div>
}

export default Filter;