import s from "./Filter.module.scss";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {
  changesInCategories,
  deleteFilt,
  getProducts,
  setCategory,
} from "@/store/slices/products-slice";
import { useFiltersContext } from "@/helpers/hooks/useFiltersContext";

const SoloFilter = ({ filter }) => {
  const { deleteIndex } = useFiltersContext();

  return (
    <div className={s.filterGroup}>
      <div className={s.soloFilter}>
        <GrClose
          size={14}
          cursor={"pointer"}
          onClick={() => deleteIndex(filter)}
        />
        {filter}
      </div>
    </div>
  );
};

const AllFilters = () => {
  const { filters } = useFiltersContext();

  return (
    <div className={s.allFilters}>
      {filters?.map((filter, index) => (
        <SoloFilter key={index} filter={filter} />
      ))}
    </div>
  );
};

const Filter = () => {
  const { showFilter, closeFilterMenu, setFilters } = useFiltersContext();

  return (
    <div
      className={
        `${s.filter_wrapper}` + " " + `${showFilter ? s.open_filter_page : ""}`
      }
    >
      <div className={s.filter_page}>
        <div className={s.header_filter}>
          <h2 className={s.header_filter_title}>FILTER</h2>
          <div className={s.clear_filter}>
            <button onClick={() => setFilters([])} className={s.clean_all}>
              CLEAN ALL
            </button>
            <GrClose size={20} cursor={"pointer"} onClick={closeFilterMenu} />
          </div>
        </div>
        <div className={s.use_filters}>
          <h3 className={s.use_filters_title}>APPLIED FILTERS</h3>
          <AllFilters />
        </div>
      </div>
    </div>
  );
};

export default Filter;
