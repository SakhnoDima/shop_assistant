import s from "./Filter.module.scss";
import {GrClose} from "react-icons/gr";
import {useSelector} from "react-redux";

const SoloFilter = ({filter}) => {
    // console.log(filter)
}

const AllFilters = ({filters}) => {
    const resFilter = []
    const itemKeys = Object.keys(filters);
    itemKeys.map((key) => {
        filters[key].map(filter => {
            resFilter.push({key, filter})
        })
    });
    // console.log(resFilter)
    return <div>
        {resFilter.map((filter, index) => <SoloFilter key={index} filter={filter}/>)}
    </div>
}


const Filter = ({closeFilter, showFilter}) => {
    const {filters} = useSelector(state => state.products)

    return <div className={`${s.filter_wrapper}` + ' ' + `${showFilter ? s.open_filter_page : ''}`}
                onClick={event => event.target.className === 'Filter_filter_wrapper__Uxg9k Filter_open_filter_page__2zzUE' && closeFilter()}>
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